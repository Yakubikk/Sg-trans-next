// Экспорт API для вагонов
export { wagonsApi } from './wagonsApi';

// Экспорт типов и утилит для вагонов
export type { 
  Wagon, 
  WagonStatus, 
  WagonType 
} from './types';

export { 
  WagonStatusLabels, 
  WagonTypeLabels, 
  getWagonStatus, 
  getWagonDisplayName 
} from './types';
