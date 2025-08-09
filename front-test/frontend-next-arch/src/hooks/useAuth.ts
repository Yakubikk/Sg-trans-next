"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { forceRefreshToken } from "@/lib/auth-fetch";

type AuthUser = {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null;
  roles: string[];
  perms: string[];
};

const fetcher = async (): Promise<AuthUser> => {
  const res = await fetch("/api/auth/me", {
    credentials: 'include',
  });
  
  if (!res.ok) {
    // Если получили 401, пытаемся обновить токен
    if (res.status === 401) {
      const refreshSuccess = await forceRefreshToken();
      if (refreshSuccess) {
        // Повторяем запрос после обновления токена
        const retryRes = await fetch("/api/auth/me", {
          credentials: 'include',
        });
        if (retryRes.ok) {
          return retryRes.json();
        }
      }
    }
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: fetcher,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Не повторяем запрос при 401 ошибке (проблема с авторизацией)
      if (error instanceof Error && error.message.includes('401')) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

export function useRequireAuth() {
  const { data, isLoading, error } = useAuth();
  
  if (isLoading) return { user: null, roles: [], perms: [], isLoading: true };
  if (error || !data?.user) {
    return { user: null, roles: [], perms: [], isLoading: false, error };
  }
  
  return { ...data, isLoading: false };
}

// Хук для принудительного обновления данных пользователя
export function useRefreshAuth() {
  const queryClient = useQueryClient();
  
  return async () => {
    const refreshSuccess = await forceRefreshToken();
    if (refreshSuccess) {
      // Обновляем данные в кеше
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      return true;
    }
    return false;
  };
}

// Удобный хук для работы с авторизацией
export function useAuthState() {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useAuth();
  
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        await refetch();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      // Очищаем кеш независимо от ответа сервера
      queryClient.setQueryData(["auth"], null);
      queryClient.clear();
    }
  };

  return {
    user: data?.user || null,
    roles: data?.roles || [],
    perms: data?.perms || [],
    isAuthenticated: !!data?.user,
    isLoading,
    error,
    login,
    logout,
    refetch,
  };
}
