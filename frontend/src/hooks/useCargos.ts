import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cargosApi } from '@/api/references/cargos';
import { Cargo } from '@/api/references/cargos/types';

// Query keys
export const cargosKeys = {
  all: ['cargos'] as const,
  lists: () => [...cargosKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...cargosKeys.lists(), { filters }] as const,
  details: () => [...cargosKeys.all, 'detail'] as const,
  detail: (id: string) => [...cargosKeys.details(), id] as const,
};

// Hooks
export function useCargos() {
  return useQuery({
    queryKey: cargosKeys.lists(),
    queryFn: async () => {
      const response = await cargosApi.getCargos();
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCargo(id: string) {
  return useQuery({
    queryKey: cargosKeys.detail(id),
    queryFn: async () => {
      const response = await cargosApi.getCargoById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateCargo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cargosApi.createCargo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cargosKeys.lists() });
    },
  });
}

export function useUpdateCargo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Cargo> }) =>
      cargosApi.updateCargo(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: cargosKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cargosKeys.detail(id) });
    },
  });
}

export function useDeleteCargo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cargosApi.deleteCargo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cargosKeys.lists() });
    },
  });
}

export function useSearchCargosByCode(code: number) {
  return useQuery({
    queryKey: [...cargosKeys.all, 'search', code],
    queryFn: async () => {
      const response = await cargosApi.searchCargosByCode(code);
      return response.data || [];
    },
    enabled: !!code,
  });
}
