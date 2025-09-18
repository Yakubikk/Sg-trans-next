'use client';

import { useCurrentUser } from '@/hooks';
import { roleUtils } from '@/lib/permissions';
import { Role } from '@/types/auth';

interface ConditionalRenderProps {
  children: React.ReactNode;
  requiredRole?: Role;
  requiredRoles?: Role[];
  requireAdmin?: boolean;
  fallback?: React.ReactNode;
}

export default function ConditionalRender({
  children,
  requiredRole,
  requiredRoles,
  requireAdmin = false,
  fallback = null,
}: ConditionalRenderProps) {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <>{fallback}</>;
  }

  // Проверка административных прав
  if (requireAdmin && !roleUtils.isAdmin(user)) {
    return <>{fallback}</>;
  }

  // Проверка конкретной роли
  if (requiredRole && !roleUtils.hasRole(user, requiredRole)) {
    return <>{fallback}</>;
  }

  // Проверка любой из указанных ролей
  if (requiredRoles && !roleUtils.hasAnyRole(user, requiredRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Хук для условной логики
export function useRoleCheck() {
  const { data: user } = useCurrentUser();

  return {
    isAdmin: roleUtils.isAdmin(user),
    hasRole: (role: Role) => roleUtils.hasRole(user, role),
    hasAnyRole: (roles: Role[]) => roleUtils.hasAnyRole(user, roles),
    roleNames: roleUtils.getRoleNames(user),
  };
}
