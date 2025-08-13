# CRUD Controllers с RBAC для справочников

## Созданные контроллеры

В проект добавлены CRUD контроллеры с системой ролевого контроля доступа (RBAC) для следующих справочников:

### 1. AffiliationsController (Принадлежности)
**Маршрут:** `api/Affiliations`
**Модель:** `Affiliation`
**Поля:** 
- `Id` (Guid)
- `Value` (string) - основное значение принадлежности

**Доступные операции:**
- `GET /api/Affiliations` - получить список с пагинацией
- `GET /api/Affiliations/{id}` - получить по ID
- `POST /api/Affiliations` - создать новую
- `PUT /api/Affiliations/{id}` - обновить существующую  
- `DELETE /api/Affiliations/{id}` - удалить

**Валидация:**
- Уникальность значения Value
- Проверка связанных записей в RailwayCisterns при удалении

### 2. DepotsController (Депо)
**Маршрут:** `api/Depots`
**Модель:** `Depot`
**Поля:**
- `Id` (Guid)
- `Name` (string) - название депо
- `Code` (string) - код депо
- `Location` (string, optional) - местоположение

**Валидация:**
- Уникальность названия и кода
- Проверка связанных записей в Parts и Repairs при удалении

### 3. LocationsController (Местоположения)
**Маршрут:** `api/Locations` 
**Модель:** `Location`
**Поля:**
- `Id` (Guid)
- `Name` (string) - название
- `Type` (int) - тип местоположения
- `Description` (string, optional) - описание

**Валидация:**
- Уникальность названия
- Проверка связанных записей в PartInstallations при удалении

### 4. ManufacturersController (Производители)
**Маршрут:** `api/Manufacturers`
**Модель:** `Manufacturer`
**Поля:**
- `Id` (Guid)
- `Name` (string) - название
- `Country` (string) - страна
- `ShortName` (string, optional) - краткое название
- `Code` (int) - код производителя

**Валидация:**
- Уникальность названия и кода
- Проверка связанных записей в RailwayCisterns при удалении

### 5. OwnersController (Владельцы)
**Маршрут:** `api/Owners`
**Модель:** `Owner`
**Поля:**
- `Id` (Guid)
- `Name` (string) - название
- `Unp` (string, optional) - УНП
- `ShortName` (string) - краткое название  
- `Address` (string, optional) - адрес
- `TreatRepairs` (bool) - занимается ли ремонтом
- `Code` (int, optional) - код

**Валидация:**
- Уникальность названия, УНП и кода
- Проверка связанных записей в RailwayCisterns при удалении

### 6. PartStatusesController (Статусы частей)
**Маршрут:** `api/PartStatuses`
**Модель:** `PartStatus`
**Поля:**
- `Id` (Guid)
- `Name` (string) - название
- `Code` (int) - код (генерируется автоматически)

**Валидация:**
- Уникальность названия
- Автоматическая генерация кода
- Проверка связанных записей в Parts при удалении

### 7. PartTypesController (Типы частей)
**Маршрут:** `api/PartTypes`
**Модель:** `PartType`
**Поля:**
- `Id` (Guid)
- `Name` (string) - название
- `Code` (int) - код (генерируется автоматически)

**Валидация:**
- Уникальность названия
- Автоматическая генерация кода
- Проверка связанных записей в Parts при удалении

### 8. RegistrarsController (Регистраторы)
**Маршрут:** `api/Registrars`
**Модель:** `Registrar`
**Поля:**
- `Id` (Guid)
- `Name` (string) - название

**Валидация:**
- Уникальность названия
- Проверка связанных записей в RailwayCisterns при удалении

### 9. RepairTypesController (Типы ремонтов)
**Маршрут:** `api/RepairTypes`
**Модель:** `RepairType`
**Поля:**
- `Id` (Guid)
- `Name` (string) - название
- `Code` (string) - код (генерируется автоматически)
- `Description` (string, optional) - описание

**Валидация:**
- Уникальность названия и кода
- Автоматическая генерация кода на основе названия
- Проверка связанных записей в Repairs и MilageCisterns при удалении

### 10. WagonTypesController (Типы вагонов)
**Маршрут:** `api/WagonTypes`
**Модель:** `WagonType`
**Поля:**
- `Id` (Guid)
- `Name` (string) - название
- `Type` (string) - тип

**Валидация:**
- Уникальность названия
- Проверка связанных записей в RailwayCisterns при удалении

### 11. WagonModelsController (Модели вагонов)
**Маршрут:** `api/WagonModels`
**Модель:** `WagonModel`
**Поля:**
- `Id` (Guid)
- `Name` (string) - название

**Валидация:**
- Уникальность названия
- Проверка связанных записей в RailwayCisterns при удалении

## Система RBAC (Role-Based Access Control)

Каждый контроллер защищен системой ролевого контроля доступа:

### Требуемые разрешения:
- `{entityName}.read` - для операций GET
- `{entityName}.create` - для операций POST
- `{entityName}.update` - для операций PUT
- `{entityName}.delete` - для операций DELETE

Где `{entityName}` - название сущности в нижнем регистре (например: `affiliation`, `depot`, `manufacturer`, и т.д.)

### Атрибуты авторизации:
- `[Authorize]` - требует аутентификации
- Автоматическая проверка разрешений в базовом контроллере
- Роль `Admin` имеет доступ ко всем операциям

## Базовый функционал

Все контроллеры наследуются от `BaseCrudController` и предоставляют:

### Стандартные HTTP методы:
- **GET** `/api/{controller}?page=1&size=20&search=term` - список с пагинацией и поиском
- **GET** `/api/{controller}/{id}` - получение по ID
- **POST** `/api/{controller}` - создание новой записи
- **PUT** `/api/{controller}/{id}` - обновление существующей записи
- **DELETE** `/api/{controller}/{id}` - удаление записи

### Возвращаемые HTTP коды:
- **200** - успешное выполнение (GET, PUT)
- **201** - успешное создание (POST)
- **204** - успешное удаление (DELETE)
- **400** - ошибка валидации
- **401** - неавторизован
- **403** - нет доступа
- **404** - запись не найдена

### Пагинация:
Результат для списков возвращается в формате:
```json
{
  "items": [...],
  "totalCount": 100,
  "page": 1,
  "size": 20,
  "totalPages": 5,
  "hasNextPage": true,
  "hasPreviousPage": false
}
```

### Поиск:
Поддерживается поиск по основным текстовым полям (Name, Value) через параметр `search`.

### Автоматическое заполнение полей:
- `Id` - генерируется автоматически при создании
- `CreatedAt` - устанавливается при создании
- `UpdatedAt` - обновляется при изменении
- `CreatorId` - ID текущего пользователя

## Использование

### Примеры запросов:

#### Получить список производителей:
```
GET /api/Manufacturers?page=1&size=10&search=BMW
```

#### Создать нового производителя:
```
POST /api/Manufacturers
Content-Type: application/json

{
  "name": "BMW",
  "country": "Germany",
  "shortName": "BMW",
  "code": 101
}
```

#### Обновить производителя:
```
PUT /api/Manufacturers/{id}
Content-Type: application/json

{
  "name": "BMW Group",
  "country": "Germany"
}
```

#### Удалить производителя:
```
DELETE /api/Manufacturers/{id}
```

### Настройка разрешений:

Для предоставления доступа пользователю к справочникам необходимо добавить соответствующие разрешения в claims:

```json
{
  "permission": "manufacturer.read",
  "permission": "manufacturer.create",
  "permission": "manufacturer.update", 
  "permission": "manufacturer.delete"
}
```

Или предоставить роль администратора для полного доступа ко всем операциям.
