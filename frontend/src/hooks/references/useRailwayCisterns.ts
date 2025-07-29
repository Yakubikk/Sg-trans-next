import { railwayCisternsApi, railwayCisternsKeys } from '@/api/references';
import type { 
  CreateRailwayCisternRequest, 
  UpdateRailwayCisternRequest, 
  RailwayCistern,
} from '@/api/references';
import { createGenericCRUD } from '../common/useGenericCRUD';
import { useQuery } from '@tanstack/react-query';

// Создаем CRUD хуки через универсальную фабрику
const railwayCisternsCRUD = createGenericCRUD<RailwayCistern, CreateRailwayCisternRequest, UpdateRailwayCisternRequest>(railwayCisternsKeys, {
  getAll: railwayCisternsApi.getRailwayCisterns,
  getById: railwayCisternsApi.getRailwayCisternById,
  create: railwayCisternsApi.createRailwayCistern,
  update: railwayCisternsApi.updateRailwayCistern,
  delete: railwayCisternsApi.deleteRailwayCistern,
});

// Экспортируем хуки с понятными именами
export const useRailwayCisterns = railwayCisternsCRUD.useList;
export const useRailwayCistern = railwayCisternsCRUD.useDetail;
export const useCreateRailwayCistern = railwayCisternsCRUD.useCreate;
export const useUpdateRailwayCistern = railwayCisternsCRUD.useUpdate;
export const useDeleteRailwayCistern = railwayCisternsCRUD.useDelete;

// Хуки для детальных данных цистерн
export const useRailwayCisternsDetailed = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: [...railwayCisternsKeys.all, 'detailed', page, pageSize],
    queryFn: async () => {
      const response = await railwayCisternsApi.getRailwayCisternsDetailed(page, pageSize);
      return response.data;
    },
  });
};

export const useRailwayCisternDetailedById = (id: string) => {
  return useQuery({
    queryKey: [...railwayCisternsKeys.detail(id), 'detailed'],
    queryFn: async () => {
      const response = await railwayCisternsApi.getRailwayCisternDetailedById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useRailwayCisternDetailedByNumber = (number: string) => {
  return useQuery({
    queryKey: [...railwayCisternsKeys.byNumber(number), 'detailed'],
    queryFn: async () => {
      const response = await railwayCisternsApi.getRailwayCisternDetailedByNumber(number);
      // Если данные приходят в виде массива, берем первый элемент
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      return data;
    },
    enabled: !!number,
  });
};
