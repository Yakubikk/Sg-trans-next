"use client";

import { DirectoryConfig } from './types';

export const wagonTypesConfig: DirectoryConfig = {
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
