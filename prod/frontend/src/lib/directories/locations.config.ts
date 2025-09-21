"use client";

import { MapPin } from "lucide-react";
import {
  useLocations,
  useCreateLocation,
  useUpdateLocation,
  useDeleteLocation,
} from "@/hooks";
import type { LocationDTO, CreateLocationDTO, UpdateLocationDTO } from "@/types/directories";
import type { DirectoryConfig } from "@/components/directory-manager";
import { DirectoryConfig as BaseDirectoryConfig } from "./types";

// Базовая конфигурация полей
export const locationsBaseConfig: BaseDirectoryConfig = {
  name: 'locations',
  endpoint: 'locations',
  displayName: 'Местоположения',
  description: 'Справочник местоположений',
  fields: [
    {
      key: 'name',
      label: 'Название',
      type: 'text',
      required: true,
      placeholder: 'Введите название местоположения',
    },
    {
      key: 'code',
      label: 'Код',
      type: 'text',
      required: false,
      placeholder: 'Введите код',
    },
  ],
};

// Конфигурация для DirectoryManager
export const locationsConfig: DirectoryConfig<LocationDTO, CreateLocationDTO, UpdateLocationDTO> = {
  title: locationsBaseConfig.displayName,
  description: locationsBaseConfig.description,
  icon: MapPin,
  fields: locationsBaseConfig.fields.map((field) => ({
    key: field.key,
    label: field.label,
    type: field.type === "boolean" || field.type === "select" || field.type === "textarea" ? "text" : field.type,
    required: field.required,
    placeholder: field.placeholder,
  })),
  hooks: {
    useGetAll: useLocations,
    useCreate: useCreateLocation,
    useUpdate: useUpdateLocation,
    useDelete: useDeleteLocation,
  },
  searchFields: ["name", "code"] as (keyof LocationDTO)[],
  tableColumns: [
    { key: "name", label: "Название" },
    { key: "code", label: "Код" },
  ],
  createInitialData: () => ({ name: "", code: "" }),
  mapToFormData: (item: LocationDTO) => ({
    name: item.name,
    code: item.code,
  }),
};
