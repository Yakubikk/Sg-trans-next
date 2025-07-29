import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import type { 
  RailwayCistern, 
  RailwayCisternDetailed,
  RailwayCisternDetailedResponse,
  CreateRailwayCisternRequest, 
  UpdateRailwayCisternRequest,
  RailwayCisternQueryParams 
} from './types';

// Создаем экземпляр axios для железнодорожных цистерн
const railwayCisternsApiInstance = createApiInstance(DEFAULT_API_CONFIG);

// API функции для железнодорожных цистерн
export const railwayCisternsApi = {
  // Получить все цистерны
  getRailwayCisterns: (params?: RailwayCisternQueryParams): Promise<ApiResponse<RailwayCistern[]>> => {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return makeRequest<RailwayCistern[]>(railwayCisternsApiInstance, 'get', `/railway-cisterns${queryString}`);
  },

  // Получить детальные данные цистерн с пагинацией
  getRailwayCisternsDetailed: (page: number = 1, pageSize: number = 10): Promise<ApiResponse<RailwayCisternDetailedResponse>> => {
    return makeRequest<RailwayCisternDetailedResponse>(
      railwayCisternsApiInstance, 
      'get', 
      `/railway-cisterns/detailed/paged?page=${page}&pageSize=${pageSize}`
    );
  },

  // Получить цистерну по ID
  getRailwayCisternById: (id: string): Promise<ApiResponse<RailwayCistern>> =>
    makeRequest<RailwayCistern>(railwayCisternsApiInstance, 'get', `/railway-cisterns/${id}`),

  // Получить детальную информацию о цистерне по ID
  getRailwayCisternDetailedById: (id: string): Promise<ApiResponse<RailwayCisternDetailed>> =>
    makeRequest<RailwayCisternDetailed>(railwayCisternsApiInstance, 'get', `/railway-cisterns/detailed/${id}`),

  // Получить детальную информацию о цистерне по номеру
  getRailwayCisternDetailedByNumber: (number: string): Promise<ApiResponse<RailwayCisternDetailed>> =>
    makeRequest<RailwayCisternDetailed>(railwayCisternsApiInstance, 'get', `/railway-cisterns/detailed/search?number=${encodeURIComponent(number)}`),

  // Создать новую цистерну
  createRailwayCistern: (data: CreateRailwayCisternRequest): Promise<ApiResponse<RailwayCistern>> =>
    makeRequest<RailwayCistern>(railwayCisternsApiInstance, 'post', '/railway-cisterns', data),

  // Обновить цистерну
  updateRailwayCistern: (id: string, data: UpdateRailwayCisternRequest): Promise<ApiResponse<RailwayCistern>> =>
    makeRequest<RailwayCistern>(railwayCisternsApiInstance, 'put', `/railway-cisterns/${id}`, data),

  // Удалить цистерну
  deleteRailwayCistern: (id: string): Promise<ApiResponse<void>> =>
    makeRequest<void>(railwayCisternsApiInstance, 'delete', `/railway-cisterns/${id}`),
};
