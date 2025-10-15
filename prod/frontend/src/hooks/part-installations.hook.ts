import { useQuery } from '@tanstack/react-query';
import { partsApi } from '@/api/directories';
import type { PartEquipmentDTO } from '@/types/directories';

export const usePartInstallationHistory = (partId: string) => {
  return useQuery<PartEquipmentDTO[], Error>({
    queryKey: ['part-installations', partId],
    queryFn: () => partsApi.getInstallationHistory(partId),
    enabled: !!partId,
  });
};
