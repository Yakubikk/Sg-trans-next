import { cargosApi } from '@/api/references/cargos';
import { Cargo } from '@/api/references/cargos/types';
import { createGenericCRUD } from '../common/useGenericCRUD';

// Query keys
export const cargosKeys = {
  all: ['cargos'] as const,
  lists: () => [...cargosKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...cargosKeys.lists(), { filters }] as const,
  details: () => [...cargosKeys.all, 'detail'] as const,
  detail: (id: string) => [...cargosKeys.details(), id] as const,
};

// Создаем CRUD хуки через универсальную фабрику
const cargosCRUD = createGenericCRUD<Cargo>(cargosKeys, {
  getAll: cargosApi.getCargos,
  getById: cargosApi.getCargoById,
  create: cargosApi.createCargo,
  update: cargosApi.updateCargo,
  delete: cargosApi.deleteCargo,
  search: (query: string | number) => {
    const numberQuery = typeof query === 'string' ? parseInt(query, 10) : query;
    return cargosApi.searchCargosByCode(numberQuery);
  },
});

// Экспортируем хуки с понятными именами
export const useCargos = cargosCRUD.useList;
export const useCargo = cargosCRUD.useDetail;
export const useCreateCargo = cargosCRUD.useCreate;
export const useUpdateCargo = cargosCRUD.useUpdate;
export const useDeleteCargo = cargosCRUD.useDelete;
export const useSearchCargosByCode = cargosCRUD.useSearch;
