// Типы для тормозов
export interface Brake {
  id: string;
  code: number;
  field1?: string;
  description?: string;
}

export interface BrakeRequest {
  code: number;
  field1?: string;
  description?: string;
}
