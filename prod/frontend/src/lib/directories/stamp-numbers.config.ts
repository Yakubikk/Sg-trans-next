"use client";

import { Hash } from "lucide-react";
import type { StampNumberDTO, CreateStampNumberDTO, UpdateStampNumberDTO } from "@/types/directories";
import type { DirectoryConfig } from "@/components/directory-manager";
import { DirectoryConfig as BaseDirectoryConfig } from "./types";
import { 
  useStampNumbers,
  useCreateStampNumber,
  useUpdateStampNumber,
  useDeleteStampNumber
} from "@/hooks/useDirectories";

// Базовая конфигурация полей
export const stampNumbersBaseConfig: BaseDirectoryConfig = {
  name: 'stampNumbers',
  displayName: 'Номера клейм',
  description: 'Справочник номеров клейм',
  endpoint: '/api/stamp-numbers',
  fields: [
    {
      key: 'number',
      label: 'Номер клейма',
      type: 'text',
      required: true,
      placeholder: 'Введите номер клейма',
    },
    {
      key: 'description',
      label: 'Описание',
      type: 'textarea',
      required: false,
      placeholder: 'Введите описание клейма',
    },
  ],
};

// Полная конфигурация для DirectoryManager
export const stampNumbersConfig: DirectoryConfig<StampNumberDTO, CreateStampNumberDTO, UpdateStampNumberDTO> = {
  title: stampNumbersBaseConfig.displayName,
  description: stampNumbersBaseConfig.description,
  icon: Hash,
  fields: stampNumbersBaseConfig.fields.map((field) => ({
    key: field.key,
    label: field.label,
    type: field.type === "boolean" || field.type === "select" || field.type === "textarea" ? "text" : field.type,
    required: field.required,
    placeholder: field.placeholder,
  })),
  hooks: {
    useGetAll: useStampNumbers,
    useCreate: useCreateStampNumber,
    useUpdate: useUpdateStampNumber,
    useDelete: useDeleteStampNumber,
  },
  searchFields: ["number", "description"] as (keyof StampNumberDTO)[],
  tableColumns: [
    { key: "number", label: "Номер клейма" },
    { key: "description", label: "Описание" },
  ],
  createInitialData: () => ({ number: "", description: "" }),
  mapToFormData: (item: StampNumberDTO) => ({
    number: item.number,
    description: item.description || "",
  }),
};
