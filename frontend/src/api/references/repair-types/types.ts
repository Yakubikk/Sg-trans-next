// Типы для типов ремонта
export interface RepairType {
  id: string;
  name: string;
  description: string;
  estimatedDurationHours: number;
  category: string;
  cost?: number;
  isActive: boolean;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  requiredMaterials?: string[];
  requiredSkills?: string[];
  createDate?: string;
  createUser?: string;
  modifiedDate?: string;
  modifiedUser?: string;
}

// Константы для категорий ремонта
export const RepairCategoryLabels = {
  preventive: 'Профилактический',
  corrective: 'Корректирующий',
  emergency: 'Аварийный',
  scheduled: 'Плановый',
  unscheduled: 'Внеплановый',
} as const;

export const RepairPriorityLabels = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  critical: 'Критический',
} as const;

// Утилитарные функции для работы с типами ремонта
export const getRepairTypeDisplayName = (repairType: RepairType): string => {
  return `${repairType.name}${repairType.category ? ` (${repairType.category})` : ''}`;
};

export const getRepairTypeDuration = (repairType: RepairType): string => {
  const hours = repairType.estimatedDurationHours;
  if (hours < 24) {
    return `${hours} ч.`;
  } else {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days} д. ${remainingHours} ч.` : `${days} д.`;
  }
};

export const getRepairTypePriorityColor = (priority?: RepairType['priority']): string => {
  switch (priority) {
    case 'low': return 'text-green-600 bg-green-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'critical': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export type RepairCategory = keyof typeof RepairCategoryLabels;
export type RepairPriority = keyof typeof RepairPriorityLabels;
