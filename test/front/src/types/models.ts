export interface RailwayCistern {
  id: string;
  number: string;
  manufacturerId: string;
  buildDate: string;
  tareWeight: number;
  loadCapacity: number;
  length: number;
  axleCount: number;
  volume: number;
  fillingVolume?: number;
  initialTareWeight?: number;
  typeId: string;
  modelId?: string;
  commissioningDate?: string;
  serialNumber: string;
  registrationNumber: string;
  registrationDate: string;
  registrarId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  // Relations
  manufacturer?: Manufacturer;
  type?: WagonType;
  model?: WagonModel;
  registrar?: Registrar;
}

export interface RailwayCisternCreateDto {
  number: string;
  manufacturerId: string;
  buildDate: string;
  tareWeight: number;
  loadCapacity: number;
  length: number;
  axleCount: number;
  volume: number;
  fillingVolume?: number;
  initialTareWeight?: number;
  typeId: string;
  modelId?: string;
  commissioningDate?: string;
  serialNumber: string;
  registrationNumber: string;
  registrationDate: string;
  registrarId?: string;
  notes?: string;
}

export type RailwayCisternUpdateDto = Partial<RailwayCisternCreateDto>;

// Reference entities
export interface Manufacturer {
  id: string;
  name: string;
  country?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WagonType {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WagonModel {
  id: string;
  name: string;
  typeId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  type?: WagonType;
}

export interface Registrar {
  id: string;
  name: string;
  code?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Owner {
  id: string;
  name: string;
  code?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Depot {
  id: string;
  name: string;
  code?: string;
  location?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  code?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Affiliation {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartType {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartStatus {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RepairType {
  id: string;
  name: string;
  description?: string;
  cost?: number;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  description?: string;
  filterData: string;
  entityType: string;
  userId: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Base CRUD DTOs
export interface BaseCreateDto {
  name: string;
  description?: string;
}

export type BaseUpdateDto = Partial<BaseCreateDto>;

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  search?: string;
}
