'use client';

import { useCurrentUser } from '@/hooks/useAuth';
import { roleUtils } from '@/lib/permissions';
import { Role } from '@/types/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: Role;
  requiredRoles?: Role[];
  requireAdmin?: boolean;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export default function RoleGuard({
  children,
  requiredRole,
  requiredRoles,
  requireAdmin = false,
  fallback,
  redirectTo,
}: RoleGuardProps) {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Предотвращаем несоответствие гидратации
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Проверка административных прав
  if (requireAdmin && !roleUtils.isAdmin(user)) {
    if (redirectTo) {
      router.push(redirectTo);
      return null;
    }

    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full">
            <Alert variant="destructive">
              <AlertDescription>
                У вас нет прав доступа к этой странице. Требуются права администратора.
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Button onClick={() => router.push('/dashboard')} variant="outline">
                Вернуться на главную
              </Button>
            </div>
          </div>
        </div>
      )
    );
  }

  // Проверка конкретной роли
  if (requiredRole && !roleUtils.hasRole(user, requiredRole)) {
    if (redirectTo) {
      router.push(redirectTo);
      return null;
    }

    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full">
            <Alert variant="destructive">
              <AlertDescription>
                У вас нет прав доступа к этой странице. Требуется роль: {Role[requiredRole]}.
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Button onClick={() => router.push('/dashboard')} variant="outline">
                Вернуться на главную
              </Button>
            </div>
          </div>
        </div>
      )
    );
  }

  // Проверка любой из указанных ролей
  if (requiredRoles && !roleUtils.hasAnyRole(user, requiredRoles)) {
    if (redirectTo) {
      router.push(redirectTo);
      return null;
    }

    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full">
            <Alert variant="destructive">
              <AlertDescription>
                У вас нет прав доступа к этой странице. Требуется одна из ролей: {requiredRoles.map(r => Role[r]).join(', ')}.
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Button onClick={() => router.push('/dashboard')} variant="outline">
                Вернуться на главную
              </Button>
            </div>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}

// HOC для защиты компонентов по ролям
export function withRoleGuard<T extends object>(
  Component: React.ComponentType<T>,
  guardProps: Omit<RoleGuardProps, 'children'>
) {
  return function RoleProtectedComponent(props: T) {
    return (
      <RoleGuard {...guardProps}>
        <Component {...props} />
      </RoleGuard>
    );
  };
}
