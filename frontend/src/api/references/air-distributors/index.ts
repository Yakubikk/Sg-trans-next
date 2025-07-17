import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import { AirDistributor, AirDistributorRequest } from './types';

// Создаем экземпляр axios для воздухораспределителей
const airDistributorsApiInstance = createApiInstance(DEFAULT_API_CONFIG);

export const airDistributorsApi = {
  getAirDistributors: (): Promise<ApiResponse<AirDistributor[]>> =>
    makeRequest<AirDistributor[]>(airDistributorsApiInstance, 'get', '/air-distributors'),

  getAirDistributorById: (id: string): Promise<ApiResponse<AirDistributor>> =>
    makeRequest<AirDistributor>(airDistributorsApiInstance, 'get', `/air-distributors/${id}`),

  createAirDistributor: (distributor: AirDistributorRequest): Promise<ApiResponse<AirDistributor>> =>
    makeRequest<AirDistributor>(airDistributorsApiInstance, 'post', '/air-distributors', distributor),

  updateAirDistributor: (id: string, distributor: Partial<AirDistributorRequest>): Promise<ApiResponse<AirDistributor>> =>
    makeRequest<AirDistributor>(airDistributorsApiInstance, 'put', `/air-distributors/${id}`, distributor),

  deleteAirDistributor: (id: string): Promise<ApiResponse<void>> =>
    makeRequest<void>(airDistributorsApiInstance, 'delete', `/air-distributors/${id}`),

  searchAirDistributorsByCode: (code: number): Promise<ApiResponse<AirDistributor[]>> =>
    makeRequest<AirDistributor[]>(airDistributorsApiInstance, 'get', `/air-distributors/search?code=${code}`),
};
