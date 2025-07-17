import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import { AbsorberDevice, AbsorberDeviceRequest, AbsorberDeviceAccounting, AbsorberDeviceAccountingRequest } from './types';

// Создаем экземпляр axios для поглощающих аппаратов
const absorberDevicesApiInstance = createApiInstance(DEFAULT_API_CONFIG);

export const absorberDevicesApi = {
  // AbsorberDevice methods
  getAbsorberDevices: (): Promise<ApiResponse<AbsorberDevice[]>> =>
    makeRequest<AbsorberDevice[]>(absorberDevicesApiInstance, 'get', '/absorber-devices'),

  getAbsorberDeviceById: (id: string): Promise<ApiResponse<AbsorberDevice>> =>
    makeRequest<AbsorberDevice>(absorberDevicesApiInstance, 'get', `/absorber-devices/${id}`),

  createAbsorberDevice: (device: AbsorberDeviceRequest): Promise<ApiResponse<AbsorberDevice>> =>
    makeRequest<AbsorberDevice>(absorberDevicesApiInstance, 'post', '/absorber-devices', device),

  updateAbsorberDevice: (id: string, device: Partial<AbsorberDeviceRequest>): Promise<ApiResponse<AbsorberDevice>> =>
    makeRequest<AbsorberDevice>(absorberDevicesApiInstance, 'put', `/absorber-devices/${id}`, device),

  deleteAbsorberDevice: (id: string): Promise<ApiResponse<void>> =>
    makeRequest<void>(absorberDevicesApiInstance, 'delete', `/absorber-devices/${id}`),

  searchAbsorberDevicesByCode: (code: number): Promise<ApiResponse<AbsorberDevice[]>> =>
    makeRequest<AbsorberDevice[]>(absorberDevicesApiInstance, 'get', `/absorber-devices/search?code=${code}`),

  // AbsorberDeviceAccounting methods
  getAbsorberDeviceAccountings: (): Promise<ApiResponse<AbsorberDeviceAccounting[]>> =>
    makeRequest<AbsorberDeviceAccounting[]>(absorberDevicesApiInstance, 'get', '/absorber-devices/accounting'),

  getAbsorberDeviceAccountingById: (id: string): Promise<ApiResponse<AbsorberDeviceAccounting>> =>
    makeRequest<AbsorberDeviceAccounting>(absorberDevicesApiInstance, 'get', `/absorber-devices/accounting/${id}`),

  createAbsorberDeviceAccounting: (accounting: AbsorberDeviceAccountingRequest): Promise<ApiResponse<AbsorberDeviceAccounting>> =>
    makeRequest<AbsorberDeviceAccounting>(absorberDevicesApiInstance, 'post', '/absorber-devices/accounting', accounting),

  updateAbsorberDeviceAccounting: (id: string, accounting: Partial<AbsorberDeviceAccountingRequest>): Promise<ApiResponse<AbsorberDeviceAccounting>> =>
    makeRequest<AbsorberDeviceAccounting>(absorberDevicesApiInstance, 'put', `/absorber-devices/accounting/${id}`, accounting),

  deleteAbsorberDeviceAccounting: (id: string): Promise<ApiResponse<void>> =>
    makeRequest<void>(absorberDevicesApiInstance, 'delete', `/absorber-devices/accounting/${id}`),
};
