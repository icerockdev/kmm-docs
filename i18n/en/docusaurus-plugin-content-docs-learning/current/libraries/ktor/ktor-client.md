# ktor-client

Библиотека работы с сетью. Основная документация
доступна [на сайте](https://ktor.io/docs/getting-started-ktor-client.html).  
В проектах IceRock библиотека используется в паре
с [moko-network](https://github.com/icerockdev/moko-network), которая генерирует из OpenAPI
спецификации весь сетевой код и сетевые сущности (с сериализацией
через [kotlinx.serialization](https://github.com/Kotlin/kotlinx.serialization)).

Начиная с ktor 1.4.0 на iOS библиотека требует использования native-mt версии корутин (внутри ktor
реализована полноценная многопоточность с обработкой всего pipeline на фоновом потоке).

## Особенности инициализации

Начиная с ktor 1.4.1 все блоки настроек features замораживаются на iOS. Поэтому требуется подходить
к инициализации HttpClient'а аккуратно.

Важно не подавать в лямбды настроек ничего, что нельзя заморозить. Например передавать `this`
объекта (то есть нельзя работать с полями класса, надо сохранить их в локальные переменные в стеке,
а потом уже эти переменные использовать в лямбде).

Например:

```kotlin
// обертка над https://github.com/russhwolf/multiplatform-settings с свойствами для доступа к хранилищу
private val keyValueStorage: KeyValueStorage by lazy {
    KeyValueStorage(settings)
}

// парсер json от https://github.com/Kotlin/kotlinx.serialization
private val json: Json by lazy {
    Json {
        // чтобы если в api появятся новые ключи то у нас приложеине их будет игнорировать, а не крешиться
        ignoreUnknownKeys = true
    }
}

private val httpClient: HttpClient by lazy {
    // Ссылки на инстансы зависимостей для фичей клиента, чтобы не замораживать для KN объект
    // SharedFactory через ссылки на this (httpClient в некоторый момент может заморозиться -
    // что приведет к заморозке фичей и всех зависимостей фичей).
    // https://kotlinlang.org/docs/native-immutability.html
    // https://kotlinlang.org/docs/native-concurrency.html
    val json = this.json
    val keyValueStorage = this.keyValueStorage

    HttpClient {
        // включаем ExceptionFeature из moko-network для обработки ошибок
        install(ExceptionFeature) {
            exceptionFactory = HttpExceptionFactory(
                defaultParser = ErrorExceptionParser(json),
                customParsers = mapOf(
                    HttpStatusCode.UnprocessableEntity.value to ValidationExceptionParser(json)
                )
            )
        }
        // выключаем стандартный BadResponseStatus чтобы работала ExceptionFeature
        expectSuccess = false

        // включаем логирование запросов
        install(Logging) {
            logger = Logger.DEFAULT // TODO сменить на Napier с шарингом между потоками
            level = LogLevel.INFO
        }
    }
}
```

## Получение HttpResponse

При выполнении запроса мы можем указать тип ответа, который мы хотим получить. И ktor-client
автоматически
постарается [привести полученный от сервера ответ в нужный нам тип](https://ktor.io/docs/response.html)
. За это отвечает `responsePipeline`, который обрабатывается при выполнении `receive` у
класса `HttpResponse`. На данном пайплайне находится и логика `ExceptionFeature` и
логика `JsonFeature` и многие другие.

В случае если хочется выполнить запрос с полностью кастомной логикой обработки ответа, которая не
будет проходить через `responsePipeline`, можно сделать так:

```kotlin
val response = httpClient.get<HttpResponse>(requestUrl)

if (response.status.isSuccess()) {
    // success handle
} else {
    val statusCode: HttpStatusCode = response.status
    // read text without call responsePipeline in ktor
    val body: String = String(response.content.toByteArray())
}
```

В примере мы не обращаемся к `response.receive` чтобы не происходила обработка `responsePipeline`.
Вместо этого мы работаем напрямую с `response.content`, который является чистым видом пришедших от
сервера данных.

## Добавление логики в обработку каждого запроса/ответа

Для этого используются Ktor Features, которые позволяют поставить дополнительные блоки на pipeline.
Примеры использования стандартных фич можно посмотреть в
статье [Kotlin Multiplatform Mobile: Intercepting Network Request and Response](https://yusufabd.medium.com/kotlin-multiplatform-mobile-intercepting-network-request-and-response-6805a79b4699)

