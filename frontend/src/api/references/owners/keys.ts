import type { OwnerQueryParams } from './types';

// Query keys для владельцев
export const ownersKeys = {
  all: ['owners'] as const,
  lists: () => [...ownersKeys.all, 'list'] as const,
  list: (filters: OwnerQueryParams) => [...ownersKeys.lists(), { filters }] as const,
  details: () => [...ownersKeys.all, 'detail'] as const,
  detail: (id: string) => [...ownersKeys.details(), id] as const,
} as const;
