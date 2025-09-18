import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { wagonTypesApi, convertToSelectOptions } from '@/api/directories';
import type { SelectOption } from '@/types/directories';

// Query keys
export const wagonTypesKeys = {
  all: ['directories', 'wagonTypes'] as const,
  byId: (id: string) => [...wagonTypesKeys.all, id] as const,
};

// Hooks
export const useWagonTypes = () => {
  return useQuery({
    queryKey: wagonTypesKeys.all,
    queryFn: wagonTypesApi.getAll,
  });
};

export const useWagonType = (id: string) => {
  return useQuery({
    queryKey: wagonTypesKeys.byId(id),
    queryFn: () => wagonTypesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateWagonType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wagonTypesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wagonTypesKeys.all });
    },
  });
};

export const useUpdateWagonType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof wagonTypesApi.update>[1] }) =>
      wagonTypesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wagonTypesKeys.all });
    },
  });
};

export const useDeleteWagonType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wagonTypesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wagonTypesKeys.all });
    },
  });
};

// Helper hook for select options
export const useWagonTypeOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useWagonTypes();
  return {
    data: data ? convertToSelectOptions.wagonTypes(data) : undefined,
    isLoading,
    error,
  };
};
