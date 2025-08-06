import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import type { Manufacturer, Registrar, WagonType, WagonModel } from './types';

// Создаем экземпляр axios для справочных данных
const referenceDataApiInstance = createApiInstance(DEFAULT_API_CONFIG);

// API функции для справочных данных
export const referenceDataApi = {
  // Получить всех регистраторов
  getRegistrars: (): Promise<ApiResponse<Registrar[]>> =>
    makeRequest<Registrar[]>(referenceDataApiInstance, 'get', '/registrars'),

  // Получить всех производителей
  getManufacturers: (): Promise<ApiResponse<Manufacturer[]>> =>
    makeRequest<Manufacturer[]>(referenceDataApiInstance, 'get', '/manufacturers'),

  // Получить все типы вагонов
  getWagonTypes: (): Promise<ApiResponse<WagonType[]>> =>
    makeRequest<WagonType[]>(referenceDataApiInstance, 'get', '/wagon-types'),

  // Получить все модели вагонов
  getWagonModels: (): Promise<ApiResponse<WagonModel[]>> =>
    makeRequest<WagonModel[]>(referenceDataApiInstance, 'get', '/wagon-models'),
};
