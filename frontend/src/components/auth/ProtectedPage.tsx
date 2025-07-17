"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { RoleBasedComponent } from "@/types/permissions";

// Компонент для защиты контента на основе ролей и разрешений
export function ProtectedPageComponent({
  requiredPermissions = [],
  requiredRoles = [],
  fallbackPath = "/access-denied",
  children,
}: RoleBasedComponent) {
  const { user, isAuthenticated, hasAnyPermission, hasAnyRole, isLoading } = usePermissions();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (isLoading || hasChecked) return; // Ждем завершения загрузки или уже проверяли

    if (!user || !isAuthenticated) {
      // Пользователь не авторизован - перенаправляем на страницу входа
      router.push("/login");
      setHasChecked(true);
      return;
    }

    // Проверяем разрешения
    const hasRequiredPermissions = requiredPermissions.length === 0 || hasAnyPermission(requiredPermissions);
    const hasRequiredRoles = requiredRoles.length === 0 || hasAnyRole(requiredRoles);

    if (hasRequiredPermissions && hasRequiredRoles) {
      setShouldRender(true);
    } else {
      // Нет необходимых прав - перенаправляем на страницу отказа в доступе
      router.push(fallbackPath);
    }
    
    setHasChecked(true);
  }, [user, isAuthenticated, isLoading, hasChecked, requiredPermissions, requiredRoles, fallbackPath, hasAnyPermission, hasAnyRole, router]);

  if (isLoading || !hasChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!shouldRender) {
    return null; // Или loading spinner, если нужно
  }

  return <>{children}</>;
}
