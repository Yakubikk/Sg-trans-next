"use client";

import { FileText } from "lucide-react";
import {
  useRegistrars,
  useCreateRegistrar,
  useUpdateRegistrar,
  useDeleteRegistrar,
} from "@/hooks";
import type { RegistrarDTO, CreateRegistrarDTO, UpdateRegistrarDTO } from "@/types/directories";
import type { DirectoryConfig } from "@/components/directory-manager";
import { DirectoryConfig as BaseDirectoryConfig } from "./types";

// Базовая конфигурация полей
export const registrarsBaseConfig: BaseDirectoryConfig = {
  name: "registrars",
  endpoint: "registrars",
  displayName: "Регистраторы",
  description: "Справочник регистраторов",
  fields: [
    {
      key: "name",
      label: "Название",
      type: "text",
      required: true,
      placeholder: "Введите название регистратора",
    },
    {
      key: "code",
      label: "Код",
      type: "text",
      required: false,
      placeholder: "Введите код",
    },
  ],
};

// Конфигурация для DirectoryManager
export const registrarsConfig: DirectoryConfig<RegistrarDTO, CreateRegistrarDTO, UpdateRegistrarDTO> = {
  title: registrarsBaseConfig.displayName,
  description: registrarsBaseConfig.description,
  icon: FileText,
  fields: registrarsBaseConfig.fields.map((field) => ({
    key: field.key,
    label: field.label,
    type: field.type === "boolean" || field.type === "select" || field.type === "textarea" ? "text" : field.type,
    required: field.required,
    placeholder: field.placeholder,
  })),
  hooks: {
    useGetAll: useRegistrars,
    useCreate: useCreateRegistrar,
    useUpdate: useUpdateRegistrar,
    useDelete: useDeleteRegistrar,
  },
  searchFields: ["name", "code"] as (keyof RegistrarDTO)[],
  tableColumns: [
    { key: "name", label: "Название" },
    { key: "code", label: "Код" },
  ],
  createInitialData: () => ({ name: "", code: "" }),
  mapToFormData: (item: RegistrarDTO) => ({
    name: item.name,
    code: item.code,
  }),
};
