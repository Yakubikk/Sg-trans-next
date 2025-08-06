import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { savedFiltersApi } from "@/api/references";
import type { CreateSavedFilterRequest, UpdateSavedFilterRequest } from "@/api/references";

// Ключи для кеширования
export const savedFiltersQueryKeys = {
  all: ["saved-filters"] as const,
  byId: (id: string) => ["saved-filters", id] as const,
};

// Хук для получения всех сохранённых фильтров
export function useSavedFilters() {
  return useQuery({
    queryKey: savedFiltersQueryKeys.all,
    queryFn: async () => {
      const response = await savedFiltersApi.getAll();
      if (!response.success) {
        throw new Error(response.message || "Ошибка при загрузке фильтров");
      }
      return response.data;
    },
  });
}

// Хук для получения фильтра по ID
export function useSavedFilter(id: string) {
  return useQuery({
    queryKey: savedFiltersQueryKeys.byId(id),
    queryFn: async () => {
      const response = await savedFiltersApi.getById(id);
      if (!response.success) {
        throw new Error(response.message || "Ошибка при загрузке фильтра");
      }
      return response.data;
    },
    enabled: !!id,
  });
}

// Хук для создания фильтра
export function useCreateSavedFilter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSavedFilterRequest) => {
      const response = await savedFiltersApi.create(data);
      if (!response.success) {
        throw new Error(response.message || "Ошибка при создании фильтра");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: savedFiltersQueryKeys.all });
    },
  });
}

// Хук для обновления фильтра
export function useUpdateSavedFilter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateSavedFilterRequest }) => {
      const response = await savedFiltersApi.update(id, data);
      if (!response.success) {
        throw new Error(response.message || "Ошибка при обновлении фильтра");
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: savedFiltersQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: savedFiltersQueryKeys.byId(data.id) });
    },
  });
}

// Хук для удаления фильтра
export function useDeleteSavedFilter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await savedFiltersApi.delete(id);
      if (!response.success) {
        throw new Error(response.message || "Ошибка при удалении фильтра");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: savedFiltersQueryKeys.all });
    },
  });
}
