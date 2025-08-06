import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import type { 
  CisternMileage, 
  CreateCisternMileageRequest,
  UpdateCisternMileageRequest,
  CisternMileageQueryParams
} from './types';

// Создаем экземпляр axios для пробегов цистерн
const cisternMileageApiInstance = createApiInstance(DEFAULT_API_CONFIG);

// API функции для пробегов цистерн
export const cisternMileageApi = {
  // Получить все пробеги
  getCisternMileages: (params?: CisternMileageQueryParams): Promise<ApiResponse<CisternMileage[]>> => {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return makeRequest<CisternMileage[]>(cisternMileageApiInstance, 'get', `/milage-cisterns${queryString}`);
  },

  // Получить пробеги по ID цистерны
  getCisternMileageByCisternId: (cisternId: string): Promise<ApiResponse<CisternMileage[]>> =>
    makeRequest<CisternMileage[]>(cisternMileageApiInstance, 'get', `/milage-cisterns/by-cistern/${cisternId}`),

  // Получить пробег по ID
  getCisternMileageById: (id: string): Promise<ApiResponse<CisternMileage>> =>
    makeRequest<CisternMileage>(cisternMileageApiInstance, 'get', `/milage-cisterns/${id}`),

  // Создать новый пробег
  createCisternMileage: (data: CreateCisternMileageRequest): Promise<ApiResponse<CisternMileage>> =>
    makeRequest<CisternMileage>(cisternMileageApiInstance, 'post', '/milage-cisterns', data),

  // Обновить пробег
  updateCisternMileage: (id: string, data: UpdateCisternMileageRequest): Promise<ApiResponse<CisternMileage>> =>
    makeRequest<CisternMileage>(cisternMileageApiInstance, 'put', `/milage-cisterns/${id}`, data),

  // Удалить пробег
  deleteCisternMileage: (id: string): Promise<ApiResponse<void>> =>
    makeRequest<void>(cisternMileageApiInstance, 'delete', `/milage-cisterns/${id}`),
};
