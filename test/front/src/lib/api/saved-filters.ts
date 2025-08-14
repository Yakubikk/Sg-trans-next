import { apiClient } from './client';
import { SavedFilter, CreateSavedFilterDto, UpdateSavedFilterDto, ApplyFilterDto, FieldFilter, FilterGroup, SortField, SelectedColumn, LogicalOperator } from '@/types/filters';
import { PaginationParams, PaginatedResult } from '@/types/models';

export const savedFiltersService = {
  // Получить все сохраненные фильтры для типа сущности
  async getByEntityType(entityType: string): Promise<SavedFilter[]> {
    return await apiClient.get<SavedFilter[]>(`/savedfilters/${entityType}`);
  },

  // Создать новый сохраненный фильтр
  async create(data: CreateSavedFilterDto): Promise<SavedFilter> {
    return await apiClient.post<SavedFilter>('/savedfilters', data);
  },

  // Обновить сохраненный фильтр
  async update(id: string, data: UpdateSavedFilterDto): Promise<SavedFilter> {
    return await apiClient.put<SavedFilter>(`/savedfilters/${id}`, data);
  },

  // Удалить сохраненный фильтр
  async delete(id: string): Promise<void> {
    await apiClient.delete<void>(`/savedfilters/${id}`);
  },

  // Получить сохраненный фильтр по ID
  async getById(id: string): Promise<SavedFilter> {
    return await apiClient.get<SavedFilter>(`/savedfilters/filter/${id}`);
  },

  // Установить фильтр как по умолчанию
  async setDefault(id: string): Promise<void> {
    await apiClient.post<void>(`/savedfilters/${id}/set-default`);
  },

  // Применить сохраненный фильтр к списку данных
  async applyFilter<T>(
    entityEndpoint: string,
    filterData: ApplyFilterDto,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<T>> {
    const params = new URLSearchParams();
    if (pagination?.page) params.append('page', pagination.page.toString());
    if (pagination?.size) params.append('size', pagination.size.toString());

    return await apiClient.post<PaginatedResult<T>>(
      `${entityEndpoint}/apply-filter?${params.toString()}`,
      filterData
    );
  }
};

// Утилиты для работы с фильтрами
export const filterUtils = {
  // Сериализация фильтров в JSON
  serializeFilters(filters: FieldFilter[] | FilterGroup): string {
    return JSON.stringify(filters);
  },

  // Десериализация фильтров из JSON
  deserializeFilters(filtersJson: string): FieldFilter[] | FilterGroup {
    try {
      return JSON.parse(filtersJson);
    } catch {
      return { operator: LogicalOperator.AND, filters: [] };
    }
  },

  // Сериализация сортировки в JSON
  serializeSorting(sorting: SortField[]): string {
    return JSON.stringify(sorting);
  },

  // Десериализация сортировки из JSON
  deserializeSorting(sortingJson: string): SortField[] {
    try {
      return JSON.parse(sortingJson);
    } catch {
      return [];
    }
  },

  // Сериализация выбранных колонок в JSON
  serializeColumns(columns: SelectedColumn[]): string {
    return JSON.stringify(columns);
  },

  // Десериализация выбранных колонок из JSON
  deserializeColumns(columnsJson: string): SelectedColumn[] {
    try {
      return JSON.parse(columnsJson);
    } catch {
      return [];
    }
  }
};
