import { api } from '@/lib/api';
import type {
  AffiliationDTO,
  CreateAffiliationDTO,
  UpdateAffiliationDTO,
  DepotDTO,
  CreateDepotDTO,
  UpdateDepotDTO,
  ManufacturerDTO,
  CreateManufacturerDTO,
  UpdateManufacturerDTO,
  OwnerDTO,
  CreateOwnerDTO,
  UpdateOwnerDTO,
  WagonTypeDTO,
  CreateWagonTypeDTO,
  UpdateWagonTypeDTO,
  LocationDTO,
  CreateLocationDTO,
  UpdateLocationDTO,
  FilterTypeDTO,
  CreateFilterTypeDTO,
  UpdateFilterTypeDTO,
  PartTypeDTO,
  CreatePartTypeDTO,
  UpdatePartTypeDTO,
  PartStatusDTO,
  CreatePartStatusDTO,
  UpdatePartStatusDTO,
  RepairTypeDTO,
  CreateRepairTypeDTO,
  UpdateRepairTypeDTO,
  RegistrarDTO,
  CreateRegistrarDTO,
  UpdateRegistrarDTO,
  WagonModelDTO,
  CreateWagonModelDTO,
  UpdateWagonModelDTO,
  StampNumberDTO,
  CreateStampNumberDTO,
  UpdateStampNumberDTO,
} from '@/types/directories';

// Generic CRUD operations for directories
const createDirectoryApi = <T, CreateT, UpdateT>(endpoint: string) => ({
  getAll: async (): Promise<T[]> => {
    const response = await api.get(`/api/${endpoint}`);
    return response.data;
  },

  getById: async (id: string): Promise<T> => {
    const response = await api.get(`/api/${endpoint}/${id}`);
    return response.data;
  },

  create: async (data: CreateT): Promise<T> => {
    const response = await api.post(`/api/${endpoint}`, data);
    return response.data;
  },

  update: async (id: string, data: UpdateT): Promise<T> => {
    const response = await api.put(`/api/${endpoint}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/${endpoint}/${id}`);
  },
});

// Affiliations API
export const affiliationsApi = createDirectoryApi<
  AffiliationDTO,
  CreateAffiliationDTO,
  UpdateAffiliationDTO
>('affiliations');

// Depots API
export const depotsApi = createDirectoryApi<
  DepotDTO,
  CreateDepotDTO,
  UpdateDepotDTO
>('depots');

// Manufacturers API
export const manufacturersApi = createDirectoryApi<
  ManufacturerDTO,
  CreateManufacturerDTO,
  UpdateManufacturerDTO
>('manufacturers');

// Owners API
export const ownersApi = createDirectoryApi<
  OwnerDTO,
  CreateOwnerDTO,
  UpdateOwnerDTO
>('owners');

// WagonTypes API
export const wagonTypesApi = createDirectoryApi<
  WagonTypeDTO,
  CreateWagonTypeDTO,
  UpdateWagonTypeDTO
>('wagon-types');

// Locations API
export const locationsApi = createDirectoryApi<
  LocationDTO,
  CreateLocationDTO,
  UpdateLocationDTO
>('locations');

// FilterTypes API
export const filterTypesApi = createDirectoryApi<
  FilterTypeDTO,
  CreateFilterTypeDTO,
  UpdateFilterTypeDTO
>('filter-types');

// PartTypes API
export const partTypesApi = createDirectoryApi<
  PartTypeDTO,
  CreatePartTypeDTO,
  UpdatePartTypeDTO
>('part-types');

// PartStatuses API
export const partStatusesApi = createDirectoryApi<
  PartStatusDTO,
  CreatePartStatusDTO,
  UpdatePartStatusDTO
>('part-statuses');

// RepairTypes API
export const repairTypesApi = createDirectoryApi<
  RepairTypeDTO,
  CreateRepairTypeDTO,
  UpdateRepairTypeDTO
>('repair-types');

// Registrars API
export const registrarsApi = createDirectoryApi<
  RegistrarDTO,
  CreateRegistrarDTO,
  UpdateRegistrarDTO
>('registrars');

// WagonModels API
export const wagonModelsApi = createDirectoryApi<
  WagonModelDTO,
  CreateWagonModelDTO,
  UpdateWagonModelDTO
>('wagon-models');

// StampNumbers API
export const stampNumbersApi = createDirectoryApi<
  StampNumberDTO,
  CreateStampNumberDTO,
  UpdateStampNumberDTO
>('stamp-numbers');

// Helper functions to convert DTOs to SelectOptions
export const convertToSelectOptions = {
  manufacturers: (manufacturers: ManufacturerDTO[]) =>
    manufacturers.map(m => ({ value: m.id, label: m.name })),

  wagonTypes: (types: WagonTypeDTO[]) =>
    types.map(t => ({ value: t.id, label: t.name })),

  wagonModels: (models: WagonModelDTO[]) =>
    models.map(m => ({ value: m.id, label: m.name })),

  affiliations: (affiliations: AffiliationDTO[]) =>
    affiliations.map(a => ({ value: a.id, label: a.value })),

  owners: (owners: OwnerDTO[]) =>
    owners.map(o => ({ value: o.id, label: o.name })),

  registrars: (registrars: RegistrarDTO[]) =>
    registrars.map(r => ({ value: r.id, label: r.name })),

  stampNumbers: (stampNumbers: StampNumberDTO[]) =>
    stampNumbers.map(s => ({ value: s.id, label: s.number })),
};
