export interface RailwayCistern {
  id: string;
  number: string;
  manufacturerId: string;
  manufacturerName?: string;
  buildDate: string;
  tareWeight: number;
  loadCapacity: number;
  length: number;
  axleCount: number;
  volume: number;
  fillingVolume?: number;
  initialTareWeight?: number;
  typeId: string;
  typeName?: string;
  modelId?: string;
  modelName?: string;
  commissioningDate?: string;
  serialNumber: string;
  registrationNumber: string;
  registrationDate: string;
  registrarId?: string;
  registrarName?: string;
  notes?: string;
  ownerId?: string;
  ownerName?: string;
  techConditions?: string;
  pripiska?: string;
  reRegistrationDate?: string;
  pressure: number;
  testPressure: number;
  rent?: string;
  affiliationId: string;
  affiliationName?: string;
  serviceLifeYears: number;
  periodMajorRepair?: string;
  periodPeriodicTest?: string;
  periodIntermediateTest?: string;
  periodDepotRepair?: string;
  dangerClass: number;
  substance: string;
  tareWeight2: number;
  tareWeight3: number;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  // Relations (deprecated - use Name fields instead)
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
  value: string;
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

// Railway Cistern Passport DTOs
export interface RailwayCisternPassport {
  id: string;
  number: string;
  serialNumber: string;
  registrationNumber: string;
  
  // Производство
  manufacturer?: string;
  buildDate: string;
  commissioningDate?: string;
  
  // Тип и модель
  type?: string;
  model?: string;
  
  // Весовые характеристики
  tareWeight: number;
  tareWeight2: number;
  tareWeight3: number;
  initialTareWeight?: number;
  loadCapacity: number;
  
  // Размеры
  length: number;
  axleCount: number;
  volume: number;
  fillingVolume?: number;
  
  // Давление
  pressure: number;
  testPressure: number;
  
  // Опасность
  dangerClass: number;
  substance: string;
  
  // Регистрация
  registrationDate: string;
  reRegistrationDate?: string;
  registrar?: string;
  
  // Владение
  owner?: string;
  affiliation?: string;
  rent?: string;
  pripiska?: string;
  
  // Ремонт и обслуживание
  serviceLifeYears: number;
  periodMajorRepair?: string;
  periodPeriodicTest?: string;
  periodIntermediateTest?: string;
  periodDepotRepair?: string;
  
  // Дополнительно
  techСonditions?: string;
  notes?: string;
  
  createdAt: string;
  updatedAt: string;
  
  // Установленные части
  installedParts: InstalledPart[];
  
  // Сосуд под давлением
  vesselInfo?: VesselInfo;
}

export interface InstalledPart {
  id: string;
  partId: string;
  partTypeName?: string;
  partStatusName?: string;
  serialNumber?: string;
  manufactureYear?: string;
  installedAt: string;
  installedBy?: string;
  removedAt?: string;
  removedBy?: string;
  fromLocationName?: string;
  toLocationName?: string;
  notes?: string;
}

export interface VesselInfo {
  id: string;
  // Добавить необходимые поля в зависимости от модели Vessel
}

// Дополнительные типы для пагинации
export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  size: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}
