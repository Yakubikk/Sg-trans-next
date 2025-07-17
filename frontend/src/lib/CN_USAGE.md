# Использование функции `cn` для className

## Что изменилось

Вместо использования строковых шаблонов с `${}` в `className`, теперь используется функция `cn` из утилит.

### ❌ Старый способ:
```tsx
<div className={`base-class ${conditional ? 'active' : 'inactive'} ${className}`}>
```

### ✅ Новый способ:
```tsx
<div className={cn("base-class", conditional ? "active" : "inactive", className)}>
```

## Преимущества использования `cn`

1. **Автоматическое разрешение конфликтов** - `cn` использует `tailwind-merge` для умного объединения классов
2. **Лучшая читаемость** - код выглядит чище без шаблонных строк
3. **Безопасность типов** - TypeScript лучше проверяет аргументы
4. **Условная логика** - легче писать условные классы

## Примеры обновлений

### ReferencesButtons.tsx
```tsx
// Было:
<div className={`space-y-6 ${className}`}>

// Стало:
<div className={cn("space-y-6", className)}>
```

### WagonCard.tsx
```tsx
// Было:
<div className={`border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}>

// Стало:
<div className={cn("border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow", className)}>

// Условные классы - было:
<span className={`px-2 py-1 text-xs rounded-full ${wagon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>

// Стало:
<span className={cn(
  "px-2 py-1 text-xs rounded-full",
  wagon.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
)}>
```

### UserManagement.tsx
```tsx
// Было:
<span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>

// Стало:
<span className={cn("px-2 py-1 text-xs font-medium rounded-full", getRoleColor(user.role))}>
```

### layout.tsx
```tsx
// Было:
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

// Стало:
<body className={cn(geistSans.variable, geistMono.variable, "antialiased")}>
```

## Рекомендации

1. **Всегда используйте `cn`** вместо строковых шаблонов для className
2. **Группируйте базовые классы** первым аргументом
3. **Условные классы** выносите в отдельные аргументы для читаемости
4. **Пропсы className** всегда передавайте последним аргументом

## Функция cn

```typescript
import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Эта функция:
- Объединяет классы через `clsx`
- Разрешает конфликты Tailwind через `tailwind-merge`
- Поддерживает условную логику
- Убирает дублирование классов
