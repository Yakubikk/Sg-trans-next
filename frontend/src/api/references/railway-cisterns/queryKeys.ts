// Query keys для железнодорожных цистерн
export const railwayCisternsKeys = {
  all: ['railway-cisterns'] as const,
  base: () => [...railwayCisternsKeys.all] as const,
  lists: () => [...railwayCisternsKeys.all, 'list'] as const,
  list: () => [...railwayCisternsKeys.lists()] as const,
  details: () => [...railwayCisternsKeys.all, 'detail'] as const,
  detail: (id: string) => [...railwayCisternsKeys.details(), id] as const,
  byNumber: (number: string) => [...railwayCisternsKeys.all, 'by-number', number] as const,
} as const;
