# Реализация пагинации в проекте

Данный проект реализует серверную пагинацию между backend (ASP.NET Core) и frontend (Next.js).

## Backend (ASP.NET Core)

### BaseCrudController
Базовый контроллер уже реализует пагинацию:

```csharp
[HttpGet]
public virtual async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int size = 20, [FromQuery] string? search = null)
{
    var skip = (page - 1) * size;
    var query = GetBaseQuery();
    
    if (!string.IsNullOrEmpty(search))
    {
        query = ApplySearch(query, search);
    }

    var totalCount = await query.CountAsync();
    var items = await query
        .Skip(skip)
        .Take(size)
        .ToListAsync();

    var result = new PaginatedResult<TDto>
    {
        Items = items,
        TotalCount = totalCount,
        Page = page,
        Size = size
    };

    return Ok(result);
}
```

### PaginatedResult<T>
Класс для возврата пагинированных данных:

```csharp
public class PaginatedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int Size { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / Size);
    public bool HasNextPage => Page < TotalPages;
    public bool HasPreviousPage => Page > 1;
}
```

## Frontend (Next.js + TypeScript)

### Типы для пагинации

```typescript
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  search?: string;
}
```

### CrudService
Уже настроен для работы с пагинацией:

```typescript
class CrudService<T, TCreate = BaseCreateDto, TUpdate = Partial<TCreate>> {
  async getAll(params: PaginationParams = { page: 1, size: 10 }): Promise<PaginatedResponse<T>> {
    const queryParams = {
      page: params.page || 1,
      size: params.size || 10,
      ...(params.search && { search: params.search })
    };
    return apiClient.get(`/${this.endpoint}`, queryParams);
  }
}
```

### Компоненты

#### ServerDataTable
Компонент таблицы с серверной пагинацией:

```tsx
<ServerDataTable
  columns={columns}
  data={data}
  title="Название таблицы"
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
  onSearchChange={handleSearchChange}
  isLoading={isLoading}
/>
```

#### ReferencePage
Готовый компонент страницы с пагинацией:

```tsx
<ReferencePage
  title="Производители"
  description="Управление производителями"
  queryKey="manufacturers"
  service={manufacturersService}
/>
```

### Hooks

#### useServerPagination
Hook для управления серверной пагинацией:

```typescript
const {
  data,
  isLoading,
  handlePageChange,
  handlePageSizeChange,
  handleSearchChange,
  pagination
} = useServerPagination({
  queryKey: 'manufacturers',
  fetchFn: manufacturersService.getAll,
});
```

#### useDebounce
Hook для задержки поиска:

```typescript
const debouncedSearchValue = useDebounce(searchValue, 500);
```

## Примеры использования

### 1. Простая страница с пагинацией
```tsx
'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { manufacturersService } from '@/lib/api/services';

export default function ManufacturersPage() {
  return (
    <ReferencePage
      title="Производители"
      description="Управление производителями железнодорожных цистерн"
      queryKey="manufacturers"
      service={manufacturersService}
    />
  );
}
```

### 2. Кастомная страница с пагинацией
```tsx
'use client';

import { ServerDataTable } from '@/components/common/server-data-table';
import { useServerPagination } from '@/hooks/use-server-pagination';
import { manufacturersService } from '@/lib/api/services';

export default function CustomManufacturersPage() {
  const {
    data,
    isLoading,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    pagination
  } = useServerPagination({
    queryKey: 'manufacturers',
    fetchFn: manufacturersService.getAll,
  });

  return (
    <ServerDataTable
      columns={manufacturerColumns}
      data={data || { items: [], totalCount: 0, page: 1, size: 20, totalPages: 0, hasNextPage: false, hasPreviousPage: false }}
      title="Производители"
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onSearchChange={handleSearchChange}
      currentSearch={pagination.search}
      isLoading={isLoading}
    />
  );
}
```

### 3. Обратная совместимость
Для компонентов, которые используют клиентскую пагинацию, можно продолжать использовать `DataTable`:

```tsx
import { DataTable } from '@/components/common/data-table';

// Компонент остается без изменений
<DataTable
  columns={columns}
  data={clientSideData}
  title="Название"
  isLoading={isLoading}
/>
```

## Миграция существующих страниц

1. Замените `DataTable` на `ServerDataTable`
2. Замените запрос данных на `useServerPagination`
3. Добавьте обработчики пагинации и поиска
4. Обновите структуру данных с `T[]` на `PaginatedResponse<T>`

## Особенности

- Автоматический debounced поиск (задержка 500мс)
- Поддержка сортировки (пока клиентская, можно расширить до серверной)
- Гибкие размеры страниц (10, 20, 50, 100)
- Красивая пагинация с эллипсисами
- Полная обратная совместимость со старыми компонентами
