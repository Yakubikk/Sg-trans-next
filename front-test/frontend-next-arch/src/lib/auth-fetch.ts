"use client";

// Глобальный interceptor для автоматического обновления токенов
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// Сохраняем оригинальный fetch до патчинга
const originalFetch = typeof window !== 'undefined' ? window.fetch : global.fetch;

// Wrapper для fetch с автоматическим обновлением токенов
export const authFetch = async (url: string, options: RequestInit = {}) => {
  const makeRequest = async (): Promise<Response> => {
    return originalFetch(url, {
      ...options,
      credentials: 'include',
    });
  };

  const response = await makeRequest();

  // Если получили 401 ошибку, пытаемся обновить токен
  if (response.status === 401) {
    if (isRefreshing) {
      // Если токен уже обновляется, ждем завершения
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => {
        return makeRequest();
      }).catch((err) => {
        return Promise.reject(err);
      });
    }

    isRefreshing = true;

    try {
      const refreshResponse = await originalFetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        processQueue(null, 'success');
        isRefreshing = false;
        // Повторяем оригинальный запрос
        return makeRequest();
      } else {
        processQueue(new Error('Token refresh failed'), null);
        isRefreshing = false;
        // Редиректим на страницу входа
        if (typeof window !== 'undefined') {
          window.location.href = '/guest';
        }
        return response;
      }
    } catch (error) {
      processQueue(error, null);
      isRefreshing = false;
      // Редиректим на страницу входа
      if (typeof window !== 'undefined') {
        window.location.href = '/guest';
      }
      return response;
    }
  }

  return response;
};

// Патчим глобальный fetch для автоматического обновления токенов
if (typeof window !== 'undefined') {
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    // Применяем interceptor только к API запросам (кроме auth endpoints)
    const url = typeof input === 'string' ? input : input.toString();
    if (url.startsWith('/api/') && !url.includes('/api/auth/login') && !url.includes('/api/auth/refresh') && !url.includes('/api/auth/register')) {
      return authFetch(url, init);
    }
    return originalFetch(input, init);
  };
}
