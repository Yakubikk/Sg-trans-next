// Типы для типов ремонта
export interface RepairType {
  id: string;
  name: string;
  code: string;
  description: string;
}

// Утилитарные функции для работы с типами ремонта
export const getRepairTypeDisplayName = (repairType: RepairType): string => {
  return `${repairType.name}${repairType.code ? ` (${repairType.code})` : ''}`;
};
