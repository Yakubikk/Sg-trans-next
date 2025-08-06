import { createApiInstance } from "@/api/core/apiInstance";
import { makeRequest } from "@/api/core/requestHandler";
import { API_CONFIG } from "@/config/api";
import type { SavedFilter, CreateSavedFilterRequest, UpdateSavedFilterRequest } from "./types";

const apiInstance = createApiInstance({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.references.timeout,
});

// API для работы с сохранёнными фильтрами
export const savedFiltersApi = {
  // Получить все сохранённые фильтры
  getAll: () => 
    makeRequest<SavedFilter[]>(apiInstance, "get", "/saved-filters"),

  // Получить фильтр по ID
  getById: (id: string) =>
    makeRequest<SavedFilter>(apiInstance, "get", `/saved-filters/${id}`),

  // Создать новый фильтр
  create: (data: CreateSavedFilterRequest) =>
    makeRequest<SavedFilter>(apiInstance, "post", "/saved-filters", data),

  // Обновить фильтр
  update: (id: string, data: UpdateSavedFilterRequest) =>
    makeRequest<SavedFilter>(apiInstance, "put", `/saved-filters/${id}`, data),

  // Удалить фильтр
  delete: (id: string) =>
    makeRequest<void>(apiInstance, "delete", `/saved-filters/${id}`),
};
