# Схемы валидации с Zod

Этот проект использует централизованную систему валидации на основе библиотеки Zod. Все схемы валидации находятся в папке `src/lib/validations/`.

## Структура

```
src/lib/validations/
├── index.ts          # Централизованный экспорт всех схем
├── auth.ts           # Схемы для аутентификации и регистрации
├── search.ts         # Схемы для поиска
├── filters.ts        # Схемы для фильтров
└── common.ts         # Общие переиспользуемые схемы
```

## Основные схемы

### Аутентификация (`auth.ts`)

#### loginSchema
Схема для формы входа в систему:
```typescript
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
```

#### registerSchema
Схема для формы регистрации пользователя:
```typescript
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";

const form = useForm<RegisterFormData>({
  resolver: zodResolver(registerSchema),
});
```

### Поиск (`search.ts`)

#### wagonSearchSchema
Схема для поиска вагонов:
```typescript
import { wagonSearchSchema, type WagonSearchFormData } from "@/lib/validations/search";
```

#### quickSearchSchema
Схема для быстрого поиска:
```typescript
import { quickSearchSchema, type QuickSearchFormData } from "@/lib/validations/search";
```

#### cisternSearchSchema
Схема для поиска цистерн:
```typescript
import { cisternSearchSchema, type CisternSearchFormData } from "@/lib/validations/search";
```

### Фильтры (`filters.ts`)

#### cisternFiltersSchema
Схема для фильтров цистерн:
```typescript
import { cisternFiltersSchema, type CisternFilters } from "@/lib/validations/filters";
```

#### saveFilterSchema
Схема для сохранения фильтров:
```typescript
import { saveFilterSchema, type SaveFilterData } from "@/lib/validations/filters";
```

### Общие схемы (`common.ts`)

#### paginationSchema
Схема для пагинации:
```typescript
import { paginationSchema, type PaginationData } from "@/lib/validations/common";
```

#### emailSchema
Переиспользуемая схема для валидации email:
```typescript
import { emailSchema } from "@/lib/validations/common";
```

## Использование в компонентах

### React Hook Form + Zod

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // data автоматически типизирована и валидирована
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* форма */}
      </form>
    </Form>
  );
}
```

### API Routes

```typescript
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations/auth";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);
    
    // validatedData типизирована и валидирована
    // обработка запроса...
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Некорректные данные", details: error.issues },
        { status: 400 }
      );
    }
    // обработка других ошибок...
  }
}
```

## Расширение схем

### Добавление новой схемы

1. Создайте схему в соответствующем файле:
```typescript
// src/lib/validations/auth.ts
export const resetPasswordSchema = z.object({
  email: emailSchema,
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
```

2. Экспортируйте её в `index.ts`:
```typescript
// src/lib/validations/index.ts
export * from './auth';
// ...остальные экспорты
```

3. Используйте в компонентах:
```typescript
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations";
```

### Композиция схем

Используйте методы Zod для создания сложных схем:

```typescript
const baseUserSchema = z.object({
  email: emailSchema,
  firstName: stringSchema(1, 50, "Имя обязательно"),
  lastName: stringSchema(1, 50, "Фамилия обязательна"),
});

// Расширение базовой схемы
export const createUserSchema = baseUserSchema.extend({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

// Частичное обновление
export const updateUserSchema = baseUserSchema.partial();

// Исключение полей
export const publicUserSchema = baseUserSchema.omit({ email: true });
```

## Рекомендации

1. **Используйте TypeScript типы**: Всегда экспортируйте типы с помощью `z.infer<typeof schema>`
2. **Переиспользуйте схемы**: Создавайте базовые схемы в `common.ts` для переиспользования
3. **Добавляйте понятные сообщения об ошибках**: Все сообщения должны быть на русском языке
4. **Валидируйте на клиенте и сервере**: Используйте одни и те же схемы для frontend и API
5. **Используйте transform**: Применяйте `.transform()` для нормализации данных (например, `.trim()`)
6. **Группируйте связанные схемы**: Держите схемы одной функциональности в одном файле

## Примеры сообщений об ошибках

```typescript
// Хорошо
email: z.string().email("Некорректный email")
password: z.string().min(6, "Пароль должен содержать минимум 6 символов")

// Плохо
email: z.string().email() // Сообщение по умолчанию на английском
password: z.string().min(6) // Неинформативное сообщение
```
