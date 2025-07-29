import { repairTypesApi } from '@/api/references';
import { RepairType } from '@/api/references/repair-types';
import { createGenericCRUD } from '../common/useGenericCRUD';

// Query keys
export const repairTypesKeys = {
  all: ['repair-types'] as const,
  lists: () => [...repairTypesKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...repairTypesKeys.lists(), { filters }] as const,
  details: () => [...repairTypesKeys.all, 'detail'] as const,
  detail: (id: string) => [...repairTypesKeys.details(), id] as const,
};

// Создаем CRUD хуки через универсальную фабрику
const repairTypesCRUD = createGenericCRUD<RepairType>(repairTypesKeys, {
  getAll: repairTypesApi.getRepairTypes,
  getById: repairTypesApi.getRepairTypeById,
  create: repairTypesApi.createRepairType,
  update: repairTypesApi.updateRepairType,
  delete: repairTypesApi.deleteRepairType,
  search: (query: string | number) => {
    const stringQuery = typeof query === 'number' ? query.toString() : query;
    return repairTypesApi.searchRepairTypesByName(stringQuery);
  },
});

// Экспортируем хуки с понятными именами
export const useRepairTypes = repairTypesCRUD.useList;
export const useRepairType = repairTypesCRUD.useDetail;
export const useCreateRepairType = repairTypesCRUD.useCreate;
export const useUpdateRepairType = repairTypesCRUD.useUpdate;
export const useDeleteRepairType = repairTypesCRUD.useDelete;
export const useSearchRepairTypesByName = repairTypesCRUD.useSearch;
