"use client";

import { Wrench } from "lucide-react";
import {
  useRepairTypes,
  useCreateRepairType,
  useUpdateRepairType,
  useDeleteRepairType,
} from "@/hooks/useDirectories";
import type { RepairTypeDTO, CreateRepairTypeDTO, UpdateRepairTypeDTO } from "@/types/directories";
import type { DirectoryConfig } from "@/components/directory-manager";
import { DirectoryConfig as BaseDirectoryConfig } from "./types";

// Базовая конфигурация полей
export const repairTypesBaseConfig: BaseDirectoryConfig = {
  name: "repairTypes",
  endpoint: "repair-types",
  displayName: "Типы ремонта",
  description: "Справочник типов ремонта",
  fields: [
    {
      key: "name",
      label: "Название",
      type: "text",
      required: true,
      placeholder: "Введите название типа ремонта",
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
export const repairTypesConfig: DirectoryConfig<RepairTypeDTO, CreateRepairTypeDTO, UpdateRepairTypeDTO> = {
  title: repairTypesBaseConfig.displayName,
  description: repairTypesBaseConfig.description,
  icon: Wrench,
  fields: repairTypesBaseConfig.fields.map((field) => ({
    key: field.key,
    label: field.label,
    type: field.type === "boolean" || field.type === "select" || field.type === "textarea" ? "text" : field.type,
    required: field.required,
    placeholder: field.placeholder,
  })),
  hooks: {
    useGetAll: useRepairTypes,
    useCreate: useCreateRepairType,
    useUpdate: useUpdateRepairType,
    useDelete: useDeleteRepairType,
  },
  searchFields: ["name", "description"] as (keyof RepairTypeDTO)[],
  tableColumns: [
    { key: "name", label: "Название" },
    { key: "description", label: "Описание" },
  ],
  createInitialData: () => ({ name: "", description: "" }),
  mapToFormData: (item: RepairTypeDTO) => ({
    name: item.name,
    description: item.description,
  }),
};
