import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { repairTypesApi } from '@/api/directories';

// Query keys
export const repairTypesKeys = {
  all: ['directories', 'repairTypes'] as const,
  byId: (id: string) => [...repairTypesKeys.all, id] as const,
};

// Hooks
export const useRepairTypes = () => {
  return useQuery({
    queryKey: repairTypesKeys.all,
    queryFn: repairTypesApi.getAll,
  });
};

export const useRepairType = (id: string) => {
  return useQuery({
    queryKey: repairTypesKeys.byId(id),
    queryFn: () => repairTypesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateRepairType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: repairTypesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repairTypesKeys.all });
    },
  });
};

export const useUpdateRepairType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof repairTypesApi.update>[1] }) =>
      repairTypesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repairTypesKeys.all });
    },
  });
};

export const useDeleteRepairType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: repairTypesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repairTypesKeys.all });
    },
  });
};
