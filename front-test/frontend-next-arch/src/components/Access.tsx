"use client";
import { useAuth } from "@/hooks/useAuth";

type Props = { 
  role?: string; 
  perm?: string; 
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
};

export function Access({ role, perm, children, fallback = null, requireAuth = false }: Props) {
  const { data, isLoading } = useAuth();
  
  if (isLoading) return <>{fallback}</>;
  
  // If requireAuth is true and user is not authenticated, show fallback
  if (requireAuth && !data?.user) return <>{fallback}</>;
  
  const roles: string[] = data?.roles || [];
  const perms: string[] = data?.perms || [];
  
  if (role && !roles.includes(role)) return <>{fallback}</>;
  if (perm && !perms.includes(perm)) return <>{fallback}</>;
  
  return <>{children}</>;
}

// Универсальный компонент-обёртка для проверки ролей и разрешений
type GuardProps = {
  roles?: string | string[]; // одна роль или массив ролей
  perms?: string | string[]; // одно разрешение или массив разрешений
  requireAll?: boolean; // true = все роли/разрешения обязательны, false = достаточно любого
  requireAuth?: boolean; // требовать аутентификации
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function Guard({ 
  roles, 
  perms, 
  requireAll = false, 
  requireAuth = false, 
  children, 
  fallback = null 
}: GuardProps) {
  const { data, isLoading } = useAuth();
  
  if (isLoading) return <>{fallback}</>;
  
  // Проверка аутентификации
  if (requireAuth && !data?.user) return <>{fallback}</>;
  
  const userRoles: string[] = data?.roles || [];
  const userPerms: string[] = data?.perms || [];
  
  // Нормализуем входные данные в массивы
  const requiredRoles = roles ? (Array.isArray(roles) ? roles : [roles]) : [];
  const requiredPerms = perms ? (Array.isArray(perms) ? perms : [perms]) : [];
  
  // Проверяем роли
  if (requiredRoles.length > 0) {
    const hasRoles = requireAll 
      ? requiredRoles.every(role => userRoles.includes(role))
      : requiredRoles.some(role => userRoles.includes(role));
    
    if (!hasRoles) return <>{fallback}</>;
  }
  
  // Проверяем разрешения
  if (requiredPerms.length > 0) {
    const hasPerms = requireAll
      ? requiredPerms.every(perm => userPerms.includes(perm))
      : requiredPerms.some(perm => userPerms.includes(perm));
    
    if (!hasPerms) return <>{fallback}</>;
  }
  
  return <>{children}</>;
}

// HOC-style guard for role
export function RoleGuard({ role, children, fallback = null }: { role: string; children: React.ReactNode; fallback?: React.ReactNode }) {
  return <Access role={role} fallback={fallback}>{children}</Access>;
}

// HOC-style guard for permission
export function PermissionGuard({ perm, children, fallback = null }: { perm: string; children: React.ReactNode; fallback?: React.ReactNode }) {
  return <Access perm={perm} fallback={fallback}>{children}</Access>;
}
