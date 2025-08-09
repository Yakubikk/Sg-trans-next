# SG-Trans - Система управления транспортом

Полнофункциональная система аутентификации и авторизации с ролевым доступом, построенная на Next.js 15, Prisma и PostgreSQL.

## Возможности

- ✅ **Аутентификация**: JWT токены (access + refresh) с httpOnly cookies
- ✅ **Авторизация**: Ролевая модель доступа (RBAC) с permissions
- ✅ **Защищённые маршруты**: Middleware для контроля доступа
- ✅ **Современный UI**: shadcn/ui компоненты с Tailwind CSS
- ✅ **Валидация форм**: react-hook-form + zod
- ✅ **Состояние**: @tanstack/react-query для кэширования
- ✅ **Уведомления**: sonner для toast-сообщений

## Структура ролей и прав

### Роли
- **admin** - Администратор системы
- **user** - Обычный пользователь

### Права (Permissions)
- **manage.users** - Управление пользователями
- **view.reports** - Просмотр отчётов

## Маршруты

| Маршрут | Доступ | Описание |
|---------|--------|----------|
| `/` | Любой | Автоматический редирект: guest → `/guest`, авторизованный → `/dashboard` |
| `/guest` | Публичный | Гостевая страница с формами входа/регистрации |
| `/login` | Публичный | Форма входа |
| `/register` | Публичный | Форма регистрации |
| `/dashboard` | Авторизованные | Личный кабинет пользователя |
| `/admin` | Роль "admin" | Административная панель |

## API Endpoints

| Endpoint | Метод | Описание |
|----------|-------|----------|
| `/api/auth/register` | POST | Регистрация нового пользователя |
| `/api/auth/login` | POST | Вход в систему |
| `/api/auth/me` | GET | Получение текущего пользователя |
| `/api/auth/refresh` | POST | Обновление access токена |
| `/api/auth/logout` | POST | Выход из системы |

## Установка и запуск

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка окружения
Скопируйте `.env.example` в `.env` и заполните:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@46.216.223.61:5432/db?schema=public"
JWT_ACCESS_SECRET="your-strong-access-secret"
JWT_REFRESH_SECRET="your-strong-refresh-secret"
```

### 3. Генерация Prisma Client
```bash
npm run prisma:generate
```

### 4. (Опционально) Заполнение тестовыми данными
```bash
npx tsx prisma/seed.ts
```

Создаёт:
- Роли: admin, user
- Права: manage.users, view.reports
- Тестового админа: `admin@example.com` / `admin123`

### 5. Запуск разработки
```bash
npm run dev
```

Приложение будет доступно на `http://localhost:3000`

## Использование компонентов

### Компонент Access
Условное отображение контента по ролям/правам:

```tsx
import { Access } from "@/components/Access";

// По роли
<Access role="admin">
  <div>Только для админов</div>
</Access>

// По праву
<Access perm="manage.users">
  <div>Только с правом manage.users</div>
</Access>

// С fallback
<Access role="admin" fallback={<div>Нет доступа</div>}>
  <div>Админский контент</div>
</Access>
```

### Хук useAuth
Получение информации о пользователе:

```tsx
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { data, isLoading } = useAuth();
  
  if (isLoading) return <div>Загрузка...</div>;
  if (!data?.user) return <div>Не авторизован</div>;
  
  return <div>Привет, {data.user.email}!</div>;
}
```

## Архитектура

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js API Routes
- **База данных**: PostgreSQL
- **ORM**: Prisma
- **UI**: shadcn/ui + Tailwind CSS
- **Формы**: react-hook-form + zod
- **Состояние**: @tanstack/react-query
- **Аутентификация**: JWT (jose)

## Безопасность

- ✅ Пароли хэшируются с bcrypt
- ✅ JWT токены с коротким временем жизни (15 мин access, 7 дней refresh)
- ✅ HttpOnly cookies для защиты от XSS
- ✅ Middleware защита маршрутов
- ✅ Валидация на уровне схемы (zod)
- ✅ TypeScript для типобезопасности

## Лицензия

© 2025 SG-Trans. Система управления транспортом.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
