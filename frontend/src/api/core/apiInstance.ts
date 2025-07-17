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
    (requestConfig) => {
      console.log(`API Request: ${requestConfig.method?.toUpperCase()} ${requestConfig.baseURL}${requestConfig.url}`);
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
    (error) => {
      return Promise.reject(handleAxiosError(error));
    }
  );

  return instance;
};

// Конфигурация по умолчанию для основного API
export const DEFAULT_API_CONFIG: ApiInstanceConfig = {
  baseURL: 'http://localhost:5169/api',
  timeout: 10000,
};
