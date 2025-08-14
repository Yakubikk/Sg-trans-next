'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole,
  requiredPermission 
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading, initializeAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Убираем initializeAuth из зависимостей

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user && requiredRole && !user.roles.includes(requiredRole)) {
      router.push('/unauthorized');
      return;
    }

    if (user && requiredPermission) {
      // Для простоты, предполагаем что права проверяются через роли
      // Можно расширить логику проверки прав позже
      const hasPermission = user.roles.includes('Admin');
      if (!hasPermission) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, requiredPermission, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
