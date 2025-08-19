"use client";

import { User } from 'lucide-react';
import {
  useOwners,
  useCreateOwner,
  useUpdateOwner,
  useDeleteOwner,
} from '@/hooks/useDirectories';
import type {
  OwnerDTO,
  CreateOwnerDTO,
  UpdateOwnerDTO,
} from '@/types/directories';
import type { DirectoryConfig } from '@/components/directory-manager';
import { DirectoryConfig as BaseDirectoryConfig } from './types';

// Базовая конфигурация полей
export const ownersBaseConfig: BaseDirectoryConfig = {
  name: 'owners',
  endpoint: 'owners',
  displayName: 'Собственники',
  description: 'Справочник собственников',
  fields: [
    {
      key: 'name',
      label: 'Название',
      type: 'text',
      required: true,
      placeholder: 'Введите название организации',
    },
    {
      key: 'shortName',
      label: 'Краткое название',
      type: 'text',
      required: true,
      placeholder: 'Введите краткое название',
    },
    {
      key: 'unp',
      label: 'УНП',
      type: 'text',
      required: true,
      placeholder: 'Введите УНП',
    },
    {
      key: 'address',
      label: 'Адрес',
      type: 'textarea',
      required: true,
      placeholder: 'Введите адрес',
    },
    {
      key: 'treatRepairs',
      label: 'Выполняет ремонт',
      type: 'boolean',
    },
  ],
};

// Конфигурация для DirectoryManager
export const ownersConfig: DirectoryConfig<
  OwnerDTO,
  CreateOwnerDTO,
  UpdateOwnerDTO
> = {
  title: ownersBaseConfig.displayName,
  description: ownersBaseConfig.description,
  icon: User,
  fields: ownersBaseConfig.fields.map(field => ({
    key: field.key,
    label: field.label,
    type: field.type === 'boolean' || field.type === 'select' || field.type === 'textarea' ? 'text' : field.type,
    required: field.required,
    placeholder: field.placeholder,
  })),
  hooks: {
    useGetAll: useOwners,
    useCreate: useCreateOwner,
    useUpdate: useUpdateOwner,
    useDelete: useDeleteOwner,
  },
  searchFields: ['name', 'shortName', 'unp'] as (keyof OwnerDTO)[],
  tableColumns: [
    { key: 'name', label: 'Название' },
    { key: 'shortName', label: 'Краткое название' },
    { key: 'unp', label: 'УНП' },
    { key: 'address', label: 'Адрес' },
    { 
      key: 'treatRepairs', 
      label: 'Выполняет ремонт',
      render: (value: unknown) => value ? 'Да' : 'Нет'
    },
  ],
  createInitialData: () => ({ 
    name: '', 
    shortName: '', 
    unp: '', 
    address: '', 
    treatRepairs: false 
  }),
  mapToFormData: (item: OwnerDTO) => ({ 
    name: item.name, 
    shortName: item.shortName, 
    unp: item.unp, 
    address: item.address, 
    treatRepairs: item.treatRepairs 
  }),
};
