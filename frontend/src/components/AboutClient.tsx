"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { usePermissions } from "@/hooks/usePermissions";
import { ReactNode } from "react";

interface AboutClientProps {
  children: ReactNode;
}

function AboutClient({ children }: AboutClientProps) {
  const { isAuthenticated, isLoading } = usePermissions();

  // Показываем лоадер пока проверяется авторизация
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <>
      {/* Навигация */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <div className="flex justify-between items-center">
          <Link
            href={isAuthenticated ? "/" : "/guest"}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ← Назад
          </Link>
          {isAuthenticated && <LogoutButton />}
        </div>
      </div>
      
      {/* Основной контент */}
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}

export { AboutClient };
export default AboutClient;
