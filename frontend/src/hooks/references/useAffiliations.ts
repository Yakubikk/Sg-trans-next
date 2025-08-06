import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { affiliationsApi } from "@/api/references";
import type { CreateAffiliationReferenceRequest, UpdateAffiliationReferenceRequest } from "@/api/references";

// Ключи для кеширования
export const affiliationReferencesQueryKeys = {
  all: ["affiliation-references"] as const,
  byId: (id: string) => ["affiliation-references", id] as const,
};

// Хук для получения всех принадлежностей (справочник)
export function useAffiliations() {
  return useQuery({
    queryKey: affiliationReferencesQueryKeys.all,
    queryFn: async () => {
      const response = await affiliationsApi.getAll();
      if (!response.success) {
        throw new Error(response.message || "Ошибка при загрузке принадлежностей");
      }
      return response.data;
    },
  });
}

// Хук для получения принадлежности по ID
export function useAffiliation(id: string) {
  return useQuery({
    queryKey: affiliationReferencesQueryKeys.byId(id),
    queryFn: async () => {
      const response = await affiliationsApi.getById(id);
      if (!response.success) {
        throw new Error(response.message || "Ошибка при загрузке принадлежности");
      }
      return response.data;
    },
    enabled: !!id,
  });
}

// Хук для создания принадлежности
export function useCreateAffiliation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAffiliationReferenceRequest) => {
      const response = await affiliationsApi.create(data);
      if (!response.success) {
        throw new Error(response.message || "Ошибка при создании принадлежности");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: affiliationReferencesQueryKeys.all });
    },
  });
}

// Хук для обновления принадлежности
export function useUpdateAffiliation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateAffiliationReferenceRequest }) => {
      const response = await affiliationsApi.update(id, data);
      if (!response.success) {
        throw new Error(response.message || "Ошибка при обновлении принадлежности");
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: affiliationReferencesQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: affiliationReferencesQueryKeys.byId(data.id) });
    },
  });
}

// Хук для удаления принадлежности
export function useDeleteAffiliation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await affiliationsApi.delete(id);
      if (!response.success) {
        throw new Error(response.message || "Ошибка при удалении принадлежности");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: affiliationReferencesQueryKeys.all });
    },
  });
}
