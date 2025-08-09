import { z } from "zod";

// Общие схемы для переиспользования

// Схема для ID
export const idSchema = z.uuid("Некорректный ID");

// Схема для пагинации
export const paginationSchema = z.object({
  page: z
    .number()
    .int("Номер страницы должен быть целым числом")
    .min(1, "Номер страницы должен быть больше 0")
    .default(1),
  limit: z
    .number()
    .int("Лимит должен быть целым числом")
    .min(1, "Лимит должен быть больше 0")
    .max(100, "Лимит не может быть больше 100")
    .default(10),
});

// Схема для сортировки
export const sortSchema = z.object({
  field: z.string().min(1, "Поле сортировки обязательно"),
  direction: z.enum(["asc", "desc"]).default("asc"),
});

// Схема для поиска с пагинацией и сортировкой
export const searchWithPaginationSchema = paginationSchema.extend({
  query: z.string().optional(),
  sort: z.array(sortSchema).optional(),
});

// Схема для email
export const emailSchema = z.email("Некорректный email");

// Схема для пароля
export const passwordSchema = z
  .string()
  .min(6, "Пароль должен содержать минимум 6 символов")
  .max(128, "Пароль слишком длинный");

// Схема для строки с ограничениями
export const stringSchema = (minLength = 1, maxLength = 255, message = "Строка обязательна") =>
  z.string()
    .min(minLength, message)
    .max(maxLength, `Максимальная длина: ${maxLength} символов`)
    .transform(val => val.trim());

// Схема для опционального строкового поля
export const optionalStringSchema = (maxLength = 255) =>
  z.string()
    .max(maxLength, `Максимальная длина: ${maxLength} символов`)
    .optional()
    .transform(val => val ? val.trim() : undefined);

// Схема для числа в диапазоне
export const numberInRangeSchema = (min = 0, max = Number.MAX_SAFE_INTEGER) =>
  z.number()
    .min(min, `Минимальное значение: ${min}`)
    .max(max, `Максимальное значение: ${max}`);

// Схема для положительного числа
export const positiveNumberSchema = z
  .number()
  .positive("Значение должно быть положительным");

// Схема для даты
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Некорректный формат даты (YYYY-MM-DD)")
  .refine((val) => !isNaN(Date.parse(val)), "Некорректная дата");

// Схема для диапазона дат
export const dateRangeSchema = z.object({
  from: dateSchema.optional(),
  to: dateSchema.optional(),
}).refine((data) => {
  if (data.from && data.to) {
    return new Date(data.from) <= new Date(data.to);
  }
  return true;
}, {
  message: "Дата начала не может быть позже даты окончания",
});

// Схема для телефона
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Некорректный номер телефона")
  .optional();

// Схема для массива строк
export const stringArraySchema = z
  .array(z.string())
  .default([]);

// Схема для массива чисел
export const numberArraySchema = z
  .array(z.number())
  .default([]);

// Типы для TypeScript
export type PaginationData = z.infer<typeof paginationSchema>;
export type SortData = z.infer<typeof sortSchema>;
export type SearchWithPaginationData = z.infer<typeof searchWithPaginationSchema>;
export type DateRangeData = z.infer<typeof dateRangeSchema>;
