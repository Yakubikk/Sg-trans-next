import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  SavedFilter, 
  FieldFilter, 
  FilterGroup, 
  SortField, 
  SelectedColumn, 
  LogicalOperator,
  CreateSavedFilterDto,
  UpdateSavedFilterDto
} from '@/types/filters';
import { savedFiltersService, filterUtils } from '@/lib/api/saved-filters';

interface UseFiltersOptions {
  entityType: string;
  defaultFilters?: FieldFilter[];
  defaultSort?: SortField[];
  defaultColumns?: SelectedColumn[];
}

export function useFilters({
  entityType,
  defaultFilters = [],
  defaultSort = [],
  defaultColumns = []
}: UseFiltersOptions) {
  const queryClient = useQueryClient();
  
  // Состояние текущих фильтров
  const [currentFilters, setCurrentFilters] = useState<FieldFilter[]>(defaultFilters);
  const [currentSort, setCurrentSort] = useState<SortField[]>(defaultSort);
  const [currentColumns, setCurrentColumns] = useState<SelectedColumn[]>(defaultColumns);
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);

  // Получение сохраненных фильтров
  const { 
    data: savedFilters = [], 
    isLoading: isLoadingFilters 
  } = useQuery({
    queryKey: ['saved-filters', entityType],
    queryFn: () => savedFiltersService.getByEntityType(entityType),
  });

  // Создание нового фильтра
  const createFilterMutation = useMutation({
    mutationFn: (data: CreateSavedFilterDto) => savedFiltersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-filters', entityType] });
      toast.success('Фильтр успешно сохранен');
    },
    onError: () => {
      toast.error('Ошибка при сохранении фильтра');
    },
  });

  // Обновление фильтра
  const updateFilterMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSavedFilterDto }) => 
      savedFiltersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-filters', entityType] });
      toast.success('Фильтр успешно обновлен');
    },
    onError: () => {
      toast.error('Ошибка при обновлении фильтра');
    },
  });

  // Удаление фильтра
  const deleteFilterMutation = useMutation({
    mutationFn: (id: string) => savedFiltersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-filters', entityType] });
      toast.success('Фильтр успешно удален');
    },
    onError: () => {
      toast.error('Ошибка при удалении фильтра');
    },
  });

  // Установка фильтра по умолчанию
  const setDefaultMutation = useMutation({
    mutationFn: (id: string) => savedFiltersService.setDefault(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-filters', entityType] });
      toast.success('Фильтр установлен по умолчанию');
    },
    onError: () => {
      toast.error('Ошибка при установке фильтра по умолчанию');
    },
  });

  // Применение сохраненного фильтра
  const applyFilter = useCallback((filter: SavedFilter) => {
    console.log('Applying filter:', filter);
    const filters = filterUtils.deserializeFilters(filter.filterJson);
    const sort = filterUtils.deserializeSorting(filter.sortFieldsJson);
    const columns = filterUtils.deserializeColumns(filter.selectedColumnsJson);

    console.log('Deserialized filters:', filters);

    // Если filters это FilterGroup, извлекаем фильтры
    if ('operator' in filters && 'filters' in filters) {
      setCurrentFilters(filters.filters as FieldFilter[]);
    } else {
      setCurrentFilters(filters as FieldFilter[]);
    }
    
    setCurrentSort(sort);
    setCurrentColumns(columns);
    setActiveFilterId(filter.id);
    console.log('Set activeFilterId to:', filter.id);
  }, []);

  // Сохранение текущего состояния как новый фильтр
  const saveCurrentAsFilter = useCallback((name: string, isDefault = false) => {
    console.log('Saving filter with current filters:', currentFilters);
    const serializedFilters = filterUtils.serializeFilters(currentFilters);
    console.log('Serialized filters:', serializedFilters);
    
    const filterData: CreateSavedFilterDto = {
      name,
      entityType,
      filterJson: serializedFilters,
      sortFieldsJson: filterUtils.serializeSorting(currentSort),
      selectedColumnsJson: filterUtils.serializeColumns(currentColumns),
      isDefault
    };

    console.log('Filter data to save:', filterData);
    createFilterMutation.mutate(filterData);
  }, [entityType, currentFilters, currentSort, currentColumns, createFilterMutation]);

  // Обновление существующего фильтра
  const updateFilter = useCallback((id: string, name?: string) => {
    const updateData: UpdateSavedFilterDto = {
      ...(name && { name }),
      filterJson: filterUtils.serializeFilters(currentFilters),
      sortFieldsJson: filterUtils.serializeSorting(currentSort),
      selectedColumnsJson: filterUtils.serializeColumns(currentColumns),
    };

    updateFilterMutation.mutate({ id, data: updateData });
  }, [currentFilters, currentSort, currentColumns, updateFilterMutation]);

  // Сброс фильтров
  const resetFilters = useCallback(() => {
    setCurrentFilters(defaultFilters);
    setCurrentSort(defaultSort);
    setCurrentColumns(defaultColumns);
    setActiveFilterId(null);
  }, [defaultFilters, defaultSort, defaultColumns]);

  // Добавление фильтра
  const addFilter = useCallback((filter: FieldFilter) => {
    setCurrentFilters(prev => [...prev, filter]);
  }, []);

  // Удаление фильтра
  const removeFilter = useCallback((index: number) => {
    setCurrentFilters(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Обновление фильтра
  const updateFilterAtIndex = useCallback((index: number, filter: FieldFilter) => {
    setCurrentFilters(prev => prev.map((f, i) => i === index ? filter : f));
  }, []);

  // Загрузка фильтра по умолчанию при загрузке
  useEffect(() => {
    const defaultFilter = savedFilters.find(filter => filter.isDefault);
    if (defaultFilter && !activeFilterId) {
      applyFilter(defaultFilter);
    }
  }, [savedFilters, activeFilterId, applyFilter]);

  return {
    // Состояние
    currentFilters,
    currentSort,
    currentColumns,
    activeFilterId,
    savedFilters,
    isLoadingFilters,

    // Действия с фильтрами
    setCurrentFilters,
    setCurrentSort,
    setCurrentColumns,
    addFilter,
    removeFilter,
    updateFilterAtIndex,
    resetFilters,

    // Работа с сохраненными фильтрами
    applyFilter,
    saveCurrentAsFilter,
    updateFilter,
    deleteFilter: deleteFilterMutation.mutate,
    setAsDefault: setDefaultMutation.mutate,

    // Состояние мутаций
    isSaving: createFilterMutation.isPending,
    isUpdating: updateFilterMutation.isPending,
    isDeleting: deleteFilterMutation.isPending,
    isSettingDefault: setDefaultMutation.isPending,
  };
}
