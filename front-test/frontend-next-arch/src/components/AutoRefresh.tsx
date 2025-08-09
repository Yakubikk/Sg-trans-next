"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AutoRefreshComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldRefresh = searchParams.get("refresh") === "true";

  useEffect(() => {
    if (shouldRefresh) {
      const attemptRefresh = async () => {
        try {
          const response = await fetch("/api/auth/refresh", {
            method: "POST",
          });

          if (response.ok) {
            // Успешно обновили токен, возвращаемся на главную
            router.replace("/");
          } else {
            // Не удалось обновить токен, убираем параметр refresh из URL
            router.replace("/guest");
          }
        } catch (error) {
          console.error("Failed to refresh token:", error);
          // Убираем параметр refresh из URL
          router.replace("/guest");
        }
      };

      attemptRefresh();
    }
  }, [shouldRefresh, router]);

  return null;
}

export function AutoRefresh() {
  return (
    <Suspense fallback={null}>
      <AutoRefreshComponent />
    </Suspense>
  );
}
