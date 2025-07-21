import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { handleAxiosError } from './errorHandler';

export interface ApiInstanceConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Создаем и настраиваем axios инстанс
export const createApiInstance = (config: ApiInstanceConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  // Интерцептор для запросов
  instance.interceptors.request.use(
    async (requestConfig) => {
      // Добавляем токен из localStorage если он есть
      if (typeof window !== 'undefined') {
        try {
          // Сначала пытаемся получить токен из localStorage
          const persistedState = localStorage.getItem('user-store');
          console.log('Request interceptor - localStorage content:', persistedState);
          
          let token = null;
          if (persistedState) {
            const parsed = JSON.parse(persistedState);
            token = parsed.state?.token;
          }
          
          // Если токена нет в localStorage, пытаемся получить из store напрямую
          if (!token) {
            try {
              const { useUserStore } = await import('@/store/userStore');
              token = useUserStore.getState().token;
              console.log('Request interceptor - token from store:', token ? 'YES' : 'NO');
            } catch {
              console.log('Request interceptor - could not import store');
            }
          }
          
          console.log('Request interceptor - final token:', token ? 'YES' : 'NO');
          if (token) {
            requestConfig.headers.Authorization = `Bearer ${token}`;
            console.log('Request interceptor - Authorization header set');
          }
        } catch (error) {
          console.error('Ошибка при получении токена:', error);
        }
      }
      
      console.log(`API Request: ${requestConfig.method?.toUpperCase()} ${requestConfig.baseURL}${requestConfig.url}`, {
        headers: requestConfig.headers
      });
      return requestConfig;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Интерцептор для ответов
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Если получили 401 ошибку и это не повторный запрос
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Пытаемся обновить токен
          if (typeof window !== 'undefined') {
            const persistedState = localStorage.getItem('user-store');
            if (persistedState) {
              const parsed = JSON.parse(persistedState);
              const refreshToken = parsed.state?.refreshToken;
              
              if (refreshToken) {
                // Создаем новый запрос для обновления токена
                const refreshResponse = await axios.post(`${config.baseURL}/users/refresh-token`, { refreshToken });
                
                if (refreshResponse.data.success) {
                  const newAccessToken = refreshResponse.data.data.accessToken;
                  const newRefreshToken = refreshResponse.data.data.refreshToken;
                  
                  // Обновляем токены в localStorage
                  const updatedState = {
                    ...parsed,
                    state: {
                      ...parsed.state,
                      token: newAccessToken,
                      refreshToken: newRefreshToken
                    }
                  };
                  localStorage.setItem('user-store', JSON.stringify(updatedState));
                  
                  // Повторяем оригинальный запрос с новым токеном
                  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                  return instance(originalRequest);
                }
              }
            }
          }
        } catch (refreshError) {
          console.error('Ошибка при обновлении токена:', refreshError);
          
          // Если обновление токена не удалось, очищаем localStorage и перенаправляем на логин
          if (typeof window !== 'undefined') {
            localStorage.removeItem('user-store');
            window.location.href = '/login';
          }
        }
      }

      return Promise.reject(handleAxiosError(error));
    }
  );

  return instance;
};

// Конфигурация по умолчанию для основного API
export const DEFAULT_API_CONFIG: ApiInstanceConfig = {
  baseURL: 'http://localhost:5169/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const AUTH_API_CONFIG: ApiInstanceConfig = {
  baseURL: 'http://localhost:5169',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};
