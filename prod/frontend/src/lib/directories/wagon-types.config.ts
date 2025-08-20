"use client";

import { Train } from "lucide-react";
import {
  useWagonTypes,
  useCreateWagonType,
  useUpdateWagonType,
  useDeleteWagonType,
} from "@/hooks/useDirectories";
import type { WagonTypeDTO, CreateWagonTypeDTO, UpdateWagonTypeDTO } from "@/types/directories";
import type { DirectoryConfig } from "@/components/directory-manager";
import { DirectoryConfig as BaseDirectoryConfig } from "./types";

// Базовая конфигурация полей
export const wagonTypesBaseConfig: BaseDirectoryConfig = {
  name: 'wagonTypes',
  endpoint: 'wagon-types',
  displayName: 'Типы вагонов',
  description: 'Справочник типов вагонов',
  fields: [
    {
      key: 'name',
      label: 'Название',
      type: 'text',
      required: true,
      placeholder: 'Введите название типа',
    },
    {
      key: 'type',
      label: 'Тип',
      type: 'text',
      required: true,
      placeholder: 'Введите тип',
    },
  ],
};

// Конфигурация для DirectoryManager
export const wagonTypesConfig: DirectoryConfig<WagonTypeDTO, CreateWagonTypeDTO, UpdateWagonTypeDTO> = {
  title: wagonTypesBaseConfig.displayName,
  description: wagonTypesBaseConfig.description,
  icon: Train,
  fields: wagonTypesBaseConfig.fields.map((field) => ({
    key: field.key,
    label: field.label,
    type: field.type === "boolean" || field.type === "select" || field.type === "textarea" ? "text" : field.type,
    required: field.required,
    placeholder: field.placeholder,
  })),
  hooks: {
    useGetAll: useWagonTypes,
    useCreate: useCreateWagonType,
    useUpdate: useUpdateWagonType,
    useDelete: useDeleteWagonType,
  },
  searchFields: ["name", "type"] as (keyof WagonTypeDTO)[],
  tableColumns: [
    { key: "name", label: "Название" },
    { key: "type", label: "Тип" },
  ],
  createInitialData: () => ({ name: "", type: "" }),
  mapToFormData: (item: WagonTypeDTO) => ({
    name: item.name,
    type: item.type,
  }),
};
