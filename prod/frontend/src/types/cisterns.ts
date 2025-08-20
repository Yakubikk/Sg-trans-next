// Railway Cistern types based on backend DTOs

export interface RailwayCisternDetailDTO {
  id: string;
  number: string;
  manufacturer: {
    id: string;
    name: string;
  };
  buildDate: string;
  tareWeight: number;
  loadCapacity: number;
  length: number;
  axleCount: number;
  volume: number;
  fillingVolume?: number;
  initialTareWeight?: number;
  type: {
    id: string;
    name: string;
  };
  model: {
    id: string;
    name: string;
  };
  commissioningDate?: string;
  serialNumber: string;
  registrationNumber: string;
  registrationDate: string;
  registrar: {
    id: string;
    name: string;
  };
  notes: string;
  owner: {
    id: string;
    name: string;
  };
  techConditions?: string;
  pripiska?: string;
  reRegistrationDate?: string;
  pressure: number;
  testPressure: number;
  rent?: string;
  affiliation: {
    id: string;
    value: string;
  };
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
}

export interface RailwayCisternListDTO {
  id: string;
  number: string;
  manufacturerName: string;
  buildDate: string;
  typeName: string;
  modelName: string;
  ownerName: string;
  registrationNumber: string;
  registrationDate: string;
  affiliationValue: string;
}

export interface CreateRailwayCisternDTO {
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
  notes: string;
  ownerId?: string;
  techConditions?: string;
  pripiska?: string;
  reRegistrationDate?: string;
  pressure: number;
  testPressure: number;
  rent?: string;
  affiliationId: string;
  serviceLifeYears: number;
  periodMajorRepair?: string;
  periodPeriodicTest?: string;
  periodIntermediateTest?: string;
  periodDepotRepair?: string;
  dangerClass: number;
  substance: string;
  tareWeight2: number;
  tareWeight3: number;
}

export interface UpdateRailwayCisternDTO extends CreateRailwayCisternDTO {
  id: string;
}

// Pagination and filtering
export interface CisternsFilter {
  search?: string;
  manufacturerId?: string;
  typeId?: string;
  ownerId?: string;
  affiliationId?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedCisternsResponse {
  railwayCisterns: RailwayCisternDetailDTO[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
