import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { stampNumbersApi, convertToSelectOptions } from '@/api/directories';
import type { SelectOption } from '@/types/directories';

// Query keys
export const stampNumbersKeys = {
  all: ['directories', 'stampNumbers'] as const,
  byId: (id: string) => [...stampNumbersKeys.all, id] as const,
};

// Hooks
export const useStampNumbers = () => {
  return useQuery({
    queryKey: stampNumbersKeys.all,
    queryFn: stampNumbersApi.getAll,
  });
};

export const useStampNumber = (id: string) => {
  return useQuery({
    queryKey: stampNumbersKeys.byId(id),
    queryFn: () => stampNumbersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateStampNumber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: stampNumbersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stampNumbersKeys.all });
    },
  });
};

export const useUpdateStampNumber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof stampNumbersApi.update>[1] }) =>
      stampNumbersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stampNumbersKeys.all });
    },
  });
};

export const useDeleteStampNumber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: stampNumbersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stampNumbersKeys.all });
    },
  });
};

// Helper hook for select options
export const useStampNumberOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useStampNumbers();
  return {
    data: data ? convertToSelectOptions.stampNumbers(data) : undefined,
    isLoading,
    error,
  };
};
