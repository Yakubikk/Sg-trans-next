import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  affiliationsApi,
  depotsApi,
  manufacturersApi,
  ownersApi,
  wagonTypesApi,
  locationsApi,
  filterTypesApi,
  partTypesApi,
  partStatusesApi,
  repairTypesApi,
  registrarsApi,
  wagonModelsApi,
  stampNumbersApi,
} from '@/api/directories';

// Query keys for directories
export const directoryKeys = {
  all: ['directories'] as const,
  affiliations: () => [...directoryKeys.all, 'affiliations'] as const,
  depots: () => [...directoryKeys.all, 'depots'] as const,
  manufacturers: () => [...directoryKeys.all, 'manufacturers'] as const,
  owners: () => [...directoryKeys.all, 'owners'] as const,
  wagonTypes: () => [...directoryKeys.all, 'wagonTypes'] as const,
  locations: () => [...directoryKeys.all, 'locations'] as const,
  filterTypes: () => [...directoryKeys.all, 'filterTypes'] as const,
  partTypes: () => [...directoryKeys.all, 'partTypes'] as const,
  partStatuses: () => [...directoryKeys.all, 'partStatuses'] as const,
  repairTypes: () => [...directoryKeys.all, 'repairTypes'] as const,
  registrars: () => [...directoryKeys.all, 'registrars'] as const,
  wagonModels: () => [...directoryKeys.all, 'wagonModels'] as const,
  stampNumbers: () => [...directoryKeys.all, 'stampNumbers'] as const,
};

// Generic hooks factory
const createDirectoryHooks = <T, CreateT, UpdateT>(
  queryKey: readonly string[],
  api: {
    getAll: () => Promise<T[]>;
    getById: (id: string) => Promise<T>;
    create: (data: CreateT) => Promise<T>;
    update: (id: string, data: UpdateT) => Promise<T>;
    delete: (id: string) => Promise<void>;
  }
) => {
  const useGetAll = () => {
    return useQuery({
      queryKey,
      queryFn: api.getAll,
    });
  };

  const useGetById = (id: string) => {
    return useQuery({
      queryKey: [...queryKey, id],
      queryFn: () => api.getById(id),
      enabled: !!id,
    });
  };

  const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: api.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    });
  };

  const useUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateT }) =>
        api.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: api.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    });
  };

  return {
    useGetAll,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
  };
};

// Affiliations hooks
export const affiliationsHooks = createDirectoryHooks(
  directoryKeys.affiliations(),
  affiliationsApi
);

export const {
  useGetAll: useAffiliations,
  useGetById: useAffiliation,
  useCreate: useCreateAffiliation,
  useUpdate: useUpdateAffiliation,
  useDelete: useDeleteAffiliation,
} = affiliationsHooks;

// Depots hooks
export const depotsHooks = createDirectoryHooks(
  directoryKeys.depots(),
  depotsApi
);

export const {
  useGetAll: useDepots,
  useGetById: useDepot,
  useCreate: useCreateDepot,
  useUpdate: useUpdateDepot,
  useDelete: useDeleteDepot,
} = depotsHooks;

// Manufacturers hooks
export const manufacturersHooks = createDirectoryHooks(
  directoryKeys.manufacturers(),
  manufacturersApi
);

export const {
  useGetAll: useManufacturers,
  useGetById: useManufacturer,
  useCreate: useCreateManufacturer,
  useUpdate: useUpdateManufacturer,
  useDelete: useDeleteManufacturer,
} = manufacturersHooks;

// Owners hooks
export const ownersHooks = createDirectoryHooks(
  directoryKeys.owners(),
  ownersApi
);

export const {
  useGetAll: useOwners,
  useGetById: useOwner,
  useCreate: useCreateOwner,
  useUpdate: useUpdateOwner,
  useDelete: useDeleteOwner,
} = ownersHooks;

// WagonTypes hooks
export const wagonTypesHooks = createDirectoryHooks(
  directoryKeys.wagonTypes(),
  wagonTypesApi
);

export const {
  useGetAll: useWagonTypes,
  useGetById: useWagonType,
  useCreate: useCreateWagonType,
  useUpdate: useUpdateWagonType,
  useDelete: useDeleteWagonType,
} = wagonTypesHooks;

// Locations hooks
export const locationsHooks = createDirectoryHooks(
  directoryKeys.locations(),
  locationsApi
);

export const {
  useGetAll: useLocations,
  useGetById: useLocation,
  useCreate: useCreateLocation,
  useUpdate: useUpdateLocation,
  useDelete: useDeleteLocation,
} = locationsHooks;

// FilterTypes hooks
export const filterTypesHooks = createDirectoryHooks(
  directoryKeys.filterTypes(),
  filterTypesApi
);

export const {
  useGetAll: useFilterTypes,
  useGetById: useFilterType,
  useCreate: useCreateFilterType,
  useUpdate: useUpdateFilterType,
  useDelete: useDeleteFilterType,
} = filterTypesHooks;

// PartTypes hooks
export const partTypesHooks = createDirectoryHooks(
  directoryKeys.partTypes(),
  partTypesApi
);

export const {
  useGetAll: usePartTypes,
  useGetById: usePartType,
  useCreate: useCreatePartType,
  useUpdate: useUpdatePartType,
  useDelete: useDeletePartType,
} = partTypesHooks;

// PartStatuses hooks
export const partStatusesHooks = createDirectoryHooks(
  directoryKeys.partStatuses(),
  partStatusesApi
);

export const {
  useGetAll: usePartStatuses,
  useGetById: usePartStatus,
  useCreate: useCreatePartStatus,
  useUpdate: useUpdatePartStatus,
  useDelete: useDeletePartStatus,
} = partStatusesHooks;

// RepairTypes hooks
export const repairTypesHooks = createDirectoryHooks(
  directoryKeys.repairTypes(),
  repairTypesApi
);

export const {
  useGetAll: useRepairTypes,
  useGetById: useRepairType,
  useCreate: useCreateRepairType,
  useUpdate: useUpdateRepairType,
  useDelete: useDeleteRepairType,
} = repairTypesHooks;

// Registrars hooks
export const registrarsHooks = createDirectoryHooks(
  directoryKeys.registrars(),
  registrarsApi
);

export const {
  useGetAll: useRegistrars,
  useGetById: useRegistrar,
  useCreate: useCreateRegistrar,
  useUpdate: useUpdateRegistrar,
  useDelete: useDeleteRegistrar,
} = registrarsHooks;

// WagonModels hooks
export const wagonModelsHooks = createDirectoryHooks(
  directoryKeys.wagonModels(),
  wagonModelsApi
);

export const {
  useGetAll: useWagonModels,
  useGetById: useWagonModel,
  useCreate: useCreateWagonModel,
  useUpdate: useUpdateWagonModel,
  useDelete: useDeleteWagonModel,
} = wagonModelsHooks;

// StampNumbers hooks
export const stampNumbersHooks = createDirectoryHooks(
  directoryKeys.stampNumbers(),
  stampNumbersApi
);

export const {
  useGetAll: useStampNumbers,
  useGetById: useStampNumber,
  useCreate: useCreateStampNumber,
  useUpdate: useUpdateStampNumber,
  useDelete: useDeleteStampNumber,
} = stampNumbersHooks;

// Helper hooks for select options
import { convertToSelectOptions } from '@/api/directories';
import type { SelectOption } from '@/types/directories';

export const useManufacturerOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useManufacturers();
  return {
    data: data ? convertToSelectOptions.manufacturers(data) : undefined,
    isLoading,
    error,
  };
};

export const useWagonTypeOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useWagonTypes();
  return {
    data: data ? convertToSelectOptions.wagonTypes(data) : undefined,
    isLoading,
    error,
  };
};

export const useWagonModelOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useWagonModels();
  return {
    data: data ? convertToSelectOptions.wagonModels(data) : undefined,
    isLoading,
    error,
  };
};

export const useAffiliationOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useAffiliations();
  return {
    data: data ? convertToSelectOptions.affiliations(data) : undefined,
    isLoading,
    error,
  };
};

export const useOwnerOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useOwners();
  return {
    data: data ? convertToSelectOptions.owners(data) : undefined,
    isLoading,
    error,
  };
};

export const useRegistrarOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useRegistrars();
  return {
    data: data ? convertToSelectOptions.registrars(data) : undefined,
    isLoading,
    error,
  };
};

export const useStampNumberOptions = (): { data: SelectOption[] | undefined; isLoading: boolean; error: Error | null } => {
  const { data, isLoading, error } = useStampNumbers();
  return {
    data: data ? convertToSelectOptions.stampNumbers(data) : undefined,
    isLoading,
    error,
  };
};
