"use client";

import { usePermissions } from "@/hooks/usePermissions";
import { RoleBasedComponent } from "@/types/permissions";

// Компонент для защиты контента на основе ролей и разрешений
export function ProtectedComponent({ requiredPermissions = [], requiredRoles = [], children }: RoleBasedComponent) {
  const { user, isAuthenticated, isLoading, hasAnyPermission, hasAnyRole } = usePermissions();

  // Показываем лоадер пока данные загружаются
  if (isLoading) {
    return null; // Или можно показать спиннер
  }

  // Не рендерим контент если пользователь не авторизован
  if (!isAuthenticated || !user) {
    return null;
  }

  // Проверяем разрешения (если указаны)
  if (requiredPermissions.length > 0 && !hasAnyPermission(requiredPermissions)) {
    return null;
  }

  // Проверяем роли (если указаны)
  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return null;
  }

  return <>{children}</>;
}
