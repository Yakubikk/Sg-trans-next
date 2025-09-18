import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { filterTypesApi } from '@/api/directories';

// Query keys
export const filterTypesKeys = {
  all: ['directories', 'filterTypes'] as const,
  byId: (id: string) => [...filterTypesKeys.all, id] as const,
};

// Hooks
export const useFilterTypes = () => {
  return useQuery({
    queryKey: filterTypesKeys.all,
    queryFn: filterTypesApi.getAll,
  });
};

export const useFilterType = (id: string) => {
  return useQuery({
    queryKey: filterTypesKeys.byId(id),
    queryFn: () => filterTypesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateFilterType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: filterTypesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: filterTypesKeys.all });
    },
  });
};

export const useUpdateFilterType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof filterTypesApi.update>[1] }) =>
      filterTypesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: filterTypesKeys.all });
    },
  });
};

export const useDeleteFilterType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: filterTypesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: filterTypesKeys.all });
    },
  });
};
