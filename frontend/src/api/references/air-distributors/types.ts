// Типы для воздухораспределителей
export interface AirDistributor {
  id: string;
  code: number;
  field1?: string;
}

export interface AirDistributorRequest {
  code: number;
  field1?: string;
}
