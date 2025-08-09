import { z } from "zod";

// Схема для входа в систему
export const loginSchema = z.object({
  email: z.email("Некорректный email"),
  password: z
    .string()
    .min(1, "Пароль обязателен"),
});

// Схема для регистрации пользователя
export const registerSchema = z.object({
  email: z.email("Некорректный email"),
  password: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]+$/,
      "Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву, одну цифру и один специальный символ (@$!%*?&)"
    ),
  confirmPassword: z.string(),
  firstName: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length > 0, {
      message: "Имя не может быть пустым"
    }),
  lastName: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length > 0, {
      message: "Фамилия не может быть пустой"
    }),
  patronymic: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length > 0, {
      message: "Отчество не может быть пустым"
    }),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
      message: "Некорректный номер телефона"
    }),
  roleIds: z
    .array(z.number())
    .min(1, "Выберите хотя бы одну роль"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

// Типы для TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// Упрощенная схема для API (без confirmPassword)
export const registerAPISchema = registerSchema.omit({ confirmPassword: true });
export type RegisterAPIData = z.infer<typeof registerAPISchema>;
