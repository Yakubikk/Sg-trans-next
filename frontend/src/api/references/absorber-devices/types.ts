// Типы для поглощающих аппаратов
export interface AbsorberDevice {
  id: string;
  code: number;
  field1?: string;
}

export interface AbsorberDeviceRequest {
  code: number;
  field1?: string;
}

export interface AbsorberDeviceResponse {
  id: string;
  code: number;
  field1?: string;
}

export interface AbsorberDeviceAccounting {
  id: string;
  code: number;
  factoryNumber?: string;
  type?: string;
  year?: string;
  isWrittenOff: boolean;
  wagonNumber?: string;
  installationDate?: string;
  storageLocation?: number;
  isRolledOut: boolean;
}

export interface AbsorberDeviceAccountingRequest {
  code: number;
  factoryNumber?: string;
  type?: string;
  year?: string;
  isWrittenOff: boolean;
  wagonNumber?: string;
  installationDate?: string;
  storageLocation?: number;
  isRolledOut: boolean;
}
