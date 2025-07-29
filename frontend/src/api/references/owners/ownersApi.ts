import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import type { 
  OwnerEntity, 
  CreateOwnerRequest, 
  UpdateOwnerRequest,
  OwnerQueryParams 
} from './types';

// Создаем экземпляр axios для владельцев
const ownersApiInstance = createApiInstance(DEFAULT_API_CONFIG);

// API функции для владельцев
export const ownersApi = {
  // Получить всех владельцев
  getOwners: (params?: OwnerQueryParams): Promise<ApiResponse<OwnerEntity[]>> => {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return makeRequest<OwnerEntity[]>(ownersApiInstance, 'get', `/owners${queryString}`);
  },

  // Получить владельца по ID
  getOwnerById: (id: string): Promise<ApiResponse<OwnerEntity>> =>
    makeRequest<OwnerEntity>(ownersApiInstance, 'get', `/owners/${id}`),

  // Создать нового владельца
  createOwner: (data: CreateOwnerRequest): Promise<ApiResponse<OwnerEntity>> =>
    makeRequest<OwnerEntity>(ownersApiInstance, 'post', '/owners', data),

  // Обновить владельца
  updateOwner: (id: string, data: UpdateOwnerRequest): Promise<ApiResponse<OwnerEntity>> =>
    makeRequest<OwnerEntity>(ownersApiInstance, 'put', `/owners/${id}`, data),

  // Удалить владельца
  deleteOwner: (id: string): Promise<ApiResponse<void>> =>
    makeRequest<void>(ownersApiInstance, 'delete', `/owners/${id}`),
};
