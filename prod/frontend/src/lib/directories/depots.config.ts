"use client";

import { Warehouse } from 'lucide-react';
import {
  useDepots,
  useCreateDepot,
  useUpdateDepot,
  useDeleteDepot,
} from '@/hooks/useDirectories';
import type {
  DepotDTO,
  CreateDepotDTO,
  UpdateDepotDTO,
} from '@/types/directories';
import type { DirectoryConfig } from '@/components/directory-manager';
import { DirectoryConfig as BaseDirectoryConfig } from './types';

// Базовая конфигурация полей
export const depotsBaseConfig: BaseDirectoryConfig = {
  name: 'depots',
  endpoint: 'depots',
  displayName: 'Депо',
  description: 'Справочник депо',
  fields: [
    {
      key: 'name',
      label: 'Название',
      type: 'text',
      required: true,
      placeholder: 'Введите название депо',
    },
    {
      key: 'code',
      label: 'Код',
      type: 'text',
      required: true,
      placeholder: 'Введите код депо',
    },
    {
      key: 'location',
      label: 'Местоположение',
      type: 'text',
      placeholder: 'Введите местоположение',
    },
  ],
};

// Конфигурация для DirectoryManager
export const depotsConfig: DirectoryConfig<
  DepotDTO,
  CreateDepotDTO,
  UpdateDepotDTO
> = {
  title: depotsBaseConfig.displayName,
  description: depotsBaseConfig.description,
  icon: Warehouse,
  fields: depotsBaseConfig.fields.map(field => ({
    key: field.key,
    label: field.label,
    type: field.type === 'boolean' || field.type === 'select' || field.type === 'textarea' ? 'text' : field.type,
    required: field.required,
    placeholder: field.placeholder,
  })),
  hooks: {
    useGetAll: useDepots,
    useCreate: useCreateDepot,
    useUpdate: useUpdateDepot,
    useDelete: useDeleteDepot,
  },
  searchFields: ['name', 'code', 'location'] as (keyof DepotDTO)[],
  tableColumns: [
    { key: 'name', label: 'Название' },
    { key: 'code', label: 'Код' },
    { key: 'location', label: 'Местоположение' },
  ],
  createInitialData: () => ({ name: '', code: '', location: '' }),
  mapToFormData: (item: DepotDTO) => ({ 
    name: item.name, 
    code: item.code, 
    location: item.location || '' 
  }),
};
