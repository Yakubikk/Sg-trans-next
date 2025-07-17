// Экспорт API для типов ремонта
export { repairTypesApi } from './repairTypesApi';

// Экспорт типов и утилит для типов ремонта
export type { 
  RepairType, 
  RepairCategory, 
  RepairPriority 
} from './types';

export { 
  RepairCategoryLabels, 
  RepairPriorityLabels, 
  getRepairTypeDisplayName, 
  getRepairTypeDuration,
  getRepairTypePriorityColor
} from './types';
