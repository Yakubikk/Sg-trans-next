import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { repairTypesApi } from '@/api/references';
import { RepairType } from '@/api/references/repair-types';

// Query keys
export const repairTypesKeys = {
  all: ['repair-types'] as const,
  lists: () => [...repairTypesKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...repairTypesKeys.lists(), { filters }] as const,
  details: () => [...repairTypesKeys.all, 'detail'] as const,
  detail: (id: string) => [...repairTypesKeys.details(), id] as const,
};

// Hooks
export function useRepairTypes() {
  return useQuery({
    queryKey: repairTypesKeys.lists(),
    queryFn: async () => {
      const response = await repairTypesApi.getRepairTypes();
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRepairType(id: string) {
  return useQuery({
    queryKey: repairTypesKeys.detail(id),
    queryFn: async () => {
      const response = await repairTypesApi.getRepairTypeById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateRepairType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: repairTypesApi.createRepairType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repairTypesKeys.lists() });
    },
  });
}

export function useUpdateRepairType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RepairType> }) =>
      repairTypesApi.updateRepairType(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: repairTypesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: repairTypesKeys.detail(id) });
    },
  });
}

export function useDeleteRepairType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: repairTypesApi.deleteRepairType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repairTypesKeys.lists() });
    },
  });
}

export function useSearchRepairTypesByName(name: string) {
  return useQuery({
    queryKey: [...repairTypesKeys.all, 'search', name],
    queryFn: async () => {
      const response = await repairTypesApi.searchRepairTypesByName(name);
      return response.data || [];
    },
    enabled: !!name,
  });
}
