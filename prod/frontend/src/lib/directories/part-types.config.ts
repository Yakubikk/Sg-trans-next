"use client";

import { DirectoryConfig } from './types';

export const partTypesConfig: DirectoryConfig = {
  name: 'partTypes',
  endpoint: 'part-types',
  displayName: 'Типы деталей',
  description: 'Справочник типов деталей',
  fields: [
    {
      key: 'name',
      label: 'Название',
      type: 'text',
      required: true,
      placeholder: 'Введите название типа детали',
    },
    {
      key: 'description',
      label: 'Описание',
      type: 'textarea',
      placeholder: 'Введите описание',
    },
  ],
};
