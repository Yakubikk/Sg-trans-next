import { createApiInstance, DEFAULT_API_CONFIG } from '../core/apiInstance';
import { makeRequest } from '../core/requestHandler';
import { ApiResponse } from '@/types/user';
import { Wagon, RepairType } from './types';

// Создаем экземпляр axios для справочников
const referencesApiInstance = createApiInstance(DEFAULT_API_CONFIG);

// API функции для справочников
export const referencesApi = {
  // Получение списка вагонов
  getWagons: (): Promise<ApiResponse<Wagon[]>> => 
    makeRequest<Wagon[]>(referencesApiInstance, 'get', '/wagons'),

  // Получение типов ремонта
  getRepairTypes: (): Promise<ApiResponse<RepairType[]>> => 
    makeRequest<RepairType[]>(referencesApiInstance, 'get', '/repair-types'),

  // Получение конкретного вагона по ID
  getWagonById: (id: string): Promise<ApiResponse<Wagon>> => 
    makeRequest<Wagon>(referencesApiInstance, 'get', `/wagons/${id}`),

  // Получение конкретного типа ремонта по ID
  getRepairTypeById: (id: string): Promise<ApiResponse<RepairType>> => 
    makeRequest<RepairType>(referencesApiInstance, 'get', `/repair-types/${id}`),
};
