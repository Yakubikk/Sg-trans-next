// Базовые типы для справочников
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Affiliation (Принадлежность)
export interface AffiliationDTO extends BaseEntity {
  value: string;
}

export interface CreateAffiliationDTO {
  value: string;
}

export interface UpdateAffiliationDTO {
  value: string;
}

// Depot (Депо)
export interface DepotDTO extends BaseEntity {
  name: string;
  code: string;
  location?: string;
}

export interface CreateDepotDTO {
  name: string;
  code: string;
  location?: string;
}

export interface UpdateDepotDTO {
  name: string;
  code: string;
  location?: string;
}

// Manufacturer (Производитель)
export interface ManufacturerDTO extends BaseEntity {
  name: string;
  country: string;
  shortName: string;
  code: number;
}

export interface CreateManufacturerDTO {
  name: string;
  country: string;
  shortName: string;
  code: number;
}

export interface UpdateManufacturerDTO {
  name: string;
  country: string;
  shortName: string;
  code: number;
}

// Owner (Собственник)
export interface OwnerDTO extends BaseEntity {
  name: string;
  unp: string;
  shortName: string;
  address: string;
  treatRepairs: boolean;
}

export interface CreateOwnerDTO {
  name: string;
  unp: string;
  shortName: string;
  address: string;
  treatRepairs: boolean;
}

export interface UpdateOwnerDTO {
  name: string;
  unp: string;
  shortName: string;
  address: string;
  treatRepairs: boolean;
}

// WagonType (Тип вагона)
export interface WagonTypeDTO extends BaseEntity {
  name: string;
  type: string;
}

export interface CreateWagonTypeDTO {
  name: string;
  type: string;
}

export interface UpdateWagonTypeDTO {
  name: string;
  type: string;
}

// Location (Местоположение)
export interface LocationDTO extends BaseEntity {
  name: string;
  code?: string;
}

export interface CreateLocationDTO {
  name: string;
  code?: string;
}

export interface UpdateLocationDTO {
  name: string;
  code?: string;
}

// FilterType (Тип фильтра)
export interface FilterTypeDTO extends BaseEntity {
  name: string;
  description?: string;
}

export interface CreateFilterTypeDTO {
  name: string;
  description?: string;
}

export interface UpdateFilterTypeDTO {
  name: string;
  description?: string;
}

// PartType (Тип детали)
export interface PartTypeDTO extends BaseEntity {
  name: string;
  description?: string;
}

export interface CreatePartTypeDTO {
  name: string;
  description?: string;
}

export interface UpdatePartTypeDTO {
  name: string;
  description?: string;
}

// PartStatus (Статус детали)
export interface PartStatusDTO extends BaseEntity {
  name: string;
  color?: string;
}

export interface CreatePartStatusDTO {
  name: string;
  color?: string;
}

export interface UpdatePartStatusDTO {
  name: string;
  color?: string;
}

// RepairType (Тип ремонта)
export interface RepairTypeDTO extends BaseEntity {
  name: string;
  description?: string;
}

export interface CreateRepairTypeDTO {
  name: string;
  description?: string;
}

export interface UpdateRepairTypeDTO {
  name: string;
  description?: string;
}

// Registrar (Регистратор)
export interface RegistrarDTO extends BaseEntity {
  name: string;
  code?: string;
}

export interface CreateRegistrarDTO {
  name: string;
  code?: string;
}

export interface UpdateRegistrarDTO {
  name: string;
  code?: string;
}

// WagonModel (Модель вагона)
export interface WagonModelDTO extends BaseEntity {
  name: string;
  typeId: string;
  manufacturerId: string;
}

export interface CreateWagonModelDTO {
  name: string;
  typeId: string;
  manufacturerId: string;
}

export interface UpdateWagonModelDTO {
  name: string;
  typeId: string;
  manufacturerId: string;
}

// StampNumber (Номер клейма)
export interface StampNumberDTO extends BaseEntity {
  number: string;
  description?: string;
}

export interface CreateStampNumberDTO {
  number: string;
  description?: string;
}

export interface UpdateStampNumberDTO {
  number: string;
  description?: string;
}

// Simple option type for selects
export interface SelectOption {
  value: string;
  label: string;
}
