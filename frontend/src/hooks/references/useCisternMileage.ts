import { useQuery } from '@tanstack/react-query';
import { cisternMileageApi, cisternMileageKeys } from '@/api/references/cistern-mileage';
import type { 
  CisternMileage, 
  CreateCisternMileageRequest, 
  UpdateCisternMileageRequest 
} from '@/api/references/cistern-mileage';
import { createGenericCRUD } from '../common/useGenericCRUD';

// Создаем CRUD хуки через универсальную фабрику
const cisternMileageCRUD = createGenericCRUD<CisternMileage, CreateCisternMileageRequest, UpdateCisternMileageRequest>(cisternMileageKeys, {
  getAll: cisternMileageApi.getCisternMileages,
  getById: cisternMileageApi.getCisternMileageById,
  create: cisternMileageApi.createCisternMileage,
  update: cisternMileageApi.updateCisternMileage,
  delete: cisternMileageApi.deleteCisternMileage,
});

// Экспортируем хуки с понятными именами
export const useCisternMileages = cisternMileageCRUD.useList;
export const useCisternMileage = cisternMileageCRUD.useDetail;
export const useCreateCisternMileage = cisternMileageCRUD.useCreate;
export const useUpdateCisternMileage = cisternMileageCRUD.useUpdate;
export const useDeleteCisternMileage = cisternMileageCRUD.useDelete;

// Специальный хук для получения пробегов по ID цистерны
export const useCisternMileageByCisternId = (cisternId: string) => {
  return useQuery({
    queryKey: cisternMileageKeys.byCistern(cisternId),
    queryFn: async () => {
      const response = await cisternMileageApi.getCisternMileageByCisternId(cisternId);
      return response.data || [];
    },
    enabled: !!cisternId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
