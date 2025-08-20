"use client";

import { Building2 } from "lucide-react";
import {
  useAffiliations,
  useCreateAffiliation,
  useUpdateAffiliation,
  useDeleteAffiliation,
} from "@/hooks/useDirectories";
import type { AffiliationDTO, CreateAffiliationDTO, UpdateAffiliationDTO } from "@/types/directories";
import type { DirectoryConfig } from "@/components/directory-manager";
import { DirectoryConfig as BaseDirectoryConfig } from "./types";

// Базовая конфигурация полей
export const affiliationsBaseConfig: BaseDirectoryConfig = {
  name: "affiliations",
  endpoint: "affiliations",
  displayName: "Принадлежность",
  description: "Справочник принадлежности",
  fields: [
    {
      key: "value",
      label: "Значение",
      type: "text",
      required: true,
      placeholder: "Введите значение принадлежности",
    },
  ],
};

// Конфигурация для DirectoryManager
export const affiliationsConfig: DirectoryConfig<AffiliationDTO, CreateAffiliationDTO, UpdateAffiliationDTO> = {
  title: affiliationsBaseConfig.displayName,
  description: affiliationsBaseConfig.description,
  icon: Building2,
  fields: affiliationsBaseConfig.fields.map((field) => ({
    key: field.key,
    label: field.label,
    type: field.type === "boolean" || field.type === "select" || field.type === "textarea" ? "text" : field.type,
    required: field.required,
    placeholder: field.placeholder,
  })),
  hooks: {
    useGetAll: useAffiliations,
    useCreate: useCreateAffiliation,
    useUpdate: useUpdateAffiliation,
    useDelete: useDeleteAffiliation,
  },
  searchFields: ["value"] as (keyof AffiliationDTO)[],
  tableColumns: [{ key: "value", label: "Значение" }],
  createInitialData: () => ({ value: "" }),
  mapToFormData: (item: AffiliationDTO) => ({ value: item.value }),
};
