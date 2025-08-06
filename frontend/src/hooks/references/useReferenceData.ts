import { useQuery } from '@tanstack/react-query';
import { referenceDataApi } from '@/api/references/railway-cisterns';

// Ключи для query cache
export const referenceDataKeys = {
  all: ['referenceData'] as const,
  registrars: () => [...referenceDataKeys.all, 'registrars'] as const,
  manufacturers: () => [...referenceDataKeys.all, 'manufacturers'] as const,
  owners: () => [...referenceDataKeys.all, 'owners'] as const,
  wagonTypes: () => [...referenceDataKeys.all, 'wagonTypes'] as const,
  wagonModels: () => [...referenceDataKeys.all, 'wagonModels'] as const,
  affiliations: () => [...referenceDataKeys.all, 'affiliations'] as const,
};

// Хуки для получения справочных данных
export const useRegistrars = () => {
  return useQuery({
    queryKey: referenceDataKeys.registrars(),
    queryFn: async () => {
      const response = await referenceDataApi.getRegistrars();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 2,
  });
};

export const useManufacturers = () => {
  return useQuery({
    queryKey: referenceDataKeys.manufacturers(),
    queryFn: async () => {
      const response = await referenceDataApi.getManufacturers();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 2,
  });
};

export const useWagonTypes = () => {
  return useQuery({
    queryKey: referenceDataKeys.wagonTypes(),
    queryFn: async () => {
      const response = await referenceDataApi.getWagonTypes();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 2,
  });
};

export const useWagonModels = () => {
  return useQuery({
    queryKey: referenceDataKeys.wagonModels(),
    queryFn: async () => {
      const response = await referenceDataApi.getWagonModels();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 2,
  });
};
