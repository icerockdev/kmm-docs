# coroutines

Для реализации асинхронной логики и выделения работы на отдельные потоки на наших проектах
используется [kotlinx.coroutines](https://github.com/Kotlin/kotlinx.coroutines) версии native-mt.

## Материалы

### Beginner

- 📄 [KotlinLang Docs - Coroutines guide](https://kotlinlang.org/docs/coroutines-basics.html)
  - suspend функции
  - scope builder'ы - runBlocking, coroutineScope
  - Structured Concurrency
  - Легковесность корутин
- 🎦 [Александр Нозик. Кое-что о корутинах](https://www.youtube.com/watch?v=t0AERgx0lrY)
  - Наглядное пояснение что такое асинхронное выполнение и чем отличается от параллельного
  - Основные термины в области корутин
  - Какие основные ошибки совершают новички
  - Какие хитрости можно делать, используя корутины
- 🎦 [Александр Нозик. Кое-что о корутинах. Flow, Scope](https://www.youtube.com/watch?v=AAFi_C40BOM)
  - Flow, Channel
  - CoroutineScopes
- 📄 [kotlinlang docs - Coroutines guide](https://kotlinlang.org/docs/coroutines-guide.html)
  - ...
- 🎦 [RedMadRobot - Coroutines. Хаотичное изучение. Часть 1](https://www.youtube.com/watch?v=cHERit7LNGM)
  - Inject Dispatchers,
  - Dispatcher,
  - withContext,
  - NonCancellable,
  - viewModelScope и другие,
  - Делай suspend функции main-safe,
  - ViewModel должна создавать корутины,
  - StateFlow и SharedFlow,
  - Не показывай мутабельные типы,
  - Как подписаться во view,
  - Data и Domain слои показывают suspend и Flow,
  - Cоздание корутин в Data и Domain слоях
- 🎦 [RedMadRobot - Coroutines. Хаотичное изучение. Часть 2](https://www.youtube.com/watch?v=6Apj_v9ZkBs)
  - Как же создавать корутины в Data и Domain слоях
  - coroutineScope и supervisorScope
  - Job
  - Deferred и async/await
  - Использование внешнего скоупа
  - Как создать внешний скоуп
  - Избегай GlobalScope
  - CoroutineScope
  - CoroutineContext
  - CoroutineScope vs CoroutineContext
  - Делай свои корутины cancellable
  - Помни про исключения 
- 🎦 [RedMadRobot - Coroutines. Хаотичное изучение. Часть 3](https://www.youtube.com/watch?v=7JSHSqAhErw)
  - Для чего был нужен SingleLiveEvent 📟
  - Как его приготовить без LiveData 🔫
  - Channel (кажется это спойлер 😆)
  - О трате ресурсов в бекграунде 🔦
  - buffer, conflate, flowOn, shareIn
  - WhileSubscribed
  - Как безопасно слушать Flow из UI ✅
  - И не тратить ресурсы 🛠
  - Lifecycle.repeatOnLifecycle
  - Flow.flowWithLifecycle

### Intermediate

- 🎦 [KotlinConf 2019: Asynchronous Data Streams with Kotlin Flow by Roman Elizarov](https://www.youtube.com/watch?v=tYcqn48SMT8)
- 📄 [Guide to UI programming with coroutines](https://github.com/Kotlin/kotlinx.coroutines/blob/master/ui/coroutines-guide-ui.md)
- 📄 [Корутины в Kotlin (гайд)](https://habr.com/ru/company/alfa/blog/336228/)
- 📄 [Best practices for coroutines](https://developer.android.com/kotlin/coroutines/coroutines-best-practices)
- 📄 [Ограничения native-mt версии для iOS таргета](https://github.com/Kotlin/kotlinx.coroutines/blob/native-mt/kotlin-native-sharing.md).
- 📄 [Roman Elizarov - Structured Concurrency](https://elizarov.medium.com/structured-concurrency-722d765aa952)
- 📄 [Structured Concurrency in action! (using Kotlin coroutines)](https://proandroiddev.com/structured-concurrency-in-action-97c749a8f755?gi=85a83dfe8ceb)
- 🎦 [Roman Elizarov — Structured concurrency](https://www.youtube.com/watch?v=Mj5P47F6nJg)

### Advanced

- 🎦 [Андрей Бреслав — Асинхронно, но понятно. Сопрограммы в Kotlin](https://www.youtube.com/watch?v=ffIVVWHpups)
  - Немного устаревшее, но про внутрянку наглядно показано.
- 🎦 [Корутины в Kotlin — Роман Елизаров, JetBrains](https://www.youtube.com/watch?v=b4mBmi1QNF0)
- 📄 [Coroutines Codegen](https://github.com/JetBrains/kotlin/blob/document-coroutines-codegen/compiler/backend/src/org/jetbrains/kotlin/codegen/coroutines/coroutines-codegen.md#state-machine)
  - Документ подробно описывающий что делает компилятор с suspend кодом и что генерируется в результате

## Highlights

### Внутреннее устройство

> Мы не стремимся здесь дать полное объяснение того, как сопрограммы работают под капотом, но примерный смысл того, что происходит, очень важен.
> 
> Сопрограммы полностью реализованы с помощью технологии компиляции (поддержка от языковой виртуальной машины, среды исполнения, или операционной системы не требуется), а приостановка работает через преобразование кода. В принципе, каждая функция приостановки (оптимизации могут применяться, но мы не будем вдаваться в эти подробности здесь) преобразуется в конечный автомат, где состояния соответствуют приостановленным вызовам. Прямо перед приостановкой следующее состояние загружается в поле сгенерированного компилятором класса вместе с сопутствующими локальным переменными и т. д. При возобновлении сопрограммы локальные переменные и состояние восстанавливаются, и конечный автомат продолжает свою работу.
> 
> Приостановленную сопрограмму можно сохранять и передавать как объект, который хранит её приостановленное состояние и локальные переменные. Типом таких объектов является Continuation, а преобразование кода, описанное здесь, соответствует классическому Continuation-passing style. Следовательно, приостановливаемые функции принимают дополнительный параметр типа Continuation (сохранённое состояние) под капотом.
> 
> Более детально о том, как работают сопрограммы, можно узнать в этом проектном документе. Похожие описания async / await в других языках (таких как C# или ECMAScript 2016) актуальны и здесь, хотя особенности их языковых реализаций могут существенно отличаться от сопрограмм Kotlin.

[Source](https://kotlinlang.ru/docs/reference/coroutines.html).

Пример преобразования кода на этапе компиляции:

Исходник:
```kotlin
dummy() // suspend
println(1)
dummy() // suspend
println(2)
```

При компиляции преобразуется в:
```kotlin
val $result: Any? = null
when (this.label) {
    0 -> {
        this.label = 1
        $result = dummy(this)
        if ($result == COROUTINE_SUSPENDED) return COROUTINE_SUSPENDED
        goto 1
    }
    1 -> {
        println(1)
        this.label = 2
        $result = dummy(this)
        if ($result == COROUTINE_SUSPENDED) return COROUTINE_SUSPENDED
        goto 2
    }
    2 -> {
        println(2)
        return Unit
    }
    else -> {
        throw IllegalStateException("call to 'resume' before 'invoke' with coroutine")
    }
}
```

Более подробно можно прочитать в [документе](https://github.com/JetBrains/kotlin/blob/document-coroutines-codegen/compiler/backend/src/org/jetbrains/kotlin/codegen/coroutines/coroutines-codegen.md#state-machine)

Также можно прочитать [статью или посмотреть видео](https://manuelvivo.dev/suspend-modifier).

### CoroutineScope

[CoroutineScope](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-coroutine-scope/index.html) 
задает область действия корутины. Именно используя скоуп производится остановка всех отложенных
операций привязанных к некоторому жизненному циклу.

Например, у каждой `ViewModel` есть `viewModelScope` - это `CoroutineScope`, который создается при
создании `ViewModel` и отменяется при вызове `onCleared`. 

Рассмотрим небольшую тестовую `ViewModel`:
```kotlin
class TestViewModel: ViewModel() {
  init {
    viewModelScope.launch {
      delay(10000)
      println("work done!")
    }
  }
}
```

Если мы зайдем на экран, использующий эту `ViewModel`, и сразу уйдем (не дожидаясь 10 секунд), то
сообщение не будет выведено в лог. А если подождем 10 секунд - будет. Это как раз потому что при
вызове `onCleared` отменяется `CoroutineScope`, а вместе с ним и все его корутины. А вызов `onCleared`
происходит при окончательном уходе с экрана (прямо перед удалением `ViewModel`).

Также важно понимать что скоуп может быть вложенным (любой уровень вложенности поддерживается). 
Для создания вложенного скоупа используется билдер `coroutineScope`. При отмене родительского скоупа
отменяются и все вложенные.

Вложенный скоуп может пригодиться в случаях, когда вам не доступен класс текущего `CoroutineScope`,
но нужно вызвать один из билдеров (`launch`/`async`).

```kotlin
suspend fun doSomeParallelWork() {
    coroutineScope {
        val task1 = async { callFirstRequest() }
        val task2 = async { callSecondRequest() }
        awaitAll(task1, task2)
    }
}
```

Все корутины принадлежат какому либо скоупу. Скоуп либо создается вручную
(вызовом `CoroutineScope`), либо используется `GlobalScope`, который не имеет ограничения жизненного
цикла - живет все время жизни процесса приложения, поэтому не рекомендуется к использованию без
твердой уверенности что это верно.   

### CoroutineContext

TODO

### Dispatcher

TODO

### Механика delay

По началу `delay` все интерпретируют как `Thread.sleep` и считают что текущий поток будет остановлен
на N миллисекунд.
Но [это не так](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/delay.html)
. Рассмотрим следующий блок кода:

```kotlin
suspend fun startTimer() {
    println("show message at start")
    delay(1000)
    println("show message after second")
}
```

При компиляции данный код будет преобразован (если сильно упростить) в нечто похожее на:

```kotlin
fun startTimer() {
    println("show message at start")
    delayCallback(1000) {
        println("show message after second")
    }
}
```

То есть вместо вызова `sleep` на весь поток, вся работа после suspend-point (`delay` это suspend
функция), будет "завернута в callback", закинута в очередь текущего потока (через Dispatcher
корутин) и данный калбек будет выполнен через секунду (когда будет получен из очереди диспатчером).

Вывод - вызов `delay` не останавливает работу потока.

## Check Yourself

TODO
