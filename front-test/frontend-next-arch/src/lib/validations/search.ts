import { z } from "zod";

// Схема для поиска вагонов (более гибкая)
export const wagonSearchSchema = z.object({
  query: z
    .string()
    .min(1, "Введите номер для поиска")
    .max(50, "Номер слишком длинный")
    .transform(val => val.trim()),
});

// Схема для быстрого поиска (более гибкая)
export const quickSearchSchema = z.object({
  query: z
    .string()
    .min(1, "Поисковой запрос не может быть пустым")
    .max(100, "Слишком длинный поисковой запрос")
    .transform(val => val?.trim() || ""),
});

// Схема для поиска цистерны по номеру (более гибкая, без требования к формату)
export const cisternSearchSchema = z.object({
  number: z
    .string()
    .min(1, "Введите номер цистерны")
    .max(50, "Номер цистерны слишком длинный")
    .transform(val => val.trim()),
});

// Схема для расширенного поиска с фильтрами
export const advancedSearchSchema = z.object({
  query: z.string().optional(),
  filters: z.record(z.string(), z.any()).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

// Типы для TypeScript
export type WagonSearchFormData = z.infer<typeof wagonSearchSchema>;
export type QuickSearchFormData = z.infer<typeof quickSearchSchema>;
export type CisternSearchFormData = z.infer<typeof cisternSearchSchema>;
export type AdvancedSearchFormData = z.infer<typeof advancedSearchSchema>;
