import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { affiliationsApi, convertToSelectOptions } from '@/api/directories';
import type { SelectOption } from '@/types/directories';

// Query keys
export const affiliationsKeys = {
  all: ['directories', 'affiliations'] as const,
  byId: (id: string) => [...affiliationsKeys.all, id] as const,
};

// Hooks
export const useAffiliations = () => {
  return useQuery({
    queryKey: affiliationsKeys.all,
    queryFn: affiliationsApi.getAll,
  });
};

export const useAffiliation = (id: string) => {
  return useQuery({
    queryKey: affiliationsKeys.byId(id),
    queryFn: () => affiliationsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateAffiliation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: affiliationsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: affiliationsKeys.all });
    },
  });
};

export const useUpdateAffiliation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof affiliationsApi.update>[1] }) =>
      affiliationsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: affiliationsKeys.all });
    },
  });
};

export const useDeleteAffiliation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: affiliationsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: affiliationsKeys.all });
    },
  });
};

// Helper hook for select options
export const useAffiliationOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useAffiliations();
  return {
    data: data ? convertToSelectOptions.affiliations(data) : undefined,
    isLoading,
    error,
  };
};
