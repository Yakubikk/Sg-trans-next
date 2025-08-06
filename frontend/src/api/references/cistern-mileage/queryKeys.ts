// Query keys для пробегов цистерн
export const cisternMileageKeys = {
  all: ["cistern-mileage"] as const,
  lists: () => [...cisternMileageKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) => [...cisternMileageKeys.lists(), { filters }] as const,
  details: () => [...cisternMileageKeys.all, "detail"] as const,
  detail: (id: string) => [...cisternMileageKeys.details(), id] as const,
  byCistern: (cisternId: string) => [...cisternMileageKeys.all, "by-cistern", cisternId] as const,
} as const;
