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
  code: number;
  description?: string;
}

export interface CreatePartTypeDTO {
  name: string;
  code: number;
  description?: string;
}

export interface UpdatePartTypeDTO {
  name: string;
  code: number;
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
  value: string;
  description?: string;
}

export interface CreateStampNumberDTO {
  value: string;
  description?: string;
}

export interface UpdateStampNumberDTO {
  value: string;
  description?: string;
}

// Parts (Детали)
export interface PartDTO extends BaseEntity {
  id: string;
  partType: PartTypeDTO;
  depot?: DepotDTO;
  stampNumber: StampNumberDTO;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  status: PartStatusDTO;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  wheelPair?: WheelPairDTO;
  sideFrame?: SideFrameDTO;
  bolster?: BolsterDTO;
  coupler?: CouplerDTO;
  shockAbsorber?: ShockAbsorberDTO;
}

export interface WheelPairDTO {
  thicknessLeft?: number;
  thicknessRight?: number;
  wheelType?: string;
}

export interface SideFrameDTO {
  serviceLifeYears?: number;
  extendedUntil?: string;
}

export interface BolsterDTO {
  serviceLifeYears?: number;
  extendedUntil?: string;
}

export interface CouplerDTO {
  type?: string; // Тип автосцепки
}

export interface ShockAbsorberDTO {
  model?: string;
  manufacturerCode?: string;
  nextRepairDate?: string;
  serviceLifeYears?: number;
}

export interface CreateWheelPairDTO {
  partTypeId: string;
  depotId?: string;
  stampNumberId: string;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  statusId: string;
  notes?: string;
  thicknessLeft?: number;
  thicknessRight?: number;
  wheelType?: string;
}

export interface CreateSideFrameDTO {
  partTypeId: string;
  depotId?: string;
  stampNumberId: string;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  statusId: string;
  notes?: string;
  serviceLifeYears?: number;
  extendedUntil?: string;
}

export interface CreateBolsterDTO {
  partTypeId: string;
  depotId?: string;
  stampNumberId: string;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  statusId: string;
  notes?: string;
  serviceLifeYears?: number;
  extendedUntil?: string;
}

export interface CreateCouplerDTO {
  partTypeId: string;
  depotId?: string;
  stampNumberId: string;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  statusId: string;
  notes?: string;
}

export interface CreateShockAbsorberDTO {
  partTypeId: string;
  depotId?: string;
  stampNumberId: string;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  statusId: string;
  notes?: string;
  model?: string;
  manufacturerCode?: string;
  nextRepairDate?: string;
  serviceLifeYears?: number;
}

export interface UpdateWheelPairDTO {
  depotId?: string;
  stampNumberId: string;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  statusId: string;
  notes?: string;
  thicknessLeft?: number;
  thicknessRight?: number;
  wheelType?: string;
}

export interface UpdateSideFrameDTO {
  depotId?: string;
  stampNumberId: string;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  statusId: string;
  notes?: string;
  serviceLifeYears?: number;
  extendedUntil?: string;
}

export interface UpdateBolsterDTO {
  depotId?: string;
  stampNumberId: string;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  statusId: string;
  notes?: string;
  serviceLifeYears?: number;
  extendedUntil?: string;
}

export interface UpdateCouplerDTO {
  depotId?: string;
  stampNumberId: string;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  statusId: string;
  notes?: string;
}

export interface UpdateShockAbsorberDTO {
  depotId?: string;
  stampNumberId: string;
  serialNumber?: string;
  manufactureYear?: number;
  currentLocation?: string;
  statusId: string;
  notes?: string;
  model?: string;
  manufacturerCode?: string;
  nextRepairDate?: string;
  serviceLifeYears?: number;
}

// Пагинированный ответ для деталей
export interface PaginatedPartsResponse {
  items: PartDTO[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
}

// Информация о клейме
export interface StampInfoDTO {
  value: string;
}

// Информация о детали
export interface PartInfoDTO {
  partId: string;
  serialNumber?: string;
  manufactureYear?: number;
  stampInfo?: StampInfoDTO;
}

// PartEquipment (Оборудование деталей)
export interface PartEquipmentDTO {
  id: string;
  operation: number;
  defectsId?: string;
  adminOwnerId?: string;
  partsId?: string;
  jobDate?: string;
  jobTypeId?: string;
  thicknessLeft?: number;
  thicknessRight?: number;
  truckType?: number;
  notes?: string;
  documetnsId?: number;
  documetnDate?: string;
  railwayCistern?: {
    id: string;
    number: string;
    model: string;
    owner?: unknown;
  };
  equipmentType?: {
    id: string;
    name: string;
    code: number;
    partTypeId: string;
    partTypeName: string;
  };
  jobDepot?: {
    id: string;
    name: string;
    code: string;
    location?: string;
    shortName: string;
    createdAt: string;
  };
  depot?: {
    id: string;
    name: string;
    code: string;
    location?: string;
    shortName: string;
    createdAt: string;
  };
  repairType?: {
    id: string;
    name: string;
    code: string;
    description: string;
  };
  part?: PartInfoDTO;
}

export interface LastEquipmentDTO {
  equipmentTypeId: string;
  equipmentTypeName: string;
  lastEquipment: PartEquipmentDTO;
}

export interface PaginatedPartEquipmentResponse {
  items: PartEquipmentDTO[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

// Simple option type for selects
export interface SelectOption {
  value: string;
  label: string;
}
