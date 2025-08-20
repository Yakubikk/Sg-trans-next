# Система ролей и разрешений

## Обзор

Система включает в себя защиту маршрутов и компонентов на основе ролей пользователей. Поддерживаются следующие роли:
- **Admin** (ID: 1) - Администратор системы
- **User** (ID: 2) - Обычный пользователь

## Компоненты

### 1. RoleGuard
Компонент для защиты страниц и компонентов по ролям.

```tsx
import RoleGuard from '@/components/auth/role-guard';
import { Role } from '@/types/auth';

// Только для администраторов
<RoleGuard requireAdmin>
  <AdminPanel />
</RoleGuard>

// Для конкретной роли
<RoleGuard requiredRole={Role.Admin}>
  <AdminContent />
</RoleGuard>

// Для любой из указанных ролей
<RoleGuard requiredRoles={[Role.Admin, Role.User]}>
  <Content />
</RoleGuard>

// С кастомным fallback
<RoleGuard requireAdmin fallback={<AccessDenied />}>
  <AdminPanel />
</RoleGuard>

// С редиректом
<RoleGuard requireAdmin redirectTo="/dashboard">
  <AdminPanel />
</RoleGuard>
```

### 2. ConditionalRender
Компонент для условного рендеринга элементов.

```tsx
import ConditionalRender from '@/components/auth/conditional-render';

// Показать кнопку только администраторам
<ConditionalRender requireAdmin>
  <Button>Панель администратора</Button>
</ConditionalRender>

// С fallback
<ConditionalRender requireAdmin fallback={<div>Нет доступа</div>}>
  <AdminButton />
</ConditionalRender>
```

### 3. useRoleCheck Hook
Хук для проверки ролей в логике компонентов.

```tsx
import { useRoleCheck } from '@/components/auth/conditional-render';

function MyComponent() {
  const { isAdmin, hasRole, hasAnyRole, roleNames } = useRoleCheck();

  if (isAdmin) {
    return <AdminInterface />;
  }

  if (hasRole(Role.User)) {
    return <UserInterface />;
  }

  return <PublicInterface />;
}
```

### 4. HOC withRoleGuard
Обертка для защиты компонентов.

```tsx
import { withRoleGuard } from '@/components/auth/role-guard';

const AdminComponent = withRoleGuard(MyComponent, {
  requireAdmin: true
});

const UserComponent = withRoleGuard(MyComponent, {
  requiredRole: Role.User,
  redirectTo: '/login'
});
```

## Утилиты

### roleUtils
Набор функций для работы с ролями.

```tsx
import { roleUtils } from '@/lib/permissions';

// Проверка администратора
const isAdmin = roleUtils.isAdmin(user);

// Проверка конкретной роли
const hasRole = roleUtils.hasRole(user, Role.Admin);

// Проверка любой из ролей
const hasAnyRole = roleUtils.hasAnyRole(user, [Role.Admin, Role.User]);

// Получение названий ролей
const roleNames = roleUtils.getRoleNames(user);
```

## Примеры использования

### Защищенная страница администратора

```tsx
// /app/admin/page.tsx
export default function AdminPage() {
  return (
    <AuthGuard>
      <RoleGuard requireAdmin>
        <AdminContent />
      </RoleGuard>
    </AuthGuard>
  );
}
```

### Условные элементы в UI

```tsx
function Sidebar() {
  const { isAdmin } = useRoleCheck();

  return (
    <nav>
      <Link href="/dashboard">Главная</Link>
      <Link href="/profile">Профиль</Link>
      
      {isAdmin && (
        <Link href="/admin">Администрирование</Link>
      )}
      
      <ConditionalRender requireAdmin>
        <Link href="/system-settings">Настройки системы</Link>
      </ConditionalRender>
    </nav>
  );
}
```

### Защита API запросов

```tsx
function useAdminData() {
  const { isAdmin } = useRoleCheck();
  
  return useQuery({
    queryKey: ['admin-data'],
    queryFn: () => adminApi.getData(),
    enabled: isAdmin, // Запрос выполнится только для админов
  });
}
```

## Middleware

Middleware автоматически защищает маршруты `/admin` и `/dashboard`. Пользователи без токена будут перенаправлены на `/login`.

## Безопасность

1. **Серверная проверка**: Всегда проверяйте разрешения на сервере
2. **Tokens в cookies**: Токены хранятся только в secure cookies
3. **Автоматический refresh**: Токены обновляются автоматически
4. **Logout на ошибке**: При ошибке аутентификации пользователь автоматически разлогинивается
