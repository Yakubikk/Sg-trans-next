import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse } from '@/types/user';

// Типы для справочников
export interface Wagon {
  id: string;
  number: string;
  type: string;
  capacity: number;
  status: string;
  lastMaintenanceDate: string;
}

export interface RepairType {
  id: string;
  name: string;
  description: string;
  estimatedDurationHours: number;
  category: string;
}

// Создаем и настраиваем axios инстанс
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'http://localhost:5169/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Интерцептор для запросов
  instance.interceptors.request.use(
    (config) => {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
      return config;
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
    (error: AxiosError) => {
      return Promise.reject(handleAxiosError(error));
    }
  );

  return instance;
};

// Функция для обработки ошибок axios
const handleAxiosError = (error: AxiosError): Error => {
  let errorMessage = 'Произошла неизвестная ошибка';

  if (error.response) {
    // Ошибка от сервера (4xx, 5xx)
    const status = error.response.status;
    const data = error.response.data as { message?: string; error?: string } | undefined;
    
    switch (status) {
      case 400:
        errorMessage = data?.message || 'Неверный запрос';
        break;
      case 401:
        errorMessage = 'Ошибка авторизации. Войдите в систему заново.';
        break;
      case 403:
        errorMessage = 'Недостаточно прав для выполнения операции.';
        break;
      case 404:
        errorMessage = 'Запрашиваемый ресурс не найден.';
        break;
      case 500:
        errorMessage = 'Внутренняя ошибка сервера.';
        break;
      case 502:
        errorMessage = 'Сервер недоступен. Попробуйте позже.';
        break;
      case 503:
        errorMessage = 'Сервис временно недоступен.';
        break;
      default:
        errorMessage = data?.message || data?.error || `HTTP Error: ${status}`;
    }
  } else if (error.request) {
    // Ошибка сети
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Превышено время ожидания ответа от сервера.';
    } else {
      errorMessage = 'Ошибка сети. Проверьте подключение к серверу.';
    }
  } else {
    // Другие ошибки
    errorMessage = error.message || 'Произошла неизвестная ошибка';
  }

  console.error('API Error:', errorMessage, error);
  return new Error(errorMessage);
};

// Создаем единый экземпляр axios
const apiInstance = createApiInstance();

// Универсальная функция для выполнения запросов
const makeRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiInstance.request<T>({
      method,
      url: endpoint,
      data,
    });

    return {
      success: true,
      data: response.data,
      message: 'Запрос выполнен успешно'
    };
  } catch (error) {
    throw error; // Ошибка уже обработана в интерцепторе
  }
};

// API функции для справочников
export const referencesApi = {
  // Получение списка вагонов
  getWagons: (): Promise<ApiResponse<Wagon[]>> => 
    makeRequest<Wagon[]>('get', '/wagons'),

  // Получение типов ремонта
  getRepairTypes: (): Promise<ApiResponse<RepairType[]>> => 
    makeRequest<RepairType[]>('get', '/repair-types'),

  // Получение конкретного вагона по ID
  getWagonById: (id: string): Promise<ApiResponse<Wagon>> => 
    makeRequest<Wagon>('get', `/wagons/${id}`),

  // Получение конкретного типа ремонта по ID
  getRepairTypeById: (id: string): Promise<ApiResponse<RepairType>> => 
    makeRequest<RepairType>('get', `/repair-types/${id}`),
};

// Экспортируем функции для использования в других частях приложения
export { makeRequest, handleAxiosError, createApiInstance };
