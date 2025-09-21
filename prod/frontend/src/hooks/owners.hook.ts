import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ownersApi, convertToSelectOptions } from '@/api/directories';
import type { SelectOption } from '@/types/directories';

// Query keys
export const ownersKeys = {
  all: ['directories', 'owners'] as const,
  byId: (id: string) => [...ownersKeys.all, id] as const,
};

// Hooks
export const useOwners = () => {
  return useQuery({
    queryKey: ownersKeys.all,
    queryFn: ownersApi.getAll,
  });
};

export const useOwner = (id: string) => {
  return useQuery({
    queryKey: ownersKeys.byId(id),
    queryFn: () => ownersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateOwner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ownersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownersKeys.all });
    },
  });
};

export const useUpdateOwner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof ownersApi.update>[1] }) =>
      ownersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownersKeys.all });
    },
  });
};

export const useDeleteOwner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ownersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownersKeys.all });
    },
  });
};

// Helper hook for select options
export const useOwnerOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useOwners();
  return {
    data: data ? convertToSelectOptions.owners(data) : undefined,
    isLoading,
    error,
  };
};
