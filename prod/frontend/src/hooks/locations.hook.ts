import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { locationsApi } from '@/api/directories';

// Query keys
export const locationsKeys = {
  all: ['directories', 'locations'] as const,
  byId: (id: string) => [...locationsKeys.all, id] as const,
};

// Hooks
export const useLocations = () => {
  return useQuery({
    queryKey: locationsKeys.all,
    queryFn: locationsApi.getAll,
  });
};

export const useLocation = (id: string) => {
  return useQuery({
    queryKey: locationsKeys.byId(id),
    queryFn: () => locationsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: locationsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationsKeys.all });
    },
  });
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof locationsApi.update>[1] }) =>
      locationsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationsKeys.all });
    },
  });
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: locationsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationsKeys.all });
    },
  });
};
