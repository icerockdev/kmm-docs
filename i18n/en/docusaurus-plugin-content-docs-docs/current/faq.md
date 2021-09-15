---
sidebar_position: 7
---

# FAQ

## Официальный FAQ по KMM

На сайте Kotlin Multiplatform Mobile Docs доступен [официальный FAQ](https://kotlinlang.org/docs/mobile/faq.html), покрывающий часть вопросов.

## FAQ от IceRock

### Какое влияние оказывает Kotlin Multiplatform на размер приложения?

App Size: GoPro had questions about app size increase. They discovered, "Ok, a release build of the app with Kotlin makes a difference of ~1MB, so that's awesome." 

### При возникновении ошибки отсутствия сети на iOS не попадает код в блок catch если ловим Exception

Причина такого поведения на данный момент не понятна, так как кидается в этом случае Exception - io.ktor.client.engine.ios.IosHttpRequestException, но для решения используйте в catch вместо Exception - Throwable

По идеи мы не должны отлавливать Throwable, так как [Exception это ошибки которые предполагается обрабатывать, а Error (вторая ветка наследников Throwable) - не решаемые ошибки](http://java-online.ru/java-throws.xhtml), которые не должны отлавливаться кодом. Но в данном случае что-то внутри ktor пошло не так.

Пока не решат [issue](https://github.com/ktorio/ktor/issues/1165) - юзаем в кейсах где делаем запросы сетевые Throwable вместо Exception в catch

### Will there be a memory leak if both a Swift object and a Kotlin object have strong references to each other?

Yes. This is limitation of ARC used in Swift and Objective-C.

### При сборке под iOS Simulator Xcode сообщает о несовместимости архитектур, котлин модуль x64 а надо arm64

Началось с 12 Xcode. Вылечить можно через 
`ONLY_ACTIVE_ARCH = YES;`

в конфигурации xcode проекта (чтобы не компилировал при запуске на симулятор все лишние архитектуры, только x64 нужный).

На будущее, для поддержки и arm macbook'ов, надо будет MultiPlatformLibrary.podspec улучшить чтобы там селекторы выбирали для симулятора арм, когда мы на арм маке.

user-defined VALID_ARCHS можно удалить, если есть.

### How do you manage multithread handling in kotlin native (IOS)?

first of all, we strive to minimize the places where multithreading is used, because in this places we should very carful check what objects passed between threads to correct freeze all this objects. In this places we use coroutines native-mt branch to send work at separated thread, also we use in past [coroutineWorker](https://github.com/Autodesk/coroutineworker). and also we use in platform side places just dispatch_async with freeze objects (if multithreading can be moved in iosMain side, not commonMain)

### Do you have any recommendations for the Integration and exposure of third-party libraries with Cocoa Pods?

we recommend use custom cocoapods integration logic, with our <https://github.com/icerockdev/mobile-multiplatform-gradle-plugin> because:\
plugin allows to use dynamic framework (official cocoapods gradle plugin allows only static frameworks)\
plugin give all control of podspec file (not generate any podspec at all) - here our used <https://github.com/icerockdev/moko-template/blob/master/mpp-library/MultiPlatformLibrary.podspec>\
plugin allows to compile any version of framework (debug/release , x64/arm64) from gradle tasks, without opening xcode at all\
export dependencies into framework header will be simple - just like in our template - <https://github.com/icerockdev/moko-template/blob/master/mpp-library/build.gradle.kts#L46>. here description - <https://github.com/icerockdev/mobile-multiplatform-gradle-plugin#setup-export-as-ios-framework>

### How to speed up compilation times?

use latest kotlin version. at now 1.4.30 got significant speed up of build time on K/N.\
try to minimize public api of framework header (mark internal all things, what should be internal)\
separate project to independend modules, with flat hierarchy - many independent features + one umbrella module. With this approach your incremental builds will be faster because not changed modules will be used from cache.\
enable gradle parallel build, enable gradle build cache, enable gradle daemon, give more ram for gradle and use gradle scan to find correct count of gradle.workers.max and available memory (K/N compiler require many RAM, so if you got 10 parallel workers with 10GB ram you can got slowest build, than if you use 5 parallel workers with 10GB ram)\
minimize usage of kotlin-kapt and jetifier, disable unused android build features - <https://developer.android.com/reference/tools/gradle-api/4.1/com/android/build/api/dsl/BuildFeatures>\
(edited)

### How do you manage or what do you recommend for multiplatform reactive programming?

we use for our presentation layer LiveData from moko-mvvm - there also contained many transforms extensions for reactive mapping, merging, etc.\
in data layer we use coroutines Flow, StateFlow.\
also you can use <https://github.com/badoo/Reaktive> if you want Rx standard.

### Version management (best practices to upgrade kotlin versions, example from 1.3.X to 1.4.X)?

start from 1.4.0 all 1.4.* versions have backward compatibility. but before 1.4 we should search libs that compiled exactly with our kotlin version. for simplify this search we implement <http://libs.kmp.icerock.dev/>\
best practice - do not forget about updates and try to update to the current version. the longer you don't update, the more painful the update will be later, when an important bugfix is required

### What resources would you recommend? slack channels, forums, or some other resources?

<https://kotlinlang.org/docs/mobile/home.html>\
<https://kotlinlang.org/docs/mpp-intro.html>\
<https://kotlinlang.org/docs/native-concurrency.html>\
<http://kotlinlang.slack.com/> - #multiplatform, #kotlin-native\
<https://github.com/icerockdev/>\
<http://libs.kmp.icerock.dev/>

### Как сделать синглтон для иос в общем коде?

object и для айоса синглтоном является, просто выглядит как вызов конструктора, но по факту выдается один и тот же объект.

чтобы более красиво было можно создать глобальную (не в объекте) переменную и тогда она будет доступна из свифта как свойство класса (не объекта) по имени <имя файла>Kt

типа в Utils.kt добавляем val test: String\
и в свифте будет UtilsKt.test

а с объектом object Utils { val test: String }\
будет в свифте Utils().test\
но по факту работа с одним и тем же объектом будет всегда

### Можно ли работать с KMM на Apple Silicon?
Можно, но частично. На данный момент через Rosetta 2 можно делать все, кроме запуска в iOS simulator. Но без Rosetta 2 можно компилировать только Android платформу.

Запуск без rosetta 2:
Для нативного исполнения Gradle нужно скачать JDK с поддержкой ARM64, например [Zulu](https://www.azul.com/downloads/zulu-community/?version=java-11-lts&os=macos&architecture=arm-64-bit&package=jdk).
Далее ставим Android Studio Canary 15 или выше (Apple Silicon добавлен в [этой версии](https://androidstudio.googleblog.com/2021/04/android-studio-arctic-fox-canary-15.html)). Сделать это можно через [архив загрузок Android studio](https://developer.android.com/studio/archive). Если будут проблемы, вероятно поможет статья [My Journey to Setup Android Emulator for M1 MacBook Pro](https://medium.com/mobile-app-development-publication/my-journey-to-setup-android-emulator-for-m1-macbook-pro-b8365321b3e7)
Но Kotlin/Native на данный момент все равно не сможет скомпилировать артефакты нативно, из-за ошибки с llvm. В тоже время android таргет можно скомпилировать и запустить на android emulator'е либо устройстве.

issues для мониторинга статуса разработки:
- https://youtrack.jetbrains.com/issue/KT-39834
- https://youtrack.jetbrains.com/issue/KT-43667
- https://youtrack.jetbrains.com/issue/KT-44321
- https://youtrack.jetbrains.com/issue/KT-39833
