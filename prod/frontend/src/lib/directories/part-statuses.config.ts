"use client";

import { DirectoryConfig } from './types';

export const partStatusesConfig: DirectoryConfig = {
  name: 'partStatuses',
  endpoint: 'part-statuses',
  displayName: 'Статусы деталей',
  description: 'Справочник статусов деталей',
  fields: [
    {
      key: 'name',
      label: 'Название',
      type: 'text',
      required: true,
      placeholder: 'Введите название статуса',
    },
    {
      key: 'color',
      label: 'Цвет',
      type: 'text',
      placeholder: 'Введите цвет (hex)',
    },
  ],
};
