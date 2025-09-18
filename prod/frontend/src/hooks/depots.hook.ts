import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { depotsApi, convertToSelectOptions } from '@/api/directories';
import type { SelectOption } from '@/types/directories';

// Query keys
export const depotsKeys = {
  all: ['directories', 'depots'] as const,
  byId: (id: string) => [...depotsKeys.all, id] as const,
};

// Hooks
export const useDepots = () => {
  return useQuery({
    queryKey: depotsKeys.all,
    queryFn: depotsApi.getAll,
  });
};

export const useDepot = (id: string) => {
  return useQuery({
    queryKey: depotsKeys.byId(id),
    queryFn: () => depotsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateDepot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: depotsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: depotsKeys.all });
    },
  });
};

export const useUpdateDepot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof depotsApi.update>[1] }) =>
      depotsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: depotsKeys.all });
    },
  });
};

export const useDeleteDepot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: depotsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: depotsKeys.all });
    },
  });
};

// Helper hook for select options
export const useDepotOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useDepots();
  return {
    data: data ? convertToSelectOptions.depots(data) : undefined,
    isLoading,
    error,
  };
};
