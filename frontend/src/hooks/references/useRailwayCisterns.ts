import { railwayCisternsApi, railwayCisternsKeys } from '@/api/references';
import { createGenericCRUD } from '@/hooks/common';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  CreateRailwayCisternRequest,
  CreateRailwayCisternDetailedRequest,
  UpdateRailwayCisternRequest, 
  RailwayCistern,
  CisternFilter,
} from '@/api/references';

// Создаем CRUD хуки через универсальную фабрику
const railwayCisternsCRUD = createGenericCRUD<RailwayCistern, CreateRailwayCisternRequest, UpdateRailwayCisternRequest>(railwayCisternsKeys, {
  getAll: railwayCisternsApi.getRailwayCisterns,
  getById: railwayCisternsApi.getRailwayCisternById,
  create: railwayCisternsApi.createRailwayCistern,
  update: railwayCisternsApi.updateRailwayCistern,
  delete: railwayCisternsApi.deleteRailwayCistern,
});

// Экспортируем хуки с понятными именами
export const useRailwayCisterns = railwayCisternsCRUD.useList;
export const useRailwayCistern = railwayCisternsCRUD.useDetail;
export const useCreateRailwayCistern = railwayCisternsCRUD.useCreate;
export const useUpdateRailwayCistern = railwayCisternsCRUD.useUpdate;
export const useDeleteRailwayCistern = railwayCisternsCRUD.useDelete;

// Хуки для детальных данных цистерн
export const useRailwayCisternsDetailed = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: [...railwayCisternsKeys.all, 'detailed', page, pageSize],
    queryFn: async () => {
      const response = await railwayCisternsApi.getRailwayCisternsDetailed(page, pageSize);
      return response.data;
    },
  });
};

export const useRailwayCisternDetailedById = (id: string) => {
  return useQuery({
    queryKey: [...railwayCisternsKeys.detail(id), 'detailed'],
    queryFn: async () => {
      const response = await railwayCisternsApi.getRailwayCisternDetailedById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useRailwayCisternDetailedByNumber = (number: string) => {
  return useQuery({
    queryKey: [...railwayCisternsKeys.byNumber(number), 'detailed'],
    queryFn: async () => {
      const response = await railwayCisternsApi.getRailwayCisternDetailedByNumber(number);
      // Если данные приходят в виде массива, берем первый элемент
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      return data;
    },
    enabled: !!number,
  });
};

// Хук для создания детальной цистерны
export const useCreateRailwayCisternDetailed = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateRailwayCisternDetailedRequest) => 
      railwayCisternsApi.createRailwayCisternDetailed(data),
    onSuccess: () => {
      // Обновляем все запросы железнодорожных цистерн
      queryClient.invalidateQueries({ queryKey: railwayCisternsKeys.all });
    },
  });
};

// Функция для проверки активных фильтров
const hasActiveFilters = (filters: CisternFilter): boolean => {
  return Object.keys(filters).some(key => {
    const value = filters[key as keyof CisternFilter];
    const isActive = value !== undefined && value !== null && 
           (Array.isArray(value) ? value.length > 0 : true);
    return isActive;
  });
};

// Хук для поиска цистерн с фильтрами (серверная фильтрация)
export const useSearchRailwayCisterns = (filters: CisternFilter) => {
  return useQuery({
    queryKey: [...railwayCisternsKeys.all, 'search', JSON.stringify(filters)], // Используем JSON для более точного кеширования
    queryFn: async () => {
      const response = await railwayCisternsApi.searchRailwayCisterns(filters);
      // Проверяем, что именно вернул API
      if (Array.isArray(response.data)) {
        // Если API вернул прямо массив, создаем объект с нужной структурой
        return {
          railwayCisterns: response.data,
          totalCount: response.data.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: response.data.length
        };
      }
      return response.data;
    },
    enabled: hasActiveFilters(filters), // Выполняем запрос только если есть активные фильтры
    staleTime: 0, // Всегда считать данные устаревшими
    gcTime: 0, // Не кешировать данные (в новых версиях React Query)
  });
};
