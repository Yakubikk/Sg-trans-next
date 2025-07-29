import { brakesApi } from '@/api/references/brakes';
import { Brake } from '@/api/references/brakes/types';
import { createGenericCRUD } from '../common/useGenericCRUD';

// Query keys
export const brakesKeys = {
  all: ['brakes'] as const,
  lists: () => [...brakesKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...brakesKeys.lists(), { filters }] as const,
  details: () => [...brakesKeys.all, 'detail'] as const,
  detail: (id: string) => [...brakesKeys.details(), id] as const,
};

// Создаем CRUD хуки через универсальную фабрику
const brakesCRUD = createGenericCRUD<Brake>(brakesKeys, {
  getAll: brakesApi.getBrakes,
  getById: brakesApi.getBrakeById,
  create: brakesApi.createBrake,
  update: brakesApi.updateBrake,
  delete: brakesApi.deleteBrake,
  search: (query: string | number) => {
    const numberQuery = typeof query === 'string' ? parseInt(query, 10) : query;
    return brakesApi.searchBrakesByCode(numberQuery);
  },
});

// Экспортируем хуки с понятными именами
export const useBrakes = brakesCRUD.useList;
export const useBrake = brakesCRUD.useDetail;
export const useCreateBrake = brakesCRUD.useCreate;
export const useUpdateBrake = brakesCRUD.useUpdate;
export const useDeleteBrake = brakesCRUD.useDelete;
export const useSearchBrakesByCode = brakesCRUD.useSearch;
