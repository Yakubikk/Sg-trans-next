"use client";

import { DirectoryConfig } from './types';

export const locationsConfig: DirectoryConfig = {
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
      placeholder: 'Введите код',
    },
  ],
};
