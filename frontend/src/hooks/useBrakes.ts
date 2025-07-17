import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { brakesApi } from '@/api/references/brakes';
import { Brake } from '@/api/references/brakes/types';

// Query keys
export const brakesKeys = {
  all: ['brakes'] as const,
  lists: () => [...brakesKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...brakesKeys.lists(), { filters }] as const,
  details: () => [...brakesKeys.all, 'detail'] as const,
  detail: (id: string) => [...brakesKeys.details(), id] as const,
};

// Hooks
export function useBrakes() {
  return useQuery({
    queryKey: brakesKeys.lists(),
    queryFn: async () => {
      const response = await brakesApi.getBrakes();
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBrake(id: string) {
  return useQuery({
    queryKey: brakesKeys.detail(id),
    queryFn: async () => {
      const response = await brakesApi.getBrakeById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateBrake() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brakesApi.createBrake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brakesKeys.lists() });
    },
  });
}

export function useUpdateBrake() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Brake> }) =>
      brakesApi.updateBrake(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: brakesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: brakesKeys.detail(id) });
    },
  });
}

export function useDeleteBrake() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brakesApi.deleteBrake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brakesKeys.lists() });
    },
  });
}

export function useSearchBrakesByCode(code: number) {
  return useQuery({
    queryKey: [...brakesKeys.all, 'search', code],
    queryFn: async () => {
      const response = await brakesApi.searchBrakesByCode(code);
      return response.data || [];
    },
    enabled: !!code,
  });
}
