# SG Trans Mobile App

Мобильное приложение для системы управления железнодорожными цистернами SG Trans.

## Описание

Это Flutter приложение, которое повторяет функционал веб-интерфейса системы SG Trans. Приложение позволяет:

- Авторизоваться в системе
- Просматривать список железнодорожных цистерн
- Получать детальную информацию о цистернах
- Искать цистерны по номеру
- Фильтровать список цистерн

## Архитектура

Приложение построено с использованием следующих технологий и архитектурных принципов:

### Стек технологий
- **Flutter** - UI фреймворк
- **Riverpod** - управление состоянием
- **Dio** - HTTP клиент
- **Freezed** - генерация неизменяемых моделей
- **SharedPreferences** - локальное хранение
- **FlutterSecureStorage** - безопасное хранение токенов

### Архитектура
```
lib/
├── models/           # Модели данных (freezed)
├── services/         # Сервисы для работы с API
├── providers/        # Riverpod провайдеры
├── screens/          # Экраны приложения
├── widgets/          # Переиспользуемые виджеты
├── utils/            # Утилиты и константы
└── main.dart         # Точка входа
```

## Основные компоненты

### Модели данных
- `AuthModels` - модели для аутентификации
- `CisternModels` - модели для железнодорожных цистерн

### Сервисы
- `ApiService` - базовый HTTP клиент с автоматическим обновлением токенов
- `AuthService` - сервис аутентификации
- `CisternsService` - сервис для работы с цистернами

### Провайдеры
- `AuthProvider` - управление состоянием аутентификации
- `CisternsProvider` - управление состоянием цистерн

### Экраны
- `LoginScreen` - экран входа в систему
- `CisternsListScreen` - список цистерн с пагинацией и поиском
- `CisternDetailScreen` - детальная информация о цистерне

## Настройка

### Конфигурация API
Измените URL API в файле `lib/utils/api_config.dart`:
```dart
static const String baseUrl = 'http://your-api-url.com';
```

### Установка зависимостей
```bash
flutter pub get
```

### Генерация кода
```bash
flutter packages pub run build_runner build
```

## Запуск

### Отладка
```bash
flutter run
```

### Сборка для релиза
```bash
# Android
flutter build apk --release

# iOS
flutter build ios --release
```

## Функционал

### Аутентификация
- Вход по email и паролю
- Автоматическое обновление access токена
- Безопасное хранение токенов
- Автоматический выход при истечении refresh токена

### Управление цистернами
- Просмотр списка с пагинацией (20 элементов на страницу)
- Поиск по номеру цистерны
- Детальная информация включая:
  - Основные характеристики
  - Технические параметры
  - Информация о владельце
  - Данные безопасности
  - История изменений

### UI/UX
- Material Design 3
- Адаптивный интерфейс
- Индикаторы загрузки
- Обработка ошибок
- Pull-to-refresh
- Offline режим (частично)

## API Endpoints

Приложение взаимодействует с следующими endpoints:

### Аутентификация
- `POST /users/login` - вход в систему
- `POST /users/refresh-token` - обновление токена
- `GET /users/me` - получение текущего пользователя

### Цистерны
- `GET /api/railway-cisterns/detailed/paged` - список с пагинацией
- `GET /api/railway-cisterns/{id}` - детали цистерны
- `GET /api/railway-cisterns/detailed/search` - поиск по номеру
- `GET /api/railway-cisterns/numbers` - список номеров

## Структура данных

### Цистерна (RailwayCisternDetailDTO)
```dart
{
  id: String,
  number: String,
  manufacturer: Manufacturer,
  buildDate: String,
  tareWeight: double,
  loadCapacity: double,
  length: double,
  axleCount: int,
  volume: double,
  type: WagonType,
  model: WagonModel?,
  owner: Owner?,
  affiliation: Affiliation,
  // ... и другие поля
}
```

### Пагинация
```dart
{
  railwayCisterns: List<RailwayCisternDetailDTO>,
  totalCount: int,
  currentPage: int,
  pageSize: int,
  totalPages: int,
}
```

## Безопасность

- Все API запросы защищены JWT токенами
- Токены хранятся в FlutterSecureStorage
- Автоматическое обновление access токена
- Очистка токенов при выходе из системы
- HTTPS соединение (в production)

## Тестирование

### Запуск тестов
```bash
flutter test
```

### Анализ кода
```bash
flutter analyze
```

## Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Сделайте изменения
4. Покройте код тестами
5. Создайте Pull Request

## Лицензия

Этот проект является частью системы SG Trans и предназначен для внутреннего использования.
