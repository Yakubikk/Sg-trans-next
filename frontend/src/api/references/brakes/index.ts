import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import { Brake, BrakeRequest } from './types';

// Создаем экземпляр axios для тормозов
const brakesApiInstance = createApiInstance(DEFAULT_API_CONFIG);

export const brakesApi = {
  getBrakes: (): Promise<ApiResponse<Brake[]>> =>
    makeRequest<Brake[]>(brakesApiInstance, 'get', '/brakes'),

  getBrakeById: (id: string): Promise<ApiResponse<Brake>> =>
    makeRequest<Brake>(brakesApiInstance, 'get', `/brakes/${id}`),

  createBrake: (brake: BrakeRequest): Promise<ApiResponse<Brake>> =>
    makeRequest<Brake>(brakesApiInstance, 'post', '/brakes', brake),

  updateBrake: (id: string, brake: Partial<BrakeRequest>): Promise<ApiResponse<Brake>> =>
    makeRequest<Brake>(brakesApiInstance, 'put', `/brakes/${id}`, brake),

  deleteBrake: (id: string): Promise<ApiResponse<void>> =>
    makeRequest<void>(brakesApiInstance, 'delete', `/brakes/${id}`),

  searchBrakesByCode: (code: number): Promise<ApiResponse<Brake[]>> =>
    makeRequest<Brake[]>(brakesApiInstance, 'get', `/brakes/search?code=${code}`),
};
