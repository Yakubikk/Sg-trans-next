import { AxiosInstance } from 'axios';
import { ApiResponse } from '@/types/user';

// Универсальная функция для выполнения запросов
export const makeRequest = async <T>(
  axiosInstance: AxiosInstance,
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.request<T>({
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
