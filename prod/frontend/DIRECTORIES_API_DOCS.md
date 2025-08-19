# API справочников

## Обзор

API для работы со справочниками системы. Все справочники имеют унифицированную структуру CRUD операций.

## Доступные справочники

1. **Affiliations** (Принадлежность) - `/api/affiliations`
2. **Depots** (Депо) - `/api/depots`
3. **Manufacturers** (Производители) - `/api/manufacturers`
4. **Owners** (Собственники) - `/api/owners`
5. **WagonTypes** (Типы вагонов) - `/api/wagon-types`
6. **Locations** (Местоположения) - `/api/locations`
7. **FilterTypes** (Типы фильтров) - `/api/filter-types`
8. **PartTypes** (Типы деталей) - `/api/part-types`
9. **PartStatuses** (Статусы деталей) - `/api/part-statuses`
10. **RepairTypes** (Типы ремонта) - `/api/repair-types`
11. **Registrars** (Регистраторы) - `/api/registrars`
12. **WagonModels** (Модели вагонов) - `/api/wagon-models`

## Унифицированные операции

Каждый справочник поддерживает стандартные CRUD операции:

### GET /api/{directory} - Получить все записи

### GET /api/{directory}/{id} - Получить запись по ID

### POST /api/{directory} - Создать новую запись

### PUT /api/{directory}/{id} - Обновить запись

### DELETE /api/{directory}/{id} - Удалить запись

## Использование API

### Импорт API функций

```typescript
import {
  useAffiliations,
  useCreateAffiliation,
  useUpdateAffiliation,
  useDeleteAffiliation,
  // другие хуки...
} from '@/api';
```

### Примеры использования

#### Получение списка данных

```typescript
function AffiliationsList() {
  const { data: affiliations, isLoading, error } = useAffiliations();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  return (
    <ul>
      {affiliations?.map(item => (
        <li key={item.id}>{item.value}</li>
      ))}
    </ul>
  );
}
```

#### Создание новой записи

```typescript
function CreateAffiliation() {
  const createMutation = useCreateAffiliation();

  const handleSubmit = async (data: CreateAffiliationDTO) => {
    try {
      await createMutation.mutateAsync(data);
      // Успешно создано
    } catch (error) {
      // Обработка ошибки
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* форма */}
    </form>
  );
}
```

#### Обновление записи

```typescript
function EditAffiliation({ id }: { id: string }) {
  const updateMutation = useUpdateAffiliation();

  const handleUpdate = async (data: UpdateAffiliationDTO) => {
    try {
      await updateMutation.mutateAsync({ id, data });
      // Успешно обновлено
    } catch (error) {
      // Обработка ошибки
    }
  };
}
```

#### Удаление записи

```typescript
function DeleteAffiliation({ id }: { id: string }) {
  const deleteMutation = useDeleteAffiliation();

  const handleDelete = async () => {
    if (confirm('Удалить запись?')) {
      try {
        await deleteMutation.mutateAsync(id);
        // Успешно удалено
      } catch (error) {
        // Обработка ошибки
      }
    }
  };

  return (
    <button onClick={handleDelete} disabled={deleteMutation.isPending}>
      Удалить
    </button>
  );
}
```

## Конфигурация справочников

Используйте `directoriesConfig` для получения метаданных:

```typescript
import { directoriesConfig, directoryUtils } from '@/lib/directories-config';

// Получить конфигурацию справочника
const config = directoryUtils.getConfig('affiliations');

// Получить поля справочника
const fields = directoryUtils.getFieldsByDirectory('affiliations');

// Валидация поля
const error = directoryUtils.validateField(field, value);
```

## Типы данных

### Базовые типы

```typescript
interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### Пример: Affiliation

```typescript
interface AffiliationDTO extends BaseEntity {
  value: string;
}

interface CreateAffiliationDTO {
  value: string;
}

interface UpdateAffiliationDTO {
  value: string;
}
```

## React Query интеграция

- Автоматическое кэширование данных
- Инвалидация кэша при изменениях
- Оптимистичные обновления
- Обработка состояний загрузки и ошибок

## Права доступа

Все операции требуют аутентификации. Для операций создания, обновления и удаления требуются соответствующие права доступа.
