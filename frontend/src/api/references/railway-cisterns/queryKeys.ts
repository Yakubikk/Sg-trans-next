// Query keys для железнодорожных цистерн
export const railwayCisternsKeys = {
  all: ["railway-cisterns"] as const,
  lists: () => [...railwayCisternsKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) => [...railwayCisternsKeys.lists(), { filters }] as const,
  details: () => [...railwayCisternsKeys.all, "detail"] as const,
  detail: (id: string) => [...railwayCisternsKeys.details(), id] as const,
  byNumber: (number: string) => [...railwayCisternsKeys.all, "by-number", number] as const,
} as const;
