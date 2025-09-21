import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { wagonModelsApi, convertToSelectOptions } from '@/api/directories';
import type { SelectOption } from '@/types/directories';

// Query keys
export const wagonModelsKeys = {
  all: ['directories', 'wagonModels'] as const,
  byId: (id: string) => [...wagonModelsKeys.all, id] as const,
};

// Hooks
export const useWagonModels = () => {
  return useQuery({
    queryKey: wagonModelsKeys.all,
    queryFn: wagonModelsApi.getAll,
  });
};

export const useWagonModel = (id: string) => {
  return useQuery({
    queryKey: wagonModelsKeys.byId(id),
    queryFn: () => wagonModelsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateWagonModel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wagonModelsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wagonModelsKeys.all });
    },
  });
};

export const useUpdateWagonModel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof wagonModelsApi.update>[1] }) =>
      wagonModelsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wagonModelsKeys.all });
    },
  });
};

export const useDeleteWagonModel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wagonModelsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wagonModelsKeys.all });
    },
  });
};

// Helper hook for select options
export const useWagonModelOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useWagonModels();
  return {
    data: data ? convertToSelectOptions.wagonModels(data) : undefined,
    isLoading,
    error,
  };
};
