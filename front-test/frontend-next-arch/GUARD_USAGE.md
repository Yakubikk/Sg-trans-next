# Руководство по использованию компонента Guard

Компонент `Guard` предоставляет гибкую систему контроля доступа на основе ролей и разрешений пользователя.

## Основные возможности

### 1. Проверка ролей

```tsx
// Проверка одной роли
<Guard roles="Admin">
  <AdminPanel />
</Guard>

// Проверка нескольких ролей (любая из)
<Guard roles={["Admin", "Moderator"]} requireAll={false}>
  <ManagementPanel />
</Guard>

// Проверка нескольких ролей (все одновременно)
<Guard roles={["Admin", "SuperUser"]} requireAll={true}>
  <SuperAdminPanel />
</Guard>
```

### 2. Проверка разрешений

```tsx
// Проверка одного разрешения
<Guard perms="view.reports">
  <ReportsSection />
</Guard>

// Проверка нескольких разрешений (любое из)
<Guard perms={["view.reports", "manage.users"]} requireAll={false}>
  <AnyPermissionPanel />
</Guard>

// Проверка нескольких разрешений (все одновременно)
<Guard perms={["view.reports", "manage.users"]} requireAll={true}>
  <AllPermissionsPanel />
</Guard>
```

### 3. Комбинированная проверка

```tsx
// Роли И разрешения одновременно
<Guard roles="Admin" perms="manage.system">
  <SystemManagement />
</Guard>

// Роли ИЛИ разрешения
<Guard roles="Admin" perms="manage.users" requireAll={false}>
  <UserManagement />
</Guard>
```

### 4. Fallback контент

```tsx
// Показать альтернативный контент при отсутствии доступа
<Guard roles="Admin" fallback={
  <div className="text-red-500">
    Нет доступа к админ панели
  </div>
}>
  <AdminPanel />
</Guard>

// Без fallback - просто скрыть контент
<Guard roles="Admin">
  <AdminPanel />
</Guard>
```

### 5. Проверка авторизации

```tsx
// Показать только авторизованным пользователям
<Guard requireAuth>
  <UserProfile />
</Guard>

// Показать только неавторизованным
<Guard requireAuth={false}>
  <LoginForm />
</Guard>
```

## Параметры компонента

| Параметр | Тип | Описание |
|----------|-----|-----------|
| `roles` | `string \| string[]` | Роли для проверки |
| `perms` | `string \| string[]` | Разрешения для проверки |
| `requireAll` | `boolean` | Требовать все роли/разрешения (`true`) или любое (`false`). По умолчанию `true` |
| `requireAuth` | `boolean` | Требовать авторизацию. По умолчанию `true` |
| `fallback` | `ReactNode` | Контент для отображения при отсутствии доступа |
| `children` | `ReactNode` | Контент для отображения при наличии доступа |

## Примеры использования

### Навигационное меню

```tsx
<nav>
  <Guard roles="User">
    <NavItem href="/profile">Профиль</NavItem>
  </Guard>
  
  <Guard roles="Admin">
    <NavItem href="/admin">Админка</NavItem>
  </Guard>
  
  <Guard perms="view.reports">
    <NavItem href="/reports">Отчёты</NavItem>
  </Guard>
</nav>
```

### Условная логика

```tsx
// Разные кнопки для разных ролей
<div>
  <Guard roles="Admin">
    <Button variant="destructive">Удалить пользователя</Button>
  </Guard>
  
  <Guard roles="Moderator">
    <Button variant="outline">Заблокировать</Button>
  </Guard>
  
  <Guard roles="User">
    <Button>Редактировать профиль</Button>
  </Guard>
</div>
```

### Комплексные проверки

```tsx
// Админ ИЛИ право управления пользователями
<Guard roles="Admin" perms="manage.users" requireAll={false}>
  <UserManagementPanel />
</Guard>

// Модератор И право удаления контента
<Guard roles="Moderator" perms="delete.content" requireAll={true}>
  <DeleteButton />
</Guard>
```

## Интеграция с формами

```tsx
<form>
  <input name="name" />
  <input name="email" />
  
  <Guard roles="Admin">
    <select name="role">
      <option value="User">Пользователь</option>
      <option value="Admin">Администратор</option>
    </select>
  </Guard>
  
  <Guard perms="assign.permissions">
    <PermissionSelector />
  </Guard>
  
  <button type="submit">Сохранить</button>
</form>
```

## Лучшие практики

1. **Используйте fallback для важной информации** - покажите пользователю почему контент недоступен
2. **Группируйте связанные проверки** - используйте `requireAll={false}` для альтернативных путей доступа
3. **Минимизируйте вложенность** - избегайте глубоко вложенных Guard компонентов
4. **Тестируйте разные роли** - убедитесь что доступ работает корректно для всех типов пользователей

## Отладка

Компонент `Guard` автоматически получает данные о пользователе через `useAuth` хук. Для отладки можно:

1. Проверить состояние пользователя в React DevTools
2. Временно добавить `console.log` в компонент Guard
3. Использовать fallback для показа отладочной информации

```tsx
<Guard roles="Admin" fallback={
  <div>
    Отладка: текущие роли {JSON.stringify(user?.roles)}
  </div>
}>
  <AdminPanel />
</Guard>
```
