import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { manufacturersApi, convertToSelectOptions } from '@/api/directories';
import type { SelectOption } from '@/types/directories';

// Query keys
export const manufacturersKeys = {
  all: ['directories', 'manufacturers'] as const,
  byId: (id: string) => [...manufacturersKeys.all, id] as const,
};

// Hooks
export const useManufacturers = () => {
  return useQuery({
    queryKey: manufacturersKeys.all,
    queryFn: manufacturersApi.getAll,
  });
};

export const useManufacturer = (id: string) => {
  return useQuery({
    queryKey: manufacturersKeys.byId(id),
    queryFn: () => manufacturersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateManufacturer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: manufacturersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: manufacturersKeys.all });
    },
  });
};

export const useUpdateManufacturer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof manufacturersApi.update>[1] }) =>
      manufacturersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: manufacturersKeys.all });
    },
  });
};

export const useDeleteManufacturer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: manufacturersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: manufacturersKeys.all });
    },
  });
};

// Helper hook for select options
export const useManufacturerOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useManufacturers();
  return {
    data: data ? convertToSelectOptions.manufacturers(data) : undefined,
    isLoading,
    error,
  };
};
