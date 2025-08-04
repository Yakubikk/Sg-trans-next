// Экспорт API для железнодорожных цистерн
export { railwayCisternsApi } from './railwayCisternsApi';
export { railwayCisternsKeys } from './queryKeys';
export { referenceDataApi } from './referenceDataApi';
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
  CreateRailwayCisternDetailedRequest,
  UpdateRailwayCisternRequest,
  RailwayCisternQueryParams
} from './types';

export { 
  getRailwayCisternDisplayName
} from './types';
