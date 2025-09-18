import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { partsApi } from '@/api/directories';
import type { 
  UpdateWheelPairDTO, 
  UpdateSideFrameDTO, 
  UpdateBolsterDTO, 
  UpdateCouplerDTO, 
  UpdateShockAbsorberDTO,
} from '@/types/directories';

// Query keys
export const partsKeys = {
  all: ['directories', 'parts'] as const,
  byId: (id: string) => [...partsKeys.all, id] as const,
  filtered: (pageNumber: number, pageSize: number, typeId?: string) => 
    [...partsKeys.all, { pageNumber, pageSize, typeId }] as const,
};

// Hooks
export const useParts = (pageNumber = 1, pageSize = 10, typeId?: string) => {
  return useQuery({
    queryKey: partsKeys.filtered(pageNumber, pageSize, typeId),
    queryFn: () => partsApi.getAll(pageNumber, pageSize, typeId),
  });
};

export const usePartById = (id: string) => {
  return useQuery({
    queryKey: partsKeys.byId(id),
    queryFn: () => partsApi.getById(id),
    enabled: !!id,
  });
};

// Create hooks for different part types
export const useCreateWheelPair = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partsApi.createWheelPair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};

export const useCreateSideFrame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partsApi.createSideFrame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};

export const useCreateBolster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partsApi.createBolster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};

export const useCreateCoupler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partsApi.createCoupler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};

export const useCreateShockAbsorber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partsApi.createShockAbsorber,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};

// Update hooks for different part types
export const useUpdateWheelPair = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWheelPairDTO }) =>
      partsApi.updateWheelPair(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};

export const useUpdateSideFrame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSideFrameDTO }) =>
      partsApi.updateSideFrame(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};

export const useUpdateBolster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBolsterDTO }) =>
      partsApi.updateBolster(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};

export const useUpdateCoupler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCouplerDTO }) =>
      partsApi.updateCoupler(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};

export const useUpdateShockAbsorber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateShockAbsorberDTO }) =>
      partsApi.updateShockAbsorber(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};

export const useDeletePart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partsKeys.all });
    },
  });
};
