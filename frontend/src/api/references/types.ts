// Типы для справочников
export interface Wagon {
  id: string;
  number: string;
  type: string;
  capacity: number;
  status: string;
  lastMaintenanceDate: string;
}

export interface RepairType {
  id: string;
  name: string;
  description: string;
  estimatedDurationHours: number;
  category: string;
}
