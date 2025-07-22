import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { railwayCisternsApi, railwayCisternsKeys } from '@/api/references';
import type { CreateRailwayCisternRequest, UpdateRailwayCisternRequest } from '@/api/references';

// Получение списка цистерн
export function useRailwayCisterns() {
  return useQuery({
    queryKey: railwayCisternsKeys.list(),
    queryFn: railwayCisternsApi.getRailwayCisterns,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Получение цистерны по номеру
export function useRailwayCisternByNumber(number: string) {
  return useQuery({
    queryKey: railwayCisternsKeys.byNumber(number),
    queryFn: () => railwayCisternsApi.getRailwayCisternByNumber(number),
    enabled: !!number && number.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: (failureCount, error) => {
      // Не повторяем запрос для 404 ошибок
      if (error?.message?.includes('404') || error?.message?.includes('Not Found')) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// Получение цистерны по ID
export function useRailwayCistern(id: string) {
  return useQuery({
    queryKey: railwayCisternsKeys.detail(id),
    queryFn: () => railwayCisternsApi.getRailwayCisternById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Создание цистерны
export function useCreateRailwayCistern() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRailwayCisternRequest) => railwayCisternsApi.createRailwayCistern(data),
    onSuccess: (newCistern) => {
      // Инвалидируем список цистерн
      queryClient.invalidateQueries({ queryKey: railwayCisternsKeys.list() });
      
      // Добавляем новую цистерну в кеш
      queryClient.setQueryData(
        railwayCisternsKeys.detail(newCistern.id),
        newCistern
      );
      
      // Если у цистерны есть номер, добавляем в кеш по номеру
      if (newCistern.number) {
        queryClient.setQueryData(
          railwayCisternsKeys.byNumber(newCistern.number),
          newCistern
        );
      }
    },
  });
}

// Обновление цистерны
export function useUpdateRailwayCistern() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRailwayCisternRequest }) => 
      railwayCisternsApi.updateRailwayCistern(id, data),
    onSuccess: (updatedCistern, { id }) => {
      // Обновляем данные в кеше
      queryClient.setQueryData(
        railwayCisternsKeys.detail(id),
        updatedCistern
      );
      
      // Если у цистерны есть номер, обновляем кеш по номеру
      if (updatedCistern.number) {
        queryClient.setQueryData(
          railwayCisternsKeys.byNumber(updatedCistern.number),
          updatedCistern
        );
      }
      
      // Инвалидируем список цистерн
      queryClient.invalidateQueries({ queryKey: railwayCisternsKeys.list() });
    },
  });
}

// Удаление цистерны
export function useDeleteRailwayCistern() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => railwayCisternsApi.deleteRailwayCistern(id),
    onSuccess: (_, deletedId) => {
      // Удаляем из кеша
      queryClient.removeQueries({ queryKey: railwayCisternsKeys.detail(deletedId) });
      
      // Инвалидируем список цистерн
      queryClient.invalidateQueries({ queryKey: railwayCisternsKeys.list() });
      
      // Инвалидируем все запросы по номерам, так как мы не знаем номер удаленной цистерны
      queryClient.invalidateQueries({ 
        queryKey: railwayCisternsKeys.base(),
        predicate: (query) => query.queryKey.includes('byNumber')
      });
    },
  });
}
