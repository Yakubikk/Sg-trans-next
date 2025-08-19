# Authentication API Documentation

## Обзор

API для аутентификации создан с использованием React Query и Axios. Включает в себя все необходимые функции для работы с пользователями и ролями.

## Структура файлов

```
src/
├── api/
│   ├── index.ts          # Экспорт всех API функций
│   └── auth.ts           # API функции для аутентификации
├── hooks/
│   └── useAuth.ts        # React Query хуки
├── lib/
│   └── api.ts           # Базовая конфигурация Axios
├── providers/
│   └── query-provider.tsx # React Query провайдер
└── types/
    └── auth.ts          # TypeScript типы
```

## Основные функции

### Публичные эндпоинты

- `login` - Вход в систему
- `refreshToken` - Обновление токена доступа

### Защищенные эндпоинты

- `register` - Регистрация пользователя
- `getCurrentUser` - Получение данных текущего пользователя
- `getAllUsers` - Получение всех пользователей
- `getUserPermissions` - Получение разрешений пользователя
- `getAllRoles` - Получение всех ролей
- `updateUser` - Обновление данных пользователя
- `updateUserRoles` - Обновление ролей пользователя
- `resetPassword` - Сброс пароля
- `deleteUser` - Удаление пользователя

## Использование

### 1. Подключение провайдера

```tsx
// В layout.tsx или _app.tsx
import QueryProvider from '@/providers/query-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

### 2. Использование хуков

```tsx
import { useLogin, useCurrentUser, useAllUsers } from '@/api';

function LoginForm() {
  const loginMutation = useLogin();

  const handleLogin = async (data: LoginRequest) => {
    try {
      await loginMutation.mutateAsync(data);
      // Успешный вход
    } catch (error) {
      // Обработка ошибки
    }
  };
}

function UserProfile() {
  const { data: user, isLoading, error } = useCurrentUser();
  
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки пользователя</div>;
  
  return <div>{user?.firstName} {user?.lastName}</div>;
}
```

### 3. Переменные окружения

Убедитесь, что в `.env.local` настроен URL API:

```bash
NEXT_PUBLIC_API_URL=http://vagon.sgtrans.by:5000
```

## Особенности

1. **Автоматическое обновление токена** - Axios интерцептор автоматически обновляет access token при истечении
2. **Кэширование** - React Query кэширует данные на 5 минут
3. **Типизация** - Все типы соответствуют серверной части
4. **Инвалидация кэша** - Кэш автоматически обновляется при изменении данных

## Типы данных

Все типы соответствуют серверной части:

- `LoginRequest` / `LoginResponse`
- `RegisterUserRequest`
- `GetCurrentUserResponse`
- `GetAllUsersResponse`
- `Permission` enum
- `Role` enum
- И другие...
