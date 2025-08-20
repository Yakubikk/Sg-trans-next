"use client";

import { DirectoryConfig } from './types';

export const filterTypesConfig: DirectoryConfig = {
  name: 'filterTypes',
  endpoint: 'filter-types',
  displayName: 'Типы фильтров',
  description: 'Справочник типов фильтров',
  fields: [
    {
      key: 'name',
      label: 'Название',
      type: 'text',
      required: true,
      placeholder: 'Введите название типа фильтра',
    },
    {
      key: 'description',
      label: 'Описание',
      type: 'textarea',
      placeholder: 'Введите описание',
    },
  ],
};
