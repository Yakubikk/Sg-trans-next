import { absorberDevicesApi } from '@/api/references/absorber-devices';
import { AbsorberDevice } from '@/api/references/absorber-devices/types';
import { createGenericCRUD } from '../common/useGenericCRUD';

// Query keys
export const absorberDevicesKeys = {
  all: ['absorber-devices'] as const,
  lists: () => [...absorberDevicesKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...absorberDevicesKeys.lists(), { filters }] as const,
  details: () => [...absorberDevicesKeys.all, 'detail'] as const,
  detail: (id: string) => [...absorberDevicesKeys.details(), id] as const,
};

// Создаем CRUD хуки через универсальную фабрику
const absorberDevicesCRUD = createGenericCRUD<AbsorberDevice>(absorberDevicesKeys, {
  getAll: absorberDevicesApi.getAbsorberDevices,
  getById: absorberDevicesApi.getAbsorberDeviceById,
  create: absorberDevicesApi.createAbsorberDevice,
  update: absorberDevicesApi.updateAbsorberDevice,
  delete: absorberDevicesApi.deleteAbsorberDevice,
  search: (query: string | number) => {
    const numberQuery = typeof query === 'string' ? parseInt(query, 10) : query;
    return absorberDevicesApi.searchAbsorberDevicesByCode(numberQuery);
  },
});

// Экспортируем хуки с понятными именами
export const useAbsorberDevices = absorberDevicesCRUD.useList;
export const useAbsorberDevice = absorberDevicesCRUD.useDetail;
export const useCreateAbsorberDevice = absorberDevicesCRUD.useCreate;
export const useUpdateAbsorberDevice = absorberDevicesCRUD.useUpdate;
export const useDeleteAbsorberDevice = absorberDevicesCRUD.useDelete;
export const useSearchAbsorberDevicesByCode = absorberDevicesCRUD.useSearch;
