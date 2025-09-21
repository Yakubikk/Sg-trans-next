import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { registrarsApi, convertToSelectOptions } from '@/api/directories';
import type { SelectOption } from '@/types/directories';

// Query keys
export const registrarsKeys = {
  all: ['directories', 'registrars'] as const,
  byId: (id: string) => [...registrarsKeys.all, id] as const,
};

// Hooks
export const useRegistrars = () => {
  return useQuery({
    queryKey: registrarsKeys.all,
    queryFn: registrarsApi.getAll,
  });
};

export const useRegistrar = (id: string) => {
  return useQuery({
    queryKey: registrarsKeys.byId(id),
    queryFn: () => registrarsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateRegistrar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registrarsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: registrarsKeys.all });
    },
  });
};

export const useUpdateRegistrar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof registrarsApi.update>[1] }) =>
      registrarsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: registrarsKeys.all });
    },
  });
};

export const useDeleteRegistrar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registrarsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: registrarsKeys.all });
    },
  });
};

// Helper hook for select options
export const useRegistrarOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useRegistrars();
  return {
    data: data ? convertToSelectOptions.registrars(data) : undefined,
    isLoading,
    error,
  };
};
