// Типы для грузов
export interface Cargo {
  id: string;
  code: number;
  cargoName?: string;
  name?: string;
  price?: number;
}

export interface CargoRequest {
  code: number;
  cargoName?: string;
  name?: string;
  price?: number;
}
