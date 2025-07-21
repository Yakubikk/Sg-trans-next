import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import { RailwayCistern, RailwayCisternDetail } from './types';

// Создаем экземпляр axios для железнодорожных цистерн
const railwayCisternsApiInstance = createApiInstance(DEFAULT_API_CONFIG);

// API функции для железнодорожных цистерн
export const railwayCisternsApi = {
  // Получение списка всех цистерн
  getRailwayCisterns: (): Promise<ApiResponse<RailwayCistern[]>> => 
    makeRequest<RailwayCistern[]>(railwayCisternsApiInstance, 'get', '/railway-cisterns'),

  // Получение конкретной цистерны по ID
  getRailwayCisternById: (id: string): Promise<ApiResponse<RailwayCisternDetail>> => 
    makeRequest<RailwayCisternDetail>(railwayCisternsApiInstance, 'get', `/railway-cisterns/${id}`),

  // Получение цистерны по номеру
  getRailwayCisternByNumber: (number: string): Promise<ApiResponse<RailwayCisternDetail>> => 
    makeRequest<RailwayCisternDetail>(railwayCisternsApiInstance, 'get', `/railway-cisterns/by-number/${number}`),
};
