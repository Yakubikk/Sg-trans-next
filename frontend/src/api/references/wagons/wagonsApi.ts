import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import { Wagon } from './types';

// Создаем экземпляр axios для вагонов
const wagonsApiInstance = createApiInstance(DEFAULT_API_CONFIG);

// API функции для вагонов
export const wagonsApi = {
  // Получение списка вагонов
  getWagons: (): Promise<ApiResponse<Wagon[]>> => 
    makeRequest<Wagon[]>(wagonsApiInstance, 'get', '/wagons'),

  // Получение конкретного вагона по ID
  getWagonById: (id: string): Promise<ApiResponse<Wagon>> => 
    makeRequest<Wagon>(wagonsApiInstance, 'get', `/railway-cisterns/${id}`),

  // Создание нового вагона
  createWagon: (wagon: Omit<Wagon, 'id'>): Promise<ApiResponse<Wagon>> => 
    makeRequest<Wagon>(wagonsApiInstance, 'post', '/wagons', wagon),

  // Обновление вагона
  updateWagon: (id: string, wagon: Partial<Wagon>): Promise<ApiResponse<Wagon>> => 
    makeRequest<Wagon>(wagonsApiInstance, 'put', `/wagons/${id}`, wagon),

  // Удаление вагона
  deleteWagon: (id: string): Promise<ApiResponse<void>> => 
    makeRequest<void>(wagonsApiInstance, 'delete', `/wagons/${id}`),

  // Поиск вагонов по номеру
  searchWagonsByNumber: (number: number): Promise<ApiResponse<Wagon[]>> => 
    makeRequest<Wagon[]>(wagonsApiInstance, 'get', `/wagons/search?number=${number}`),

  // Получение вагонов по статусу
  getWagonsByStatus: (isActive: boolean): Promise<ApiResponse<Wagon[]>> => 
    makeRequest<Wagon[]>(wagonsApiInstance, 'get', `/wagons/status?isActive=${isActive}`),
};
