// Типы для сохранённых фильтров
export interface CisternFilter {
  numbers?: string[];
  manufacturerIds?: string[];
  buildDateFrom?: string;
  buildDateTo?: string;
  tareWeightFrom?: number;
  tareWeightTo?: number;
  loadCapacityFrom?: number;
  loadCapacityTo?: number;
  lengthFrom?: number;
  lengthTo?: number;
  axleCounts?: number[];
  volumeFrom?: number;
  volumeTo?: number;
  fillingVolumeFrom?: number;
  fillingVolumeTo?: number;
  initialTareWeightFrom?: number;
  initialTareWeightTo?: number;
  typeIds?: string[];
  modelIds?: string[];
  commissioningDateFrom?: string;
  commissioningDateTo?: string;
  serialNumbers?: string[];
  registrationNumbers?: string[];
  registrationDateFrom?: string;
  registrationDateTo?: string;
  registrarIds?: string[];
  ownerIds?: string[];
  techConditions?: string[];
  prispiski?: string[];
  reRegistrationDateFrom?: string;
  reRegistrationDateTo?: string;
  pressureFrom?: number;
  pressureTo?: number;
  testPressureFrom?: number;
  testPressureTo?: number;
  rents?: string[];
  affiliationIds?: string[];
  serviceLifeYearsFrom?: number;
  serviceLifeYearsTo?: number;
  periodMajorRepairFrom?: string;
  periodMajorRepairTo?: string;
  periodPeriodicTestFrom?: string;
  periodPeriodicTestTo?: string;
  periodIntermediateTestFrom?: string;
  periodIntermediateTestTo?: string;
  periodDepotRepairFrom?: string;
  periodDepotRepairTo?: string;
  dangerClasses?: number[];
  substances?: string[];
  tareWeight2From?: number;
  tareWeight2To?: number;
  tareWeight3From?: number;
  tareWeight3To?: number;
  createdAtFrom?: string;
  createdAtTo?: string;
  updatedAtFrom?: string;
  updatedAtTo?: string;
}

export interface SortField {
  fieldName: string;
  descending: boolean;
}

export interface SavedFilter {
  id: string;
  name: string;
  filter: CisternFilter;
  sortFields: SortField[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSavedFilterRequest {
  name: string;
  filter: CisternFilter;
  sortFields: SortField[];
}

export interface UpdateSavedFilterRequest extends CreateSavedFilterRequest {
  id: string;
}
