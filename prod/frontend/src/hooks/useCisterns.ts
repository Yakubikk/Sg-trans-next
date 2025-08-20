import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cisternsApi } from '@/api/cisterns';
import type { 
  CisternsFilter,
  RailwayCisternDetailDTO,
  CreateRailwayCisternDTO,
  UpdateRailwayCisternDTO 
} from '@/types/cisterns';

// Query keys
export const cisternsKeys = {
  all: ['cisterns'] as const,
  lists: () => [...cisternsKeys.all, 'list'] as const,
  list: (filter?: CisternsFilter) => [...cisternsKeys.lists(), filter] as const,
  details: () => [...cisternsKeys.all, 'detail'] as const,
  detail: (id: string) => [...cisternsKeys.details(), id] as const,
  search: () => [...cisternsKeys.all, 'search'] as const,
  searchResults: (prefix: string) => [...cisternsKeys.search(), prefix] as const,
};

// Get paginated cisterns
export const useCisterns = (filter?: CisternsFilter) => {
  return useQuery({
    queryKey: cisternsKeys.list(filter),
    queryFn: () => cisternsApi.getAll(filter),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get cistern by ID
export const useCistern = (id: string) => {
  return useQuery({
    queryKey: cisternsKeys.detail(id),
    queryFn: () => cisternsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create cistern
export const useCreateCistern = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRailwayCisternDTO) => cisternsApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch cisterns list
      queryClient.invalidateQueries({ queryKey: cisternsKeys.lists() });
    },
  });
};

// Update cistern
export const useUpdateCistern = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRailwayCisternDTO }) => 
      cisternsApi.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch cisterns list
      queryClient.invalidateQueries({ queryKey: cisternsKeys.lists() });
      // Update the specific cistern in cache
      queryClient.setQueryData(cisternsKeys.detail(variables.id), data);
    },
  });
};

// Delete cistern
export const useDeleteCistern = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cisternsApi.delete(id),
    onSuccess: () => {
      // Invalidate and refetch cisterns list
      queryClient.invalidateQueries({ queryKey: cisternsKeys.lists() });
    },
  });
};

// Search cisterns by number prefix
export const useSearchCisterns = (prefix: string, enabled: boolean = true) => {
  return useQuery<RailwayCisternDetailDTO[]>({
    queryKey: ['cisterns', 'search', prefix],
    queryFn: () => cisternsApi.search(prefix),
    enabled: enabled && prefix.length > 0,
    staleTime: 30000, // 30 seconds
  });
};
