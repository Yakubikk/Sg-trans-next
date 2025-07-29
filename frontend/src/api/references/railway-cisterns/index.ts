// Экспорт API для железнодорожных цистерн
export { railwayCisternsApi } from './railwayCisternsApi';
export { railwayCisternsKeys } from './queryKeys';
export type * from './types';

// Экспорт типов и утилит для железнодорожных цистерн
export type { 
  RailwayCistern,
  RailwayCisternDetailed,
  RailwayCisternDetailedResponse,
  Manufacturer,
  WagonType,
  WagonModel,
  Owner,
  Registrar,
  Affiliation,
  CreateRailwayCisternRequest,
  UpdateRailwayCisternRequest,
  RailwayCisternQueryParams
} from './types';

export { 
  getRailwayCisternDisplayName
} from './types';
