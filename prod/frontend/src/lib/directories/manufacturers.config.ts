"use client";

import { Factory } from "lucide-react";
import {
  useManufacturers,
  useCreateManufacturer,
  useUpdateManufacturer,
  useDeleteManufacturer,
} from "@/hooks";
import type { ManufacturerDTO, CreateManufacturerDTO, UpdateManufacturerDTO } from "@/types/directories";
import type { DirectoryConfig } from "@/components/directory-manager";
import { DirectoryConfig as BaseDirectoryConfig } from "./types";

// Базовая конфигурация полей
export const manufacturersBaseConfig: BaseDirectoryConfig = {
  name: "manufacturers",
  endpoint: "manufacturers",
  displayName: "Производители",
  description: "Справочник производителей",
  fields: [
    {
      key: "name",
      label: "Название",
      type: "text",
      required: true,
      placeholder: "Введите название производителя",
    },
    {
      key: "shortName",
      label: "Краткое название",
      type: "text",
      required: true,
      placeholder: "Введите краткое название",
    },
    {
      key: "country",
      label: "Страна",
      type: "text",
      required: true,
      placeholder: "Введите страну",
    },
    {
      key: "code",
      label: "Код",
      type: "number",
      required: true,
      placeholder: "Введите код",
      validation: { min: 1 },
    },
  ],
};

// Конфигурация для DirectoryManager
export const manufacturersConfig: DirectoryConfig<ManufacturerDTO, CreateManufacturerDTO, UpdateManufacturerDTO> = {
  title: manufacturersBaseConfig.displayName,
  description: manufacturersBaseConfig.description,
  icon: Factory,
  fields: manufacturersBaseConfig.fields.map((field) => ({
    key: field.key,
    label: field.label,
    type: field.type === "boolean" || field.type === "select" || field.type === "textarea" ? "text" : field.type,
    required: field.required,
    placeholder: field.placeholder,
  })),
  hooks: {
    useGetAll: useManufacturers,
    useCreate: useCreateManufacturer,
    useUpdate: useUpdateManufacturer,
    useDelete: useDeleteManufacturer,
  },
  searchFields: ["name", "shortName", "country"] as (keyof ManufacturerDTO)[],
  tableColumns: [
    { key: "name", label: "Название" },
    { key: "shortName", label: "Краткое название" },
    { key: "country", label: "Страна" },
    { key: "code", label: "Код" },
  ],
  createInitialData: () => ({ name: "", shortName: "", country: "", code: 0 }),
  mapToFormData: (item: ManufacturerDTO) => ({
    name: item.name,
    shortName: item.shortName,
    country: item.country,
    code: item.code,
  }),
};
