# SG Trans - API и Backend документация

## Обзор

Создан полнофункциональный fake backend с использованием TypeScript и Zustand для системы управления пользователями SG Trans.

## Архитектура

### 🗂️ Структура проекта

```
src/
├── api/
│   └── userApi.ts           # Fake API сервис
├── store/
│   └── userStore.ts         # Zustand store
├── types/
│   ├── user.ts              # Типы пользователей
│   └── permissions.ts       # Типы разрешений и ролей
├── components/
│   ├── ProtectedComponent.tsx   # Компонент защиты маршрутов
│   ├── UserManagement.tsx       # Управление пользователями
│   └── LogoutButton.tsx         # Кнопка выхода
└── app/
    ├── login/               # Страница входа
    ├── users/               # Управление пользователями
    ├── admin/               # Админ панель
    └── access-denied/       # Страница отказа в доступе
```

## 🔐 Система аутентификации

### Роли пользователей
- **Admin** - полный доступ ко всем функциям
- **Manager** - управление пользователями и аналитика
- **User** - базовые функции просмотра данных

### Разрешения
- `VIEW_USERS` - просмотр пользователей
- `CREATE_USER` - создание пользователей
- `EDIT_USER` - редактирование пользователей
- `DELETE_USER` - удаление пользователей
- `BAN_USER` - блокировка пользователей
- `VIEW_DASHBOARD` - доступ к панели управления
- `VIEW_ANALYTICS` - просмотр аналитики
- `MANAGE_SYSTEM` - системное администрирование

## 📊 API Методы

### Аутентификация

#### `login(credentials: LoginRequest)`
```typescript
// Вход в систему
const response = await userApi.login({
  email: 'admin@example.com',
  password: 'password'
});
```

#### `logout()`
```typescript
// Выход из системы
await userApi.logout();
```

#### `getCurrentUser()`
```typescript
// Получение текущего пользователя
const user = await userApi.getCurrentUser();
```

### Управление пользователями

#### `getUsers(params?: UserListParams)`
```typescript
// Получение списка пользователей с фильтрацией
const users = await userApi.getUsers({
  page: 1,
  limit: 10,
  search: 'иван',
  role: Role.MANAGER,
  isActive: true,
  sortBy: 'createdAt',
  sortOrder: 'desc'
});
```

#### `getUserById(id: string)`
```typescript
// Получение пользователя по ID
const user = await userApi.getUserById('user-id');
```

#### `createUser(userData: CreateUserRequest)`
```typescript
// Создание нового пользователя
const newUser = await userApi.createUser({
  email: 'new@example.com',
  firstName: 'Иван',
  lastName: 'Иванов',
  password: 'password123',
  role: Role.USER
});
```

#### `updateUser(id: string, userData: UpdateUserRequest)`
```typescript
// Обновление пользователя
const updatedUser = await userApi.updateUser('user-id', {
  firstName: 'Новое имя',
  isActive: false
});
```

#### `deleteUser(id: string)`
```typescript
// Удаление пользователя
await userApi.deleteUser('user-id');
```

#### `banUser(id: string)` / `unbanUser(id: string)`
```typescript
// Блокировка/разблокировка пользователя
await userApi.banUser('user-id');
await userApi.unbanUser('user-id');
```

#### `toggleUserStatus(id: string)`
```typescript
// Переключение статуса активности
await userApi.toggleUserStatus('user-id');
```

## 🗃️ Zustand Store

### Состояние
```typescript
interface UserState {
  // Текущий пользователь
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Список пользователей
  users: User[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  isLoadingUsers: boolean;

  // Фильтры
  filters: UserListParams;
}
```

### Использование в компонентах
```typescript
const {
  currentUser,
  isAuthenticated,
  users,
  login,
  logout,
  fetchUsers,
  createUser,
  updateUser,
  deleteUser
} = useUserStore();
```

## 🛡️ Защита маршрутов

### Компонент ProtectedComponent
```typescript
<ProtectedComponent
  requiredPermissions={[Permission.VIEW_USERS]}
  requiredRoles={[Role.ADMIN, Role.MANAGER]}
  fallbackPath="/access-denied"
>
  <YourProtectedContent />
</ProtectedComponent>
```

### HOC для защиты страниц
```typescript
export default withRoleProtection(AdminDashboard, {
  requiredPermissions: [Permission.VIEW_DASHBOARD],
  requiredRoles: [Role.ADMIN, Role.MANAGER]
});
```

### Хук usePermissions
```typescript
const {
  user,
  isAuthenticated,
  hasPermission,
  hasRole,
  hasAnyPermission,
  hasAnyRole
} = usePermissions();

// Проверка разрешений
if (hasPermission(Permission.EDIT_USER)) {
  // Показать кнопку редактирования
}
```

## 📝 Типы данных

### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  isActive: boolean;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  avatar?: string;
}
```

### Фильтры и пагинация
```typescript
interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: Role;
  isActive?: boolean;
  isBanned?: boolean;
  sortBy?: 'createdAt' | 'firstName' | 'lastName' | 'email' | 'lastLoginAt';
  sortOrder?: 'asc' | 'desc';
}
```

## 🎯 Возможности системы

### ✅ Реализовано
- Полная аутентификация и авторизация
- Ролевая система доступа
- CRUD операции для пользователей
- Фильтрация и поиск пользователей
- Пагинация данных
- Управление статусами (активация/блокировка)
- Защита маршрутов
- Fake backend с симуляцией задержек
- Персистентное состояние (localStorage)
- Красивый UI с Tailwind CSS

### 🚀 Демо пользователи
1. **Админ**: admin@example.com (полный доступ)
2. **Менеджер**: manager@example.com (управление пользователями)
3. **Пользователь**: user@example.com (базовые функции)

### 📱 Страницы приложения
- `/` - Главная страница с навигацией
- `/login` - Страница входа с быстрыми кнопками
- `/users` - Управление пользователями (Admin/Manager)
- `/admin` - Админ панель (Admin/Manager)
- `/access-denied` - Страница отказа в доступе
- `/not-found` - 404 страница

## 🛠️ Технологии

- **Next.js 15** - React фреймворк
- **TypeScript** - типизация
- **Zustand** - управление состоянием
- **Tailwind CSS** - стили
- **React Hook Form** - работа с формами (готово к использованию)

## 🔄 Будущие улучшения

- Модальные окна для создания/редактирования пользователей
- Загрузка и обрезка аватаров
- Экспорт данных в CSV/Excel
- Продвинутые фильтры
- Уведомления и toast сообщения
- Подключение к реальному API
- Валидация форм с Zod
- Тесты (Jest/Testing Library)
