"use client";

import { usePermissions } from "@/hooks/usePermissions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface HomeClientProps {
  children: React.ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  const { isAuthenticated, isLoading } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    // Добавляем небольшую задержку для полной инициализации
    const timer = setTimeout(() => {
      // Если не загружается и пользователь не авторизован, перенаправляем на guest
      if (!isLoading && !isAuthenticated) {
        router.push("/guest");
      }
    }, 100); // Небольшая задержка для инициализации

    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, router]);

  // Показываем лоадер пока проверяется авторизация
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // Если не авторизован, показываем пустую страницу (перенаправление произойдет)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
