"use client";

import { useUserStore } from "@/store/userStore";
import { Permission, ROLE_PERMISSIONS, Role } from "@/types/permissions";
import { useEffect, useState } from "react";

export function usePermissions() {
  const { currentUser, isAuthenticated, isLoading, getCurrentUser } = useUserStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Получаем данные пользователя при монтировании
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('usePermissions: initializeAuth called', {
        isInitialized,
        currentUser: !!currentUser,
        isLoading,
        isAuthenticated
      });

      // Если уже инициализировали, не делаем ничего
      if (isInitialized) return;

      // Если пользователь уже есть и не загружаемся - инициализация завершена
      if (currentUser && !isLoading) {
        console.log('usePermissions: User already exists, setting initialized');
        setIsInitialized(true);
        return;
      }

      // Если нет пользователя и не загружаемся, пробуем получить данные
      if (!currentUser && !isLoading) {
        console.log('usePermissions: Trying to get current user');
        try {
          await getCurrentUser();
        } catch (error) {
          // Игнорируем ошибки, если пользователь не авторизован
          console.log('usePermissions: Пользователь не авторизован:', error);
        }
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [currentUser, isLoading, getCurrentUser, isInitialized, isAuthenticated]);

  const hasPermission = (permission: Permission): boolean => {
    if (!currentUser || !isAuthenticated || !currentUser.roles.length) return false;
    
    console.log('usePermissions: Checking permission', {
      permission,
      userRoles: currentUser.roles,
      isAuthenticated
    });
    
    return currentUser.roles.some(roleObj => {
      const permissions = ROLE_PERMISSIONS[roleObj.name];
      console.log('usePermissions: Role permissions', { roleName: roleObj.name, permissions });
      return permissions?.includes(permission);
    }) || false;
  };

  const hasRole = (role: Role): boolean => {
    if (!currentUser || !isAuthenticated) return false;
    
    console.log('usePermissions: Checking role', {
      role,
      userRoles: currentUser.roles,
      isAuthenticated
    });
    
    return currentUser.roles.some(roleObj => {
      console.log('usePermissions: Comparing roles', { roleName: roleObj.name, targetRole: role });
      return roleObj.name === role;
    });
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some((permission) => hasPermission(permission));
  };

  const hasAnyRole = (roles: Role[]): boolean => {
    return roles.some((role) => hasRole(role));
  };

  return {
    user: currentUser,
    isAuthenticated,
    isLoading: isLoading || !isInitialized, // Загрузка до тех пор, пока не инициализировали
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAnyRole,
  };
}