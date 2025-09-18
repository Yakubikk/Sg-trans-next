import { useMutation, useQuery } from '@tanstack/react-query';
import { partsFilterApi } from '@/api/directories';
import type { 
  PartFilterSortDTO,
  PartFilterSortWithoutPaginationDTO,
} from '@/types/directories';

// Hooks
export const useFilterParts = () => {
  return useMutation({
    mutationFn: (request: PartFilterSortDTO) => partsFilterApi.filter(request),
  });
};

export const useFilterAllParts = () => {
  return useMutation({
    mutationFn: (request: PartFilterSortWithoutPaginationDTO) => partsFilterApi.filterAll(request),
  });
};

export const useGetPartsBySavedFilter = (filterId: string) => {
  return useQuery({
    queryKey: ['parts-filter', 'saved', filterId],
    queryFn: () => partsFilterApi.getBySavedFilter(filterId),
    enabled: !!filterId,
  });
};
