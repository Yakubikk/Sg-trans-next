# Пример интеграции валидации в остальные компоненты

Этот файл показывает, как можно применить созданные схемы валидации к остальным компонентам приложения.

## 1. Компонент фильтров цистерн

### Обновление CisternFilters компонента:

```typescript
// src/components/cistern-filters.tsx (пример обновления)
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cisternFiltersSchema, type CisternFilters } from "@/lib/validations/filters";

export function CisternFilters(props: CisternFiltersProps) {
  const form = useForm<CisternFilters>({
    resolver: zodResolver(cisternFiltersSchema),
    defaultValues: {
      filters: [],
      columns: props.initialColumns || [],
    },
  });

  const onSubmit = (data: CisternFilters) => {
    // Данные автоматически валидированы
    props.onFiltersChange(data.filters);
    props.onColumnsChange(data.columns);
  };

  // Остальная логика компонента...
}
```

## 2. API роут для фильтрации цистерн

```typescript
// src/app/api/railway-cisterns/route.ts (пример обновления)
import { advancedSearchSchema } from "@/lib/validations/search";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Валидация параметров запроса
    const validatedParams = advancedSearchSchema.parse({
      query: searchParams.get("query") || undefined,
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: searchParams.get("sortOrder") || "asc",
    });

    // Использование валидированных данных
    const cisterns = await searchCisterns(validatedParams);
    return NextResponse.json(cisterns);
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Некорректные параметры", details: error.issues },
        { status: 400 }
      );
    }
    // Обработка других ошибок...
  }
}
```

## 3. Компонент быстрого поиска

```typescript
// src/components/QuickSearchButton.tsx (пример создания)
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quickSearchSchema, type QuickSearchFormData } from "@/lib/validations/search";

export function QuickSearchButton() {
  const [open, setOpen] = useState(false);
  const form = useForm<QuickSearchFormData>({
    resolver: zodResolver(quickSearchSchema),
    defaultValues: { query: "" },
  });

  const onSubmit = async (data: QuickSearchFormData) => {
    try {
      const response = await fetch(`/api/railway-cisterns/search?query=${encodeURIComponent(data.query)}`);
      const results = await response.json();
      // Обработка результатов...
    } catch (error) {
      console.error("Ошибка поиска:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Search className="h-4 w-4 mr-2" />
          Быстрый поиск
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Поиск</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите запрос..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Поиск</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

## 4. Хук для работы с сохраненными фильтрами

```typescript
// src/hooks/useSavedFilters.ts (пример создания)
import { useState, useCallback } from "react";
import { saveFilterSchema, type SaveFilterData } from "@/lib/validations/filters";
import { z } from "zod";

export function useSavedFilters(userId: string) {
  const [savedFilters, setSavedFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const saveFilter = useCallback(async (filterData: SaveFilterData) => {
    try {
      // Валидация перед отправкой
      const validatedData = saveFilterSchema.parse(filterData);
      
      setIsLoading(true);
      const response = await fetch("/api/user/saved-filters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Ошибка сохранения фильтра");
      }

      // Обновляем список после сохранения
      await fetchSavedFilters();
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Некорректные данные: ${error.issues.map(i => i.message).join(", ")}`);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSavedFilters = useCallback(async () => {
    // Логика загрузки сохраненных фильтров...
  }, [userId]);

  return {
    savedFilters,
    saveFilter,
    fetchSavedFilters,
    isLoading,
  };
}
```

## 5. Утилиты для валидации форм

```typescript
// src/lib/form-utils.ts (пример создания)
import { z } from "zod";
import { toast } from "sonner";

// Общая функция для обработки ошибок валидации
export function handleValidationError(error: unknown) {
  if (error instanceof z.ZodError) {
    const messages = error.issues.map(issue => issue.message);
    toast.error(`Ошибка валидации: ${messages.join(", ")}`);
    return true;
  }
  return false;
}

// Хелпер для создания форм с валидацией
export function createValidatedForm<T extends z.ZodSchema>(
  schema: T,
  defaultValues: z.infer<T>
) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}

// Безопасный парсер с обработкой ошибок
export function safeParseWithToast<T>(schema: z.ZodSchema<T>, data: unknown): T | null {
  try {
    return schema.parse(data);
  } catch (error) {
    handleValidationError(error);
    return null;
  }
}
```

## 6. Валидация на уровне middleware

```typescript
// src/middleware/validation.ts (пример создания)
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export function withValidation<T extends z.ZodSchema>(schema: T) {
  return function(handler: (req: NextRequest, validatedData: z.infer<T>) => Promise<NextResponse>) {
    return async function(req: NextRequest) {
      try {
        const body = await req.json();
        const validatedData = schema.parse(body);
        return await handler(req, validatedData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json(
            { error: "Некорректные данные", details: error.issues },
            { status: 400 }
          );
        }
        return NextResponse.json(
          { error: "Внутренняя ошибка сервера" },
          { status: 500 }
        );
      }
    };
  };
}

// Использование:
export const POST = withValidation(loginSchema)(async (req, validatedData) => {
  // validatedData уже типизирована и валидирована
  // Логика обработки...
});
```

## 7. Расширенные схемы для конкретных случаев

```typescript
// src/lib/validations/extended.ts (пример создания)
import { z } from "zod";
import { filterValueSchema } from "./filters";

// Схема для экспорта данных
export const exportSchema = z.object({
  format: z.enum(["csv", "excel", "pdf"]),
  filters: z.array(filterValueSchema),
  columns: z.array(z.string()),
  includeHeaders: z.boolean().default(true),
});

// Схема для импорта данных
export const importSchema = z.object({
  file: z.instanceof(File),
  validateData: z.boolean().default(true),
  skipErrors: z.boolean().default(false),
});

// Схема для настроек пользователя
export const userSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  language: z.enum(["ru", "en"]).default("ru"),
  pageSize: z.number().int().min(10).max(100).default(20),
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(false),
  }),
});
```

## Рекомендации по внедрению

1. **Постепенная миграция**: Обновляйте компоненты по одному, начиная с самых критичных форм
2. **Тестирование**: Добавляйте тесты для каждой новой схемы валидации
3. **Документирование**: Обновляйте документацию при добавлении новых схем
4. **Переиспользование**: Используйте общие схемы из `common.ts` для похожих полей
5. **Обратная совместимость**: Сохраняйте поддержку старых форматов данных через функции миграции

Эти примеры показывают, как системно применить созданные схемы валидации ко всем формам в приложении.
