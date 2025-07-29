/**
 * Централизованная конфигурация API
 * Позволяет легко управлять настройками для всех API инстансов
 */

export const API_CONFIG = {
  // Базовые настройки
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://vagon.sgtrans.by:5000/api',
  timeout: 10000,
  
  // Настройки для разных окружений
  development: {
    baseURL: 'http://vagon.sgtrans.by:5000/api',
    timeout: 15000,
  },
  
  production: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://vagon.sgtrans.by:5000/api',
    timeout: 8000,
  },
  
  // Настройки для конкретных API
  references: {
    timeout: 12000,
  },
  
  users: {
    timeout: 8000,
  },
} as const;

/**
 * Получить конфигурацию для текущего окружения
 */
export function getApiConfig() {
  const env = process.env.NODE_ENV;
  const envConfig = env === 'production' ? API_CONFIG.production : API_CONFIG.development;
  
  return {
    ...API_CONFIG,
    ...envConfig,
  };
}

/**
 * Получить конфигурацию для конкретного API
 */
export function getApiConfigForModule(module: keyof typeof API_CONFIG) {
  const baseConfig = getApiConfig();
  const moduleConfig = API_CONFIG[module];
  
  if (typeof moduleConfig === 'object') {
    return {
      ...baseConfig,
      ...moduleConfig,
    };
  }
  
  return baseConfig;
}
