"use client";

import { DirectoryConfig } from './types';

export const repairTypesConfig: DirectoryConfig = {
  name: 'repairTypes',
  endpoint: 'repair-types',
  displayName: 'Типы ремонта',
  description: 'Справочник типов ремонта',
  fields: [
    {
      key: 'name',
      label: 'Название',
      type: 'text',
      required: true,
      placeholder: 'Введите название типа ремонта',
    },
    {
      key: 'description',
      label: 'Описание',
      type: 'textarea',
      placeholder: 'Введите описание',
    },
  ],
};
