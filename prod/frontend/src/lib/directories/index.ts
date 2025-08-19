// Экспорт базовых типов и утилит
export type { DirectoryConfig, DirectoryField } from './types';
export { directoryUtils } from './types';

// Экспорт базовых конфигураций полей (без хуков)
export { affiliationsConfig } from './affiliations.config';
export { depotsConfig } from './depots.config';
export { manufacturersConfig } from './manufacturers.config';
export { ownersConfig } from './owners.config';
export { wagonTypesConfig } from './wagon-types.config';
export { locationsConfig } from './locations.config';
export { filterTypesConfig } from './filter-types.config';
export { partTypesConfig } from './part-types.config';
export { partStatusesConfig } from './part-statuses.config';
export { repairTypesConfig } from './repair-types.config';
export { registrarsConfig } from './registrars.config';

// Объект со всеми базовыми конфигурациями
import { affiliationsBaseConfig } from './affiliations.config';
import { depotsBaseConfig } from './depots.config';
import { manufacturersBaseConfig } from './manufacturers.config';
import { ownersBaseConfig } from './owners.config';
import { wagonTypesConfig } from './wagon-types.config';
import { locationsConfig } from './locations.config';
import { filterTypesConfig } from './filter-types.config';
import { partTypesConfig } from './part-types.config';
import { partStatusesConfig } from './part-statuses.config';
import { repairTypesConfig } from './repair-types.config';
import { registrarsConfig } from './registrars.config';
import { DirectoryConfig } from './types';

export const directoriesConfig: Record<string, DirectoryConfig> = {
  affiliations: affiliationsBaseConfig,
  depots: depotsBaseConfig,
  manufacturers: manufacturersBaseConfig,
  owners: ownersBaseConfig,
  wagonTypes: wagonTypesConfig,
  locations: locationsConfig,
  filterTypes: filterTypesConfig,
  partTypes: partTypesConfig,
  partStatuses: partStatusesConfig,
  repairTypes: repairTypesConfig,
  registrars: registrarsConfig,
};

// Утилиты для работы с базовыми конфигурациями
export const directoryConfigUtils = {
  getConfig: (directoryName: string): DirectoryConfig | undefined => {
    return directoriesConfig[directoryName];
  },

  getAllConfigs: (): DirectoryConfig[] => {
    return Object.values(directoriesConfig);
  },

  getFieldsByDirectory: (directoryName: string) => {
    const config = directoriesConfig[directoryName];
    return config?.fields || [];
  },

  getConfigNames: (): string[] => {
    return Object.keys(directoriesConfig);
  },

  getConfigByEndpoint: (endpoint: string): DirectoryConfig | undefined => {
    return Object.values(directoriesConfig).find(config => config.endpoint === endpoint);
  },
};
