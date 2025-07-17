import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import { RepairType } from './types';

// Создаем экземпляр axios для типов ремонта
const repairTypesApiInstance = createApiInstance(DEFAULT_API_CONFIG);

// API функции для типов ремонта
export const repairTypesApi = {
  // Получение списка типов ремонта
  getRepairTypes: (): Promise<ApiResponse<RepairType[]>> => 
    makeRequest<RepairType[]>(repairTypesApiInstance, 'get', '/repair-types'),

  // Получение конкретного типа ремонта по ID
  getRepairTypeById: (id: string): Promise<ApiResponse<RepairType>> => 
    makeRequest<RepairType>(repairTypesApiInstance, 'get', `/repair-types/${id}`),

  // Создание нового типа ремонта
  createRepairType: (repairType: Omit<RepairType, 'id'>): Promise<ApiResponse<RepairType>> => 
    makeRequest<RepairType>(repairTypesApiInstance, 'post', '/repair-types', repairType),

  // Обновление типа ремонта
  updateRepairType: (id: string, repairType: Partial<RepairType>): Promise<ApiResponse<RepairType>> => 
    makeRequest<RepairType>(repairTypesApiInstance, 'put', `/repair-types/${id}`, repairType),

  // Удаление типа ремонта
  deleteRepairType: (id: string): Promise<ApiResponse<void>> => 
    makeRequest<void>(repairTypesApiInstance, 'delete', `/repair-types/${id}`),

  // Поиск типов ремонта по названию
  searchRepairTypesByName: (name: string): Promise<ApiResponse<RepairType[]>> => 
    makeRequest<RepairType[]>(repairTypesApiInstance, 'get', `/repair-types/search?name=${encodeURIComponent(name)}`),

  // Получение типов ремонта по категории
  getRepairTypesByCategory: (category: string): Promise<ApiResponse<RepairType[]>> => 
    makeRequest<RepairType[]>(repairTypesApiInstance, 'get', `/repair-types/category?category=${encodeURIComponent(category)}`),

  // Получение активных типов ремонта
  getActiveRepairTypes: (): Promise<ApiResponse<RepairType[]>> => 
    makeRequest<RepairType[]>(repairTypesApiInstance, 'get', '/repair-types/active'),
};
