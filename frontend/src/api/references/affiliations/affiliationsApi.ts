import { createApiInstance } from "@/api/core/apiInstance";
import { makeRequest } from "@/api/core/requestHandler";
import { API_CONFIG } from "@/config/api";
import type { AffiliationReference, CreateAffiliationReferenceRequest, UpdateAffiliationReferenceRequest } from "./types";

const apiInstance = createApiInstance({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.references.timeout,
});

// API для работы с принадлежностью
export const affiliationsApi = {
  // Получить все принадлежности
  getAll: () =>
    makeRequest<AffiliationReference[]>(apiInstance, "get", "/affiliations"),

  // Получить принадлежность по ID
  getById: (id: string) =>
    makeRequest<AffiliationReference>(apiInstance, "get", `/affiliations/${id}`),

  // Создать принадлежность
  create: (data: CreateAffiliationReferenceRequest) =>
    makeRequest<AffiliationReference>(apiInstance, "post", "/affiliations", data),

  // Обновить принадлежность
  update: (id: string, data: UpdateAffiliationReferenceRequest) =>
    makeRequest<AffiliationReference>(apiInstance, "put", `/affiliations/${id}`, data),

  // Удалить принадлежность
  delete: (id: string) =>
    makeRequest<void>(apiInstance, "delete", `/affiliations/${id}`),
};
