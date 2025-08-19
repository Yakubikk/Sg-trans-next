"use client";

import { DirectoryConfig } from './types';

export const registrarsConfig: DirectoryConfig = {
  name: 'registrars',
  endpoint: 'registrars',
  displayName: 'Регистраторы',
  description: 'Справочник регистраторов',
  fields: [
    {
      key: 'name',
      label: 'Название',
      type: 'text',
      required: true,
      placeholder: 'Введите название регистратора',
    },
    {
      key: 'code',
      label: 'Код',
      type: 'text',
      placeholder: 'Введите код',
    },
  ],
};
