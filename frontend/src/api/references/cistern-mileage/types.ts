// Типы для пробегов цистерн
export interface CisternMileage {
  id: string;
  cisternId: string;
  cisternNumber: string;
  milage: number;
  milageNorm: number;
  repairTypeId: string;
  repairDate: string;
  inputModeCode: number;
  inputDate: string;
}

export type CreateCisternMileageRequest = Omit<CisternMileage, 'id'>;

export type UpdateCisternMileageRequest = Partial<CisternMileage>;

export interface CisternMileageQueryParams {
  cisternId?: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
