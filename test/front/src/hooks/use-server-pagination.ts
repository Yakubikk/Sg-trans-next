import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams, PaginatedResponse } from '@/types/models';

interface UseServerPaginationProps<T> {
  queryKey: string;
  fetchFn: (params: PaginationParams) => Promise<PaginatedResponse<T>>;
  initialParams?: Partial<PaginationParams>;
}

export function useServerPagination<T>({
  queryKey,
  fetchFn,
  initialParams = {},
}: UseServerPaginationProps<T>) {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 20,
    search: '',
    ...initialParams,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey, pagination],
    queryFn: () => fetchFn(pagination),
  });

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handlePageSizeChange = (size: number) => {
    setPagination(prev => ({ ...prev, size, page: 1 }));
  };

  const handleSearchChange = (search: string) => {
    setPagination(prev => ({ ...prev, search, page: 1 }));
  };

  return {
    data,
    isLoading,
    error,
    pagination,
    setPagination,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
  };
}
