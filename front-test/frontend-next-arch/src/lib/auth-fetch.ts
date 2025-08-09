"use client";

// Глобальный interceptor для автоматического обновления токенов
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: Response) => void;
  reject: (reason?: unknown) => void;
  originalRequest: () => Promise<Response>;
}> = [];

const processQueue = (error: unknown, success: boolean = false) => {
  failedQueue.forEach(({ resolve, reject, originalRequest }) => {
    if (error || !success) {
      reject(error || new Error('Token refresh failed'));
    } else {
      // Повторяем оригинальный запрос после успешного обновления токена
      originalRequest().then(resolve).catch(reject);
    }
  });
  
  failedQueue = [];
};

// Сохраняем оригинальный fetch до патчинга
const originalFetch = typeof window !== 'undefined' ? window.fetch : global.fetch;

// Попытка обновить токен
const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshResponse = await originalFetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    return refreshResponse.ok;
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
};

// Wrapper для fetch с автоматическим обновлением токенов
export const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
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
      // Если токен уже обновляется, добавляем запрос в очередь
      return new Promise((resolve, reject) => {
        failedQueue.push({ 
          resolve, 
          reject, 
          originalRequest: makeRequest 
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshSuccess = await refreshToken();
      
      if (refreshSuccess) {
        // Токен успешно обновлен
        processQueue(null, true);
        isRefreshing = false;
        // Повторяем оригинальный запрос
        return makeRequest();
      } else {
        // Не удалось обновить токен
        processQueue(new Error('Token refresh failed'), false);
        isRefreshing = false;
        
        // Вместо редиректа просто возвращаем ошибку
        // Компоненты сами решат, что делать
        return response;
      }
    } catch (error) {
      processQueue(error, false);
      isRefreshing = false;
      return response;
    }
  }

  return response;
};

// Функция для принудительного обновления токена
export const forceRefreshToken = async (): Promise<boolean> => {
  if (isRefreshing) {
    return new Promise((resolve) => {
      failedQueue.push({
        resolve: (success) => resolve(!!success),
        reject: () => resolve(false),
        originalRequest: async () => new Response()
      });
    });
  }

  isRefreshing = true;
  const success = await refreshToken();
  isRefreshing = false;
  return success;
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
