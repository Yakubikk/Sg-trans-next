import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { partStatusesApi, convertToSelectOptions } from '@/api/directories';
import type { SelectOption } from '@/types/directories';

// Query keys
export const partStatusesKeys = {
  all: ['directories', 'partStatuses'] as const,
  byId: (id: string) => [...partStatusesKeys.all, id] as const,
};

// Hooks
export const usePartStatuses = () => {
  return useQuery({
    queryKey: partStatusesKeys.all,
    queryFn: partStatusesApi.getAll,
  });
};

export const usePartStatus = (id: string) => {
  return useQuery({
    queryKey: partStatusesKeys.byId(id),
    queryFn: () => partStatusesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePartStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partStatusesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partStatusesKeys.all });
    },
  });
};

export const useUpdatePartStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof partStatusesApi.update>[1] }) =>
      partStatusesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partStatusesKeys.all });
    },
  });
};

export const useDeletePartStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partStatusesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partStatusesKeys.all });
    },
  });
};

// Helper hook for select options
export const usePartStatusOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = usePartStatuses();
  return {
    data: data ? convertToSelectOptions.partStatuses(data) : undefined,
    isLoading,
    error,
  };
};
