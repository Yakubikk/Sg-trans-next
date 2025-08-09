import { z } from "zod";

// Схема для отдельного фильтра
export const filterValueSchema = z.object({
  column: z.string().min(1, "Выберите колонку"),
  operator: z.enum([
    "equals",
    "not_equals", 
    "contains",
    "not_contains",
    "starts_with",
    "ends_with",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal",
    "between",
    "in",
    "not_in",
    "is_null",
    "is_not_null"
  ]),
  value: z.string().optional(),
  values: z.array(z.string()).optional(),
  date: z.date().optional(),
});

// Схема для фильтров цистерн
export const cisternFiltersSchema = z.object({
  filters: z.array(filterValueSchema).default([]),
  columns: z.array(z.string()).default([]),
});

// Схема для сохранения фильтра
export const saveFilterSchema = z.object({
  name: z
    .string()
    .min(1, "Название фильтра обязательно")
    .max(100, "Название слишком длинное")
    .transform(val => val.trim()),
  filterJson: z.string().min(1, "Данные фильтра обязательны"),
  sortFieldsJson: z.string().min(1, "Данные сортировки обязательны"),
  userId: z.uuid("Некорректный ID пользователя").optional(),
});

// Схема для обновления фильтра
export const updateFilterSchema = saveFilterSchema.partial().extend({
  id: z.uuid("Некорректный ID фильтра"),
});

// Схема для расширенных фильтров цистерн (как в старом компоненте)
export const advancedCisternFiltersSchema = z.object({
  // Основные фильтры
  numbers: z.array(z.string()).optional(),
  registrationNumbers: z.array(z.string()).optional(),
  serialNumbers: z.array(z.string()).optional(),
  
  // Даты
  buildDateFrom: z.string().optional(),
  buildDateTo: z.string().optional(),
  
  // Размеры
  lengthFrom: z.number().min(0).optional(),
  lengthTo: z.number().min(0).optional(),
  volumeFrom: z.number().min(0).optional(),
  volumeTo: z.number().min(0).optional(),
  
  // Технические характеристики
  testPressureFrom: z.number().min(0).optional(),
  testPressureTo: z.number().min(0).optional(),
  
  // Справочные данные
  manufacturerIds: z.array(z.string()).optional(),
  typeIds: z.array(z.string()).optional(),
  modelIds: z.array(z.string()).optional(),
  ownerIds: z.array(z.string()).optional(),
  affiliationIds: z.array(z.string()).optional(),
}).refine((data) => {
  // Проверяем, что "от" не больше "до" для всех диапазонов
  const checks = [
    { from: data.lengthFrom, to: data.lengthTo, field: "length" },
    { from: data.volumeFrom, to: data.volumeTo, field: "volume" },
    { from: data.testPressureFrom, to: data.testPressureTo, field: "testPressure" },
  ];
  
  for (const check of checks) {
    if (check.from !== undefined && check.to !== undefined && check.from > check.to) {
      return false;
    }
  }
  
  return true;
}, {
  message: "Значение 'от' не может быть больше значения 'до'",
});

// Типы для TypeScript
export type FilterValue = z.infer<typeof filterValueSchema>;
export type CisternFilters = z.infer<typeof cisternFiltersSchema>;
export type SaveFilterData = z.infer<typeof saveFilterSchema>;
export type UpdateFilterData = z.infer<typeof updateFilterSchema>;
export type AdvancedCisternFilters = z.infer<typeof advancedCisternFiltersSchema>;
