# Wagon Type Documentation

## Обновленный интерфейс Wagon

Интерфейс `Wagon` теперь полностью соответствует C# модели из backend и включает все поля из базы данных.

### 📋 Основные поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | `string` | Уникальный идентификатор |
| `number` | `number` | Номер вагона |
| `way` | `string` | Путь |
| `isActive` | `boolean` | Активен ли вагон |
| `isLeased` | `boolean` | В аренде ли вагон |

### 🚛 Технические характеристики

| Поле | Тип | Описание |
|------|-----|----------|
| `carType` | `string?` | Тип вагона |
| `carBrand` | `string?` | Марка вагона |
| `loadCapacity` | `number?` | Грузоподъемность (тонны) |
| `tare` | `number?` | Тара (тонны) |
| `capacity` | `number?` | Емкость |
| `carAxles` | `number?` | Количество осей |
| `pressure` | `number?` | Давление (атм) |

### 📄 Документооборот

| Поле | Тип | Описание |
|------|-----|----------|
| `carFactoryNumberId` | `string?` | Заводской номер |
| `regNumber` | `string?` | Регистрационный номер |
| `carInventory` | `string?` | Инвентарный номер |
| `carConstructionDate` | `string?` | Дата постройки (ISO string) |

### 🔧 Оборудование

| Поле | Тип | Описание |
|------|-----|----------|
| `carBrake` | `string?` | Тип тормоза |
| `carTele` | `string?` | Тип тележки |
| `carAirDistributor` | `string?` | Воздухораспределитель |
| `carAbsorberDevice` | `string?` | Поглощающий аппарат |

### 📊 Служебная информация

| Поле | Тип | Описание |
|------|-----|----------|
| `createDate` | `string?` | Дата создания записи |
| `createUser` | `string?` | Пользователь, создавший запись |
| `modifiedDate` | `string?` | Дата последнего изменения |
| `modifiedUser` | `string?` | Пользователь, изменивший запись |

## 🛠️ Утилитарные функции

### `getWagonStatus(wagon: Wagon): string`
Возвращает текстовое описание статуса вагона:
- "Неактивен" - если `isActive = false`
- "В аренде" - если `isLeased = true`
- "Активен" - в остальных случаях

### `getWagonDisplayName(wagon: Wagon): string`
Формирует отображаемое имя вагона:
- `"Вагон №123"` - базовый формат
- `"Вагон №123 (БрендМарка)"` - если указана марка

## 📱 Компоненты

### `WagonCard`
Детальная карточка вагона с полной информацией:
- Основные характеристики
- Техническая информация  
- Оборудование
- Описание
- Служебные даты

### Использование:
```tsx
import { WagonCard } from '@/components';
import { Wagon } from '@/api/references';

<WagonCard wagon={wagonData} className="mb-4" />
```

## 🔄 Миграция с старого типа

Старые поля автоматически маппятся на новые:
- `wagon.type` → `wagon.carType`
- `wagon.capacity` → `wagon.loadCapacity`
- `wagon.status` → `getWagonStatus(wagon)`
- `wagon.lastMaintenanceDate` → используйте `wagon.modifiedDate`

## 💡 Примеры использования

```typescript
// Проверка статуса
if (wagon.isActive && !wagon.isLeased) {
  // Вагон доступен для использования
}

// Отображение имени
const displayName = getWagonDisplayName(wagon);

// Фильтрация по типу
const tanks = wagons.filter(w => w.carType?.includes('цистерна'));

// Сортировка по номеру
const sorted = wagons.sort((a, b) => a.number - b.number);
```
