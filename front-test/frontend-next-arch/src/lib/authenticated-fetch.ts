"use client";

// Простой auth interceptor без глобального патчинга fetch
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: Response) => void;
  reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: unknown, response?: Response) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (response) {
      resolve(response);
    }
  });
  
  failedQueue = [];
};

export const createAuthenticatedFetch = () => {
  return async (url: string, options: RequestInit = {}): Promise<Response> => {
    const makeRequest = async (): Promise<Response> => {
      return fetch(url, {
        ...options,
        credentials: 'include',
      });
    };

    let response = await makeRequest();

    // Если получили 401 ошибку, пытаемся обновить токен
    if (response.status === 401 && !url.includes('/api/auth/')) {
      if (isRefreshing) {
        // Если токен уже обновляется, ждем завершения
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          processQueue(null, undefined);
          isRefreshing = false;
          // Повторяем оригинальный запрос
          response = await makeRequest();
        } else {
          processQueue(new Error('Token refresh failed'));
          isRefreshing = false;
          // Редиректим на страницу входа
          if (typeof window !== 'undefined') {
            window.location.href = '/guest';
          }
        }
      } catch (error) {
        processQueue(error);
        isRefreshing = false;
        // Редиректим на страницу входа
        if (typeof window !== 'undefined') {
          window.location.href = '/guest';
        }
      }
    }

    return response;
  };
};

// Экспортируем готовый authenticated fetch
export const authenticatedFetch = createAuthenticatedFetch();
