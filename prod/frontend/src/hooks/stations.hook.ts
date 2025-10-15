import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { stationsApi } from '@/api/directories';

// Query keys
export const stationsKeys = {
  all: ['directories', 'stations'] as const,
  list: (pageNumber: number, pageSize: number) => [...stationsKeys.all, 'list', pageNumber, pageSize] as const,
  byId: (id: string) => [...stationsKeys.all, id] as const,
};

// Hooks
export const useStations = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: stationsKeys.list(pageNumber, pageSize),
    queryFn: () => stationsApi.getAll(pageNumber, pageSize),
  });
};

export const useStation = (id: string) => {
  return useQuery({
    queryKey: stationsKeys.byId(id),
    queryFn: () => stationsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateStation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: stationsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stationsKeys.all });
    },
  });
};

export const useUpdateStation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof stationsApi.update>[1] }) =>
      stationsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stationsKeys.all });
    },
  });
};

export const useDeleteStation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: stationsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stationsKeys.all });
    },
  });
};
