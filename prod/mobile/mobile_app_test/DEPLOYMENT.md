# Руководство по развертыванию SG Trans Mobile App

## Предварительные требования

### Системные требования
- Flutter SDK 3.8.1 или выше
- Dart SDK 3.0 или выше
- Android Studio / VS Code с Flutter расширением
- Xcode (для iOS разработки)

### Для Android
- Android SDK 21+ (Android 5.0+)
- Gradle 7.0+

### Для iOS
- iOS 11.0+
- Xcode 12+

## Начальная настройка

### 1. Клонирование проекта
```bash
git clone <repository-url>
cd mobile_app_test
```

### 2. Установка зависимостей
```bash
flutter pub get
```

### 3. Генерация кода
```bash
flutter packages pub run build_runner build
```

### 4. Конфигурация
1. Скопируйте `.env.example` в `.env`
2. Настройте URL API в `lib/utils/api_config.dart`
3. Обновите базовый URL:
```dart
static const String baseUrl = 'https://your-api-domain.com';
```

## Разработка

### Запуск в режиме отладки
```bash
flutter run
```

### Выбор устройства
```bash
# Просмотр доступных устройств
flutter devices

# Запуск на конкретном устройстве
flutter run -d <device-id>
```

### Горячая перезагрузка
- Нажмите `r` в терминале для горячей перезагрузки
- Нажмите `R` для полной перезагрузки

## Сборка для релиза

### Android

#### APK файл
```bash
flutter build apk --release
```
Файл будет создан в: `build/app/outputs/flutter-apk/app-release.apk`

#### App Bundle (рекомендуется для Google Play)
```bash
flutter build appbundle --release
```
Файл будет создан в: `build/app/outputs/bundle/release/app-release.aab`

#### Подпись приложения
1. Создайте keystore:
```bash
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

2. Создайте файл `android/key.properties`:
```properties
storePassword=<пароль>
keyPassword=<пароль>
keyAlias=upload
storeFile=<путь к keystore>
```

3. Обновите `android/app/build.gradle`:
```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### iOS

#### Сборка
```bash
flutter build ios --release
```

#### Подготовка для App Store
1. Откройте `ios/Runner.xcworkspace` в Xcode
2. Настройте Bundle Identifier и подписание
3. Выберите Generic iOS Device
4. Product → Archive
5. Следуйте инструкциям Xcode для загрузки в App Store Connect

## Конфигурация для production

### 1. Обновите API конфигурацию
```dart
// lib/utils/api_config.dart
class ApiConfig {
  static const String baseUrl = 'https://api.yourdomain.com';
  // ... другие настройки
}
```

### 2. Обновите информацию о приложении
```yaml
# pubspec.yaml
name: sg_trans_mobile
description: SG Trans - Система управления железнодорожными цистернами
version: 1.0.0+1
```

### 3. Настройте иконки
```bash
# Установите flutter_launcher_icons
flutter pub add dev:flutter_launcher_icons

# Добавьте конфигурацию в pubspec.yaml
flutter_icons:
  android: true
  ios: true
  image_path: "assets/icon/icon.png"

# Сгенерируйте иконки
flutter pub get
flutter pub run flutter_launcher_icons:main
```

### 4. Настройте splash screen
```bash
# Установите flutter_native_splash
flutter pub add dev:flutter_native_splash

# Добавьте конфигурацию в pubspec.yaml
flutter_native_splash:
  color: "#ffffff"
  image: assets/splash/splash.png
  android: true
  ios: true

# Сгенерируйте splash screen
flutter pub run flutter_native_splash:create
```

## Тестирование

### Модульные тесты
```bash
flutter test
```

### Интеграционные тесты
```bash
flutter drive --target=test_driver/app.dart
```

### Анализ кода
```bash
flutter analyze
```

## Развертывание

### Google Play Store
1. Создайте аккаунт разработчика Google Play
2. Создайте новое приложение
3. Загрузите signed app bundle
4. Заполните метаданные приложения
5. Настройте релиз

### Apple App Store
1. Создайте аккаунт Apple Developer
2. Создайте App ID в Apple Developer Console
3. Настройте приложение в App Store Connect
4. Загрузите через Xcode или Application Loader
5. Отправьте на ревью

## Мониторинг и аналитика

### Crashlytics (рекомендуется)
```bash
flutter pub add firebase_crashlytics
flutter pub add firebase_core
```

### Analytics
```bash
flutter pub add firebase_analytics
```

## Обновления

### Over-the-Air (OTA) обновления
Рассмотрите использование:
- CodePush
- Firebase App Distribution
- Custom update mechanism

### Версионирование
Следуйте семантическому версионированию:
- MAJOR.MINOR.PATCH+BUILDNUMBER
- Пример: 1.2.3+14

## Безопасность

### Проверки перед релизом
- [ ] Удалены все debug логи
- [ ] Настроены production API endpoints
- [ ] Проверены все разрешения приложения
- [ ] Настроено обфускирование кода
- [ ] Проверена защита от reverse engineering

### Обфускация кода
```bash
flutter build apk --release --obfuscate --split-debug-info=/<directory>
```

## Поддержка

При возникновении проблем:
1. Проверьте Flutter doctor: `flutter doctor`
2. Очистите кеш: `flutter clean && flutter pub get`
3. Перегенерируйте код: `flutter packages pub run build_runner clean && flutter packages pub run build_runner build`
4. Обратитесь к документации Flutter

## Полезные команды

```bash
# Проверка состояния Flutter
flutter doctor

# Обновление Flutter
flutter upgrade

# Просмотр логов
flutter logs

# Сборка для профилирования
flutter build apk --profile

# Запуск в release режиме
flutter run --release

# Анализ размера приложения
flutter build apk --analyze-size
```
