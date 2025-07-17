# API Structure

Новая организованная структура API проекта с разделением по доменам и общими утилитами.

## 📁 Структура

```
src/api/
├── index.ts                    # Главный экспорт всех API
├── core/                       # Общие утилиты и базовая логика
│   ├── apiInstance.ts         # Создание и настройка axios инстансов
│   ├── errorHandler.ts        # Универсальная обработка ошибок
│   └── requestHandler.ts      # Универсальная функция запросов
├── references/                # API для справочников
│   ├── index.ts              # Экспорт модуля references
│   ├── referencesApi.ts      # API методы для справочников
│   └── types.ts              # Типы для справочников (Wagon, RepairType)
└── users/                     # API для пользователей
    ├── index.ts              # Экспорт модуля users
    └── userApi.ts            # API методы для пользователей
```

## 🎯 Преимущества новой структуры

### 1. **Модульность**
- Каждый домен (references, users) в отдельной папке
- Легко добавлять новые API модули

### 2. **Переиспользование кода**
- Общие утилиты в папке `core/`
- Универсальные функции для всех API

### 3. **Типобезопасность**
- Типы разделены по доменам
- Централизованный экспорт

### 4. **Удобство импорта**
```typescript
// Можно импортировать из конкретного модуля
import { referencesApi } from '@/api/references';

// Или из главного индекса
import { referencesApi, createApiInstance } from '@/api';
```

## 📝 Как добавить новый API модуль

1. Создайте папку для нового домена:
```bash
mkdir src/api/orders
```

2. Создайте файлы:
```typescript
// src/api/orders/types.ts
export interface Order {
  id: string;
  // ...
}

// src/api/orders/ordersApi.ts
import { createApiInstance, DEFAULT_API_CONFIG } from '../core/apiInstance';
import { makeRequest } from '../core/requestHandler';

const ordersApiInstance = createApiInstance(DEFAULT_API_CONFIG);

export const ordersApi = {
  getOrders: () => makeRequest(ordersApiInstance, 'get', '/orders'),
};

// src/api/orders/index.ts
export * from './ordersApi';
export * from './types';
```

3. Добавьте экспорт в главный индекс:
```typescript
// src/api/index.ts
export * from './orders';
```

## 🛠️ Core утилиты

### `createApiInstance(config)`
Создает настроенный axios инстанс с интерцепторами

### `makeRequest(instance, method, endpoint, data?)`
Универсальная функция для выполнения HTTP запросов

### `handleAxiosError(error)`
Обрабатывает ошибки axios и возвращает понятные сообщения

## 🔄 Миграция

Старые импорты автоматически работают через новую структуру:
```typescript
// Старый способ
import { referencesApi } from '@/api/referencesApi';

// Новый способ (оба варианта работают)
import { referencesApi } from '@/api/references';
import { referencesApi } from '@/api';
```
