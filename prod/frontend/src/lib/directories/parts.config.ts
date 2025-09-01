"use client";

import { DirectoryConfig as BaseDirectoryConfig } from "./types";

// Базовая конфигурация полей для деталей
export const partsBaseConfig: BaseDirectoryConfig = {
  name: "parts",
  endpoint: "parts",
  displayName: "Детали",
  description: "Справочник деталей железнодорожных цистерн",
  fields: [
    {
      key: "partType",
      label: "Тип детали",
      type: "select",
      required: true,
      placeholder: "Выберите тип детали",
    },
    {
      key: "stampNumber",
      label: "Номер клейма",
      type: "select",
      required: true,
      placeholder: "Выберите номер клейма",
    },
    {
      key: "serialNumber",
      label: "Серийный номер",
      type: "text",
      required: false,
      placeholder: "Введите серийный номер",
    },
    {
      key: "manufactureYear",
      label: "Год производства",
      type: "number",
      required: false,
      placeholder: "Введите год производства",
    },
    {
      key: "currentLocation",
      label: "Текущее местоположение",
      type: "text",
      required: false,
      placeholder: "Введите текущее местоположение",
    },
    {
      key: "status",
      label: "Статус",
      type: "select",
      required: true,
      placeholder: "Выберите статус",
    },
    {
      key: "depot",
      label: "Депо",
      type: "select",
      required: false,
      placeholder: "Выберите депо",
    },
    {
      key: "notes",
      label: "Примечания",
      type: "textarea",
      required: false,
      placeholder: "Введите примечания",
    },
  ],
};

// Примечание: Детали имеют сложную структуру с различными типами (колесные пары, боковые рамы и т.д.)
// Поэтому для них используется специальный компонент PartsPage вместо стандартного DirectoryManager
// Эта конфигурация предоставлена для справки и будущего использования
