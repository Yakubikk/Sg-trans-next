import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wagonsApi } from '@/api/references';
import { Wagon } from '@/api/references/wagons';

// Query keys
export const wagonsKeys = {
  all: ['wagons'] as const,
  lists: () => [...wagonsKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...wagonsKeys.lists(), { filters }] as const,
  details: () => [...wagonsKeys.all, 'detail'] as const,
  detail: (id: string) => [...wagonsKeys.details(), id] as const,
};

// Hooks
export function useWagons() {
  return useQuery({
    queryKey: wagonsKeys.lists(),
    queryFn: async () => {
      const response = await wagonsApi.getWagons();
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useWagon(id: string) {
  return useQuery({
    queryKey: wagonsKeys.detail(id),
    queryFn: async () => {
      const response = await wagonsApi.getWagonById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateWagon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wagonsApi.createWagon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wagonsKeys.lists() });
    },
  });
}

export function useUpdateWagon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Wagon> }) =>
      wagonsApi.updateWagon(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: wagonsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: wagonsKeys.detail(id) });
    },
  });
}

export function useDeleteWagon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wagonsApi.deleteWagon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wagonsKeys.lists() });
    },
  });
}

export function useSearchWagonsByNumber(number: number) {
  return useQuery({
    queryKey: [...wagonsKeys.all, 'search', number],
    queryFn: async () => {
      const response = await wagonsApi.searchWagonsByNumber(number);
      return response.data || [];
    },
    enabled: !!number,
  });
}
