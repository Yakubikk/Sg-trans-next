import { apiClient } from './client';
import {
  RailwayCistern,
  RailwayCisternCreateDto,
  Manufacturer,
  WagonType,
  WagonModel,
  Registrar,
  Owner,
  Depot,
  Location,
  Affiliation,
  PartType,
  PartStatus,
  RepairType,
  SavedFilter,
  PaginatedResponse,
  PaginationParams,
  BaseCreateDto,
} from '@/types/models';

// Generic CRUD service
class CrudService<T, TCreate = BaseCreateDto, TUpdate = Partial<TCreate>> {
  constructor(private endpoint: string) {
  }

  async getAll(params: PaginationParams = { page: 1, size: 10 }): Promise<PaginatedResponse<T>> {
    // Ensure we always send pagination parameters
    const queryParams = {
      page: params.page || 1,
      size: params.size || 10,
      ...(params.search && { search: params.search })
    };
    return apiClient.get(`/${this.endpoint}`, queryParams);
  }

  async getById(id: string): Promise<T> {
    return apiClient.get(`/${this.endpoint}/${id}`);
  }

  async create(data: TCreate): Promise<T> {
    return apiClient.post(`/${this.endpoint}`, data);
  }

  async update(id: string, data: TUpdate): Promise<T> {
    return apiClient.put(`/${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete(`/${this.endpoint}/${id}`);
  }
}

// Экспортируем класс CrudService
export { CrudService };

// Railway Cisterns
export const railwayCisternsService = new CrudService<
  RailwayCistern,
  RailwayCisternCreateDto,
  Partial<RailwayCisternCreateDto>
>('railwaycisterns');

// Reference data services
export const manufacturersService = new CrudService<Manufacturer>('manufacturers');
export const wagonTypesService = new CrudService<WagonType>('wagontypes');
export const wagonModelsService = new CrudService<WagonModel>('wagonmodels');
export const registrarsService = new CrudService<Registrar>('registrars');
export const ownersService = new CrudService<Owner>('owners');
export const depotsService = new CrudService<Depot>('depots');
export const locationsService = new CrudService<Location>('locations');
export const affiliationsService = new CrudService<Affiliation>('affiliations');
export const partTypesService = new CrudService<PartType>('parttypes');
export const partStatusesService = new CrudService<PartStatus>('partstatuses');
export const repairTypesService = new CrudService<RepairType>('repairtypes');
export const savedFiltersService = new CrudService<SavedFilter>('savedfilters');

// Custom methods for specific services
export const wagonModelsServiceExtended = {
  ...wagonModelsService,
  getByTypeId: (typeId: string): Promise<WagonModel[]> =>
    apiClient.get(`/wagonmodels/bytype/${typeId}`),
};

export const railwayCisternsServiceExtended = {
  ...railwayCisternsService,
  getByNumber: (number: string): Promise<RailwayCistern> =>
    apiClient.get(`/railwaycisterns/bynumber/${number}`),
  exportToPdf: (id: string): Promise<Blob> =>
    apiClient.get(`/railwaycisterns/${id}/export/pdf`),
  exportToExcel: (filters?: Record<string, unknown>): Promise<Blob> =>
    apiClient.post('/railwaycisterns/export/excel', filters),
};

export const savedFiltersServiceExtended = {
  ...savedFiltersService,
  getByEntityType: (entityType: string): Promise<SavedFilter[]> =>
    apiClient.get(`/savedfilters/byentity/${entityType}`),
  getPublic: (entityType: string): Promise<SavedFilter[]> =>
    apiClient.get(`/savedfilters/public/${entityType}`),
};
