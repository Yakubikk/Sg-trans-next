import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { railwayCisternsApi, RailwayCisternDetail } from '@/api/references';

// Query keys
export const railwayCisternsKeys = {
  all: ['railway-cisterns'] as const,
  lists: () => [...railwayCisternsKeys.all, 'list'] as const,
  details: () => [...railwayCisternsKeys.all, 'detail'] as const,
  detail: (id: string) => [...railwayCisternsKeys.details(), id] as const,
  byNumber: (number: string) => [...railwayCisternsKeys.all, 'by-number', number] as const,
};

// Hooks
export function useRailwayCisterns() {
  return useQuery({
    queryKey: railwayCisternsKeys.lists(),
    queryFn: async () => {
      const response = await railwayCisternsApi.getRailwayCisterns();
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRailwayCistern(id: string) {
  return useQuery({
    queryKey: railwayCisternsKeys.detail(id),
    queryFn: async () => {
      const response = await railwayCisternsApi.getRailwayCisternById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useRailwayCisternByNumber(number: string) {
  return useQuery({
    queryKey: railwayCisternsKeys.byNumber(number),
    queryFn: async (): Promise<RailwayCisternDetail | null> => {
      if (!number?.trim()) {
        return null;
      }
      const response = await railwayCisternsApi.getRailwayCisternByNumber(number);
      return response.data || null;
    },
    enabled: !!number?.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: Error) => {
      // Не повторяем запрос если цистерна не найдена (404)
      if ((error as AxiosError)?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}
