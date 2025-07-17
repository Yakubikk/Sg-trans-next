import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { absorberDevicesApi } from '@/api/references/absorber-devices';
import { AbsorberDevice } from '@/api/references/absorber-devices/types';

// Query keys
export const absorberDevicesKeys = {
  all: ['absorber-devices'] as const,
  lists: () => [...absorberDevicesKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...absorberDevicesKeys.lists(), { filters }] as const,
  details: () => [...absorberDevicesKeys.all, 'detail'] as const,
  detail: (id: string) => [...absorberDevicesKeys.details(), id] as const,
};

// Hooks
export function useAbsorberDevices() {
  return useQuery({
    queryKey: absorberDevicesKeys.lists(),
    queryFn: async () => {
      const response = await absorberDevicesApi.getAbsorberDevices();
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAbsorberDevice(id: string) {
  return useQuery({
    queryKey: absorberDevicesKeys.detail(id),
    queryFn: async () => {
      const response = await absorberDevicesApi.getAbsorberDeviceById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateAbsorberDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: absorberDevicesApi.createAbsorberDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: absorberDevicesKeys.lists() });
    },
  });
}

export function useUpdateAbsorberDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AbsorberDevice> }) =>
      absorberDevicesApi.updateAbsorberDevice(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: absorberDevicesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: absorberDevicesKeys.detail(id) });
    },
  });
}

export function useDeleteAbsorberDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: absorberDevicesApi.deleteAbsorberDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: absorberDevicesKeys.lists() });
    },
  });
}

export function useSearchAbsorberDevicesByCode(code: number) {
  return useQuery({
    queryKey: [...absorberDevicesKeys.all, 'search', code],
    queryFn: async () => {
      const response = await absorberDevicesApi.searchAbsorberDevicesByCode(code);
      return response.data || [];
    },
    enabled: !!code,
  });
}
