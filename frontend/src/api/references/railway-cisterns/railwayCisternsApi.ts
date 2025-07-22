import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import type { RailwayCistern, RailwayCisternDetail } from './types';

// Создаем экземпляр axios для железнодорожных цистерн
const railwayCisternsApiInstance = createApiInstance(DEFAULT_API_CONFIG);

export interface CreateRailwayCisternRequest {
  number: string;
  manufacturerId: string;
  buildDate: string;
  tareWeight: number;
  loadCapacity: number;
  length: number;
  axleCount: number;
  volume: number;
  fillingVolume?: number;
  initialTareWeight?: number;
  typeId: string;
  modelId?: string;
  commissioningDate?: string;
  serialNumber: string;
  registrationNumber: string;
  registrationDate: string;
  registrarId?: string;
  notes?: string;
  vesselSerialNumber?: string;
  vesselBuildDate?: string;
}

export interface UpdateRailwayCisternRequest {
  number: string;
  manufacturerId: string;
  buildDate: string;
  tareWeight: number;
  loadCapacity: number;
  length: number;
  axleCount: number;
  volume: number;
  fillingVolume?: number;
  initialTareWeight?: number;
  typeId: string;
  modelId?: string;
  commissioningDate?: string;
  serialNumber: string;
  registrationNumber: string;
  registrationDate: string;
  registrarId?: string;
  notes?: string;
  vesselSerialNumber?: string;
  vesselBuildDate?: string;
}

// API функции для железнодорожных цистерн
export const railwayCisternsApi = {
  // Получить все цистерны
  async getRailwayCisterns(): Promise<RailwayCistern[]> {
    const response = await railwayCisternsApiInstance.get('/railway-cisterns');
    return response.data;
  },

  // Получить цистерну по ID
  async getRailwayCisternById(id: string): Promise<RailwayCisternDetail> {
    const response = await railwayCisternsApiInstance.get(`/railway-cisterns/${id}`);
    return response.data;
  },

  // Получить цистерну по номеру
  async getRailwayCisternByNumber(number: string): Promise<RailwayCisternDetail> {
    const response = await railwayCisternsApiInstance.get(`/railway-cisterns/by-number/${encodeURIComponent(number)}`);
    return response.data;
  },

  // Создать новую цистерну
  async createRailwayCistern(data: CreateRailwayCisternRequest): Promise<RailwayCistern> {
    const response = await railwayCisternsApiInstance.post('/railway-cisterns', data);
    return response.data;
  },

  // Обновить цистерну
  async updateRailwayCistern(id: string, data: UpdateRailwayCisternRequest): Promise<RailwayCistern> {
    const response = await railwayCisternsApiInstance.put(`/railway-cisterns/${id}`, data);
    return response.data;
  },

  // Удалить цистерну
  async deleteRailwayCistern(id: string): Promise<void> {
    await railwayCisternsApiInstance.delete(`/railway-cisterns/${id}`);
  },
};
