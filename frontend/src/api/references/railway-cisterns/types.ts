// Типы для железнодорожных цистерн
export interface RailwayCistern {
  id: string;
  number: string;
  manufacturerId?: string;
  manufacturerName?: string;
  manufacturerCountry?: string;
  buildDate?: string;
  tareWeight?: number;
  loadCapacity?: number;
  length?: number;
  axleCount?: number;
  volume?: number;
  fillingVolume?: number;
  initialTareWeight?: number;
  typeId?: string;
  typeName?: string;
  modelId?: string;
  modelName?: string;
  commissioningDate?: string;
  serialNumber?: string;
  registrationNumber?: string;
  registrationDate?: string;
  registrarId?: string;
  registrarName?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  creatorId?: string;
  vessel?: VesselResponse;
}

export interface RailwayCisternDetail extends RailwayCistern {
  partInstallations?: PartInstallationResponse[];
}

export interface VesselResponse {
  id: string;
  vesselSerialNumber?: string;
  vesselBuildDate?: string;
}

export interface PartInstallationResponse {
  installationId: string;
  partId: string;
  partName: string;
  partType: PartType;
  installedAt?: string;
  installedBy?: string;
  removedAt?: string;
  removedBy?: string;
  locationFrom?: string;
  locationTo: string;
  notes?: string;
}

export enum PartType {
  WheelPair = 'WheelPair',
  Brake = 'Brake',
  Coupler = 'Coupler',
  Buffer = 'Buffer',
  SpringSet = 'SpringSet',
  Other = 'Other'
}

// Утилитарные функции
export const getRailwayCisternDisplayName = (cistern: RailwayCistern): string => {
  return `Цистерна №${cistern.number}${cistern.typeName ? ` (${cistern.typeName})` : ''}`;
};

export const formatWeight = (weight?: number): string => {
  return weight ? `${weight} т` : 'Не указан';
};

export const formatVolume = (volume?: number): string => {
  return volume ? `${volume} м³` : 'Не указан';
};
