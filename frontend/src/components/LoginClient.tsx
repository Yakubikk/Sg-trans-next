"use client";

import { ReactNode } from 'react';
import { usePermissions } from "@/hooks/usePermissions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LoginClientProps {
  children: ReactNode;
}

function LoginClient({ children }: LoginClientProps) {
  const { isAuthenticated, isLoading } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  // Показываем лоадер пока проверяется авторизация
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // Если пользователь уже авторизован, показываем заглушку
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Перенаправление...</p>
        </div>
      </div>
    );
  }

  return children;
}

export { LoginClient };
export default LoginClient;
