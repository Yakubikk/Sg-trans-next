import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

interface ApiMethods<T, CreateT = Omit<T, 'id'>, UpdateT = Partial<T>> {
  getAll: () => Promise<ApiResponse<T[]>>;
  getById: (id: string) => Promise<ApiResponse<T>>;
  create: (data: CreateT) => Promise<ApiResponse<T>>;
  update: (id: string, data: UpdateT) => Promise<ApiResponse<T>>;
  delete: (id: string) => Promise<ApiResponse<void>>;
  search?: (query: string | number) => Promise<ApiResponse<T[]>>;
}

interface QueryKeys {
  all: readonly string[];
  lists: () => readonly string[];
  details: () => readonly string[];
  detail: (id: string) => readonly string[];
}

/**
 * Универсальный хук для CRUD операций
 * Устраняет дублирование кода между хуками для разных сущностей
 */
export function createGenericCRUD<T, CreateT = Omit<T, 'id'>, UpdateT = Partial<T>>(
  queryKeys: QueryKeys,
  apiMethods: ApiMethods<T, CreateT, UpdateT>
) {
  // Получение списка
  const useList = () => useQuery({
    queryKey: queryKeys.lists(),
    queryFn: async () => {
      const response = await apiMethods.getAll();
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Получение по ID
  const useDetail = (id: string) => useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: async () => {
      const response = await apiMethods.getById(id);
      return response.data;
    },
    enabled: !!id,
  });

  // Создание
  const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: apiMethods.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      },
    });
  };

  // Обновление
  const useUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateT }) =>
        apiMethods.update(id, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      },
    });
  };

  // Удаление
  const useDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: apiMethods.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      },
    });
  };

  // Поиск (опционально)
  const useSearch = (query: string | number) => useQuery({
    queryKey: [...queryKeys.all, 'search', query],
    queryFn: async () => {
      if (!apiMethods.search) return [];
      const response = await apiMethods.search(query);
      return response.data || [];
    },
    enabled: !!query && !!apiMethods.search,
  });

  return {
    useList,
    useDetail,
    useCreate,
    useUpdate,
    useDelete,
    useSearch: apiMethods.search ? useSearch : undefined,
  };
}
