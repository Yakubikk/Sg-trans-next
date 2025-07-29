import { airDistributorsApi } from '@/api/references/air-distributors';
import { AirDistributor } from '@/api/references/air-distributors/types';
import { createGenericCRUD } from '../common/useGenericCRUD';

// Query keys
export const airDistributorsKeys = {
  all: ['air-distributors'] as const,
  lists: () => [...airDistributorsKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...airDistributorsKeys.lists(), { filters }] as const,
  details: () => [...airDistributorsKeys.all, 'detail'] as const,
  detail: (id: string) => [...airDistributorsKeys.details(), id] as const,
};

// Создаем CRUD хуки через универсальную фабрику
const airDistributorsCRUD = createGenericCRUD<AirDistributor>(airDistributorsKeys, {
  getAll: airDistributorsApi.getAirDistributors,
  getById: airDistributorsApi.getAirDistributorById,
  create: airDistributorsApi.createAirDistributor,
  update: airDistributorsApi.updateAirDistributor,
  delete: airDistributorsApi.deleteAirDistributor,
  search: (query: string | number) => {
    const numberQuery = typeof query === 'string' ? parseInt(query, 10) : query;
    return airDistributorsApi.searchAirDistributorsByCode(numberQuery);
  },
});

// Экспортируем хуки с понятными именами
export const useAirDistributors = airDistributorsCRUD.useList;
export const useAirDistributor = airDistributorsCRUD.useDetail;
export const useCreateAirDistributor = airDistributorsCRUD.useCreate;
export const useUpdateAirDistributor = airDistributorsCRUD.useUpdate;
export const useDeleteAirDistributor = airDistributorsCRUD.useDelete;
export const useSearchAirDistributorsByCode = airDistributorsCRUD.useSearch;
