// Пример применения схем валидации к существующим компонентам
// Этот файл демонстрирует, как можно обновить существующие компоненты

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Импорт схем из нашей централизованной библиотеки
import { 
  filterValueSchema, 
  saveFilterSchema,
  type FilterValue,
  type SaveFilterData 
} from "@/lib/validations/filters";

// Пример 1: Валидация отдельного фильтра
export function validateSingleFilter(filter: unknown): FilterValue | null {
  try {
    return filterValueSchema.parse(filter);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Ошибка валидации фильтра:", error.issues);
    }
    return null;
  }
}

// Пример 2: Хук для формы сохранения фильтра с валидацией
export function useSaveFilterForm(onSave: (data: SaveFilterData) => void) {
  const form = useForm<SaveFilterData>({
    resolver: zodResolver(saveFilterSchema),
    defaultValues: {
      name: "",
      filterJson: "",
      sortFieldsJson: "",
    },
  });

  const onSubmit = (data: SaveFilterData) => {
    // Данные автоматически валидированы и типизированы
    onSave(data);
    form.reset();
  };

  return {
    form,
    onSubmit,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}

// Пример 3: Валидация массива фильтров
export function validateFilters(filters: unknown[]): FilterValue[] {
  const validFilters: FilterValue[] = [];
  
  for (const filter of filters) {
    const validated = validateSingleFilter(filter);
    if (validated) {
      validFilters.push(validated);
    }
  }
  
  return validFilters;
}

// Пример 4: Хук для работы с валидированными фильтрами
export function useValidatedFilters() {
  const [filters, setFilters] = useState<FilterValue[]>([]);
  
  const addFilter = (filter: Omit<FilterValue, 'values' | 'date'>) => {
    try {
      const validatedFilter = filterValueSchema.parse({
        ...filter,
        values: [],
        date: undefined,
      });
      setFilters(prev => [...prev, validatedFilter]);
    } catch (error) {
      console.error("Ошибка добавления фильтра:", error);
    }
  };
  
  const updateFilter = (index: number, updates: Partial<FilterValue>) => {
    setFilters(prev => {
      const newFilters = [...prev];
      try {
        newFilters[index] = filterValueSchema.parse({
          ...newFilters[index],
          ...updates,
        });
      } catch (error) {
        console.error("Ошибка обновления фильтра:", error);
        return prev; // Возвращаем предыдущее состояние при ошибке
      }
      return newFilters;
    });
  };
  
  const removeFilter = (index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index));
  };
  
  return {
    filters,
    addFilter,
    updateFilter,
    removeFilter,
  };
}

// Пример 5: Утилитарная функция для безопасного парсинга JSON фильтров
export function parseFilterJson(json: string): FilterValue[] {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return validateFilters(parsed);
  } catch (error) {
    console.error("Ошибка парсинга JSON фильтров:", error);
    return [];
  }
}

// Пример 6: Функция для безопасной сериализации фильтров
export function serializeFilters(filters: FilterValue[]): string {
  try {
    // Валидируем каждый фильтр перед сериализацией
    const validatedFilters = filters.map(filter => 
      filterValueSchema.parse(filter)
    );
    return JSON.stringify(validatedFilters);
  } catch (error) {
    console.error("Ошибка сериализации фильтров:", error);
    return "[]";
  }
}

// Пример 7: Миграция существующих данных
export function migrateOldFilterFormat(oldFilter: Record<string, unknown>): FilterValue | null {
  try {
    // Преобразуем старый формат в новый
    const migrated = {
      column: (oldFilter.field as string) || (oldFilter.column as string) || "",
      operator: (oldFilter.operator as string) || "equals",
      value: (oldFilter.value as string) || "",
      values: (oldFilter.values as string[]) || [],
      date: oldFilter.date ? new Date(oldFilter.date as string) : undefined,
    };
    
    return filterValueSchema.parse(migrated);
  } catch (error) {
    console.error("Ошибка миграции фильтра:", error);
    return null;
  }
}

const validationUtils = {
  validateSingleFilter,
  validateFilters,
  parseFilterJson,
  serializeFilters,
  migrateOldFilterFormat,
};

export default validationUtils;
