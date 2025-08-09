"use client";
import { useQuery } from "@tanstack/react-query";

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
  const res = await fetch("/api/auth/me");
  if (!res.ok) {
    // Выбрасываем ошибку для правильной обработки в useQuery
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
    // Redirect to guest page if not authenticated
    if (typeof window !== "undefined") {
      window.location.href = "/guest";
    }
    return { user: null, roles: [], perms: [], isLoading: false };
  }
  
  return { ...data, isLoading: false };
}
