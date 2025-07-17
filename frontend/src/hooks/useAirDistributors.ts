import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { airDistributorsApi } from '@/api/references/air-distributors';
import { AirDistributor } from '@/api/references/air-distributors/types';

// Query keys
export const airDistributorsKeys = {
  all: ['air-distributors'] as const,
  lists: () => [...airDistributorsKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...airDistributorsKeys.lists(), { filters }] as const,
  details: () => [...airDistributorsKeys.all, 'detail'] as const,
  detail: (id: string) => [...airDistributorsKeys.details(), id] as const,
};

// Hooks
export function useAirDistributors() {
  return useQuery({
    queryKey: airDistributorsKeys.lists(),
    queryFn: async () => {
      const response = await airDistributorsApi.getAirDistributors();
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAirDistributor(id: string) {
  return useQuery({
    queryKey: airDistributorsKeys.detail(id),
    queryFn: async () => {
      const response = await airDistributorsApi.getAirDistributorById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateAirDistributor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: airDistributorsApi.createAirDistributor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: airDistributorsKeys.lists() });
    },
  });
}

export function useUpdateAirDistributor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AirDistributor> }) =>
      airDistributorsApi.updateAirDistributor(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: airDistributorsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: airDistributorsKeys.detail(id) });
    },
  });
}

export function useDeleteAirDistributor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: airDistributorsApi.deleteAirDistributor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: airDistributorsKeys.lists() });
    },
  });
}

export function useSearchAirDistributorsByCode(code: number) {
  return useQuery({
    queryKey: [...airDistributorsKeys.all, 'search', code],
    queryFn: async () => {
      const response = await airDistributorsApi.searchAirDistributorsByCode(code);
      return response.data || [];
    },
    enabled: !!code,
  });
}
