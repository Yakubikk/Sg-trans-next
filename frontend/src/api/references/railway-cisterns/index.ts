// Экспорт API для железнодорожных цистерн
export { railwayCisternsApi } from './railwayCisternsApi';

// Экспорт типов и утилит для железнодорожных цистерн
export type { 
  RailwayCistern, 
  RailwayCisternDetail,
  VesselResponse,
  PartInstallationResponse,
  PartType
} from './types';

export { 
  getRailwayCisternDisplayName,
  formatWeight,
  formatVolume
} from './types';
