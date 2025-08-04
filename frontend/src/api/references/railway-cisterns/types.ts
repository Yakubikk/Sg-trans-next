// Типы для железнодорожных цистерн
export interface RailwayCistern {
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

// Детальные типы для полного паспорта цистерны
export interface Manufacturer {
  id: string;
  name: string;
  country: string;
  shortName: string;
  code: number;
  createdAt: string;
  updatedAt: string;
}

export interface WagonType {
  id: string;
  name: string;
  type: string;
}

export interface WagonModel {
  id: string;
  name: string;
}

export interface Registrar {
  id: string;
  name: string;
}

export interface Owner {
  id: string;
  name: string;
  unp: string;
  shortName: string;
  address: string;
  treatRepairs: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Affiliation {
  id: string;
  value: string;
}

export interface RailwayCisternDetailed {
  id: string;
  number: string;
  manufacturer: Manufacturer;
  buildDate: string;
  tareWeight: number;
  loadCapacity: number;
  length: number;
  axleCount: number;
  volume: number;
  fillingVolume: number;
  initialTareWeight: number;
  type: WagonType;
  model: WagonModel;
  commissioningDate: string;
  serialNumber: string;
  registrationNumber: string;
  registrationDate: string;
  registrar: Registrar;
  notes: string;
  owner: Owner;
  techConditions: string;
  pripiska: string;
  reRegistrationDate: string;
  pressure: number;
  testPressure: number;
  rent: string;
  affiliation: Affiliation;
  serviceLifeYears: number;
  periodMajorRepair: string;
  periodPeriodicTest: string;
  periodIntermediateTest: string;
  periodDepotRepair: string;
  dangerClass: number;
  substance: string;
  createdAt: string;
  updatedAt: string;
}

export interface RailwayCisternDetailedResponse {
  railwayCisterns: RailwayCisternDetailed[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

// Создание и обновление цистерн
export interface CreateRailwayCisternRequest {
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

// Создание детальной цистерны
export interface CreateRailwayCisternDetailedRequest {
  number: string;
  manufacturerId: string;
  buildDate: string;
  tareWeight?: number;
  loadCapacity?: number;
  length?: number;
  axleCount?: number;
  volume?: number;
  fillingVolume?: number;
  initialTareWeight?: number;
  typeId: string;
  modelId: string;
  commissioningDate?: string;
  serialNumber?: string;
  registrationNumber?: string;
  registrationDate?: string;
  registrarId?: string;
  notes?: string;
  ownerId: string;
  techConditions?: string;
  pripiska?: string;
  reRegistrationDate?: string;
  pressure?: number;
  testPressure?: number;
  rent?: string;
  affiliationId: string;
  serviceLifeYears?: number;
  periodMajorRepair?: string;
  periodPeriodicTest?: string;
  periodIntermediateTest?: string;
  periodDepotRepair?: string;
  dangerClass?: number;
  substance?: string;
}

export type UpdateRailwayCisternRequest = Partial<CreateRailwayCisternRequest>;

export interface RailwayCisternQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Утилитарные функции
export const getRailwayCisternDisplayName = (cistern: RailwayCistern): string => {
  return `Цистерна №${cistern.number}${cistern.typeName ? ` (${cistern.typeName})` : ''}`;
};
