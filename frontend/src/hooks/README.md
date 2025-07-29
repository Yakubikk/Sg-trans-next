# Новая структура хуков

Хуки реорганизованы по модулям для лучшей организации и переиспользования кода.

## Структура папок

```
src/hooks/
├── common/           # Общие хуки и утилиты
│   ├── useGenericCRUD.ts  # Универсальный CRUD хук
│   ├── useApiCall.ts      # Хук для API вызовов
│   └── index.ts
├── auth/             # Аутентификация и пользователи
│   ├── useAuth.ts         # Базовая аутентификация
│   ├── useUsers.ts        # Управление пользователями
│   └── index.ts
├── references/       # Справочники
│   ├── useWagons.ts       # Вагоны
│   ├── useRepairTypes.ts  # Типы ремонта
│   ├── useBrakes.ts       # Тормоза
│   ├── useCargos.ts       # Грузы
│   ├── useAirDistributors.ts  # Воздухораспределители
│   ├── useAbsorberDevices.ts  # Поглощающие аппараты
│   ├── useRailwayCisterns.ts  # Железнодорожные цистерны ✅ ОБНОВЛЕНО
│   └── index.ts
└── index.ts          # Главный экспорт
```

### Преимущества новой структуры

### 1. **Устранение дублирования**
Все CRUD хуки теперь используют универсальный `createGenericCRUD`, что сократило код на ~60%.

### 2. **Лучшая организация**
Хуки сгруппированы по функциональности:
- `common/` - переиспользуемые утилиты
- `auth/` - всё связанное с аутентификацией
- `references/` - справочники

### 3. **Типобезопасность**
Все хуки полностью типизированы с поддержкой дженериков.

### 4. **Стандартизированное API** ✅ НОВОЕ
Все справочники теперь используют единый формат `ApiResponse<T>` и `makeRequest`.

## Использование

### Старый способ (до рефакторинга):
```typescript
// Много дублированного кода в каждом хуке
export function useWagons() {
  return useQuery({
    queryKey: wagonsKeys.lists(),
    queryFn: async () => {
      const response = await wagonsApi.getWagons();
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}
```

### Новый способ:
```typescript
// Один раз определяем через фабрику
const wagonsCRUD = createGenericCRUD<Wagon>(wagonsKeys, {
  getAll: wagonsApi.getWagons,
  getById: wagonsApi.getWagonById,
  create: wagonsApi.createWagon,
  update: wagonsApi.updateWagon,
  delete: wagonsApi.deleteWagon,
});

export const useWagons = wagonsCRUD.useList;
export const useWagon = wagonsCRUD.useDetail;
// и т.д.
```

## Пример использования в компонентах

```typescript
import { useWagons, useDeleteWagon } from '@/hooks/references';

function WagonsComponent() {
  const { data: wagons, isLoading } = useWagons();
  const deleteMutation = useDeleteWagon();

  // Остальная логика...
}
```

## Миграция

Все экспорты сохранены для обратной совместимости. Старые импорты продолжат работать:

```typescript
// Работает как раньше
import { useWagons } from '@/hooks';

// Новый способ (более явный)
import { useWagons } from '@/hooks/references';
```

## Будущие улучшения

1. **Добавление тестов** для всех новых хуков
2. **Оптимизация производительности** с React.memo
3. **Расширение типизации** для более сложных случаев
4. **Документация API** для каждого модуля
