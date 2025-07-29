// Типы для владельцев
export interface OwnerEntity {
  id: string;
  name: string;
  unp: string | null;
  shortName: string;
  address: string;
  treatRepairs: boolean;
  createdAt: string;
  updatedAt: string;
}

// Запросы для создания и обновления владельцев
export interface CreateOwnerRequest {
  name: string;
  unp?: string;
  shortName: string;
  address: string;
  treatRepairs: boolean;
}

export type UpdateOwnerRequest = Partial<CreateOwnerRequest>;

export interface OwnerQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Утилитарные функции
export const getOwnerDisplayName = (owner: OwnerEntity): string => {
  return `${owner.name}${owner.shortName ? ` (${owner.shortName})` : ''}`;
};
