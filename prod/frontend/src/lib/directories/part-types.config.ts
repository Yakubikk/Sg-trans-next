"use client";

import { Settings } from "lucide-react";
import {
  usePartTypes,
  useCreatePartType,
  useUpdatePartType,
  useDeletePartType,
} from "@/hooks/useDirectories";
import type { PartTypeDTO, CreatePartTypeDTO, UpdatePartTypeDTO } from "@/types/directories";
import type { DirectoryConfig } from "@/components/directory-manager";
import { DirectoryConfig as BaseDirectoryConfig } from "./types";

// Базовая конфигурация полей
export const partTypesBaseConfig: BaseDirectoryConfig = {
  name: "partTypes",
  endpoint: "part-types",
  displayName: "Типы деталей",
  description: "Справочник типов деталей",
  fields: [
    {
      key: "name",
      label: "Название",
      type: "text",
      required: true,
      placeholder: "Введите название типа детали",
    },
    {
      key: "description",
      label: "Описание",
      type: "textarea",
      required: false,
      placeholder: "Введите описание",
    },
  ],
};

// Конфигурация для DirectoryManager
export const partTypesConfig: DirectoryConfig<PartTypeDTO, CreatePartTypeDTO, UpdatePartTypeDTO> = {
  title: partTypesBaseConfig.displayName,
  description: partTypesBaseConfig.description,
  icon: Settings,
  fields: partTypesBaseConfig.fields.map((field) => ({
    key: field.key,
    label: field.label,
    type: field.type === "boolean" || field.type === "select" || field.type === "textarea" ? "text" : field.type,
    required: field.required,
    placeholder: field.placeholder,
  })),
  hooks: {
    useGetAll: usePartTypes,
    useCreate: useCreatePartType,
    useUpdate: useUpdatePartType,
    useDelete: useDeletePartType,
  },
  searchFields: ["name", "description"] as (keyof PartTypeDTO)[],
  tableColumns: [
    { key: "name", label: "Название" },
    { key: "description", label: "Описание" },
  ],
  createInitialData: () => ({ name: "", description: "" }),
  mapToFormData: (item: PartTypeDTO) => ({
    name: item.name,
    description: item.description,
  }),
};
