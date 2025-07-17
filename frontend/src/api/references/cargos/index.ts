import { createApiInstance, DEFAULT_API_CONFIG } from '../../core/apiInstance';
import { makeRequest } from '../../core/requestHandler';
import { ApiResponse } from '@/types/user';
import { Cargo, CargoRequest } from './types';

// Создаем экземпляр axios для грузов
const cargosApiInstance = createApiInstance(DEFAULT_API_CONFIG);

export const cargosApi = {
  getCargos: (): Promise<ApiResponse<Cargo[]>> =>
    makeRequest<Cargo[]>(cargosApiInstance, 'get', '/cargos'),

  getCargoById: (id: string): Promise<ApiResponse<Cargo>> =>
    makeRequest<Cargo>(cargosApiInstance, 'get', `/cargos/${id}`),

  createCargo: (cargo: CargoRequest): Promise<ApiResponse<Cargo>> =>
    makeRequest<Cargo>(cargosApiInstance, 'post', '/cargos', cargo),

  updateCargo: (id: string, cargo: Partial<CargoRequest>): Promise<ApiResponse<Cargo>> =>
    makeRequest<Cargo>(cargosApiInstance, 'put', `/cargos/${id}`, cargo),

  deleteCargo: (id: string): Promise<ApiResponse<void>> =>
    makeRequest<void>(cargosApiInstance, 'delete', `/cargos/${id}`),

  searchCargosByName: (name: string): Promise<ApiResponse<Cargo[]>> =>
    makeRequest<Cargo[]>(cargosApiInstance, 'get', `/cargos/search?name=${name}`),

  searchCargosByCode: (code: number): Promise<ApiResponse<Cargo[]>> =>
    makeRequest<Cargo[]>(cargosApiInstance, 'get', `/cargos/search?code=${code}`),
};
