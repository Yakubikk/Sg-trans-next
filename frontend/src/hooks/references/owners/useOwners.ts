import { ownersApi, ownersKeys } from '@/api/references';
import type { 
  CreateOwnerRequest, 
  UpdateOwnerRequest, 
  OwnerEntity,
} from '@/api/references';
import { createGenericCRUD } from '../../common/useGenericCRUD';

// Создаем CRUD хуки через универсальную фабрику
const ownersCRUD = createGenericCRUD<OwnerEntity, CreateOwnerRequest, UpdateOwnerRequest>(ownersKeys, {
  getAll: ownersApi.getOwners,
  getById: ownersApi.getOwnerById,
  create: ownersApi.createOwner,
  update: ownersApi.updateOwner,
  delete: ownersApi.deleteOwner,
});

// Экспортируем хуки с понятными именами
export const useOwners = ownersCRUD.useList;
export const useOwner = ownersCRUD.useDetail;
export const useCreateOwner = ownersCRUD.useCreate;
export const useUpdateOwner = ownersCRUD.useUpdate;
export const useDeleteOwner = ownersCRUD.useDelete;
