// lib/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Railway Cisterns API',
      version: '1.0.0',
      description: 'API для управления вагонами-цистернами железнодорожного транспорта',
      contact: {
        name: 'API Support',
        email: 'support@railwayapi.com',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-domain.com' 
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT токен для авторизации',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            patronymic: { type: 'string' },
            phoneNumber: { type: 'string' },
          },
        },
        RailwayCistern: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            number: { type: 'string', description: 'Номер цистерны' },
            buildDate: { type: 'string', format: 'date' },
            tareWeight: { type: 'number', description: 'Масса тары' },
            loadCapacity: { type: 'number', description: 'Грузоподъемность' },
            length: { type: 'integer', description: 'Длина в мм' },
            axleCount: { type: 'integer', description: 'Количество осей' },
            volume: { type: 'number', description: 'Объем' },
            manufacturer: { $ref: '#/components/schemas/Manufacturer' },
            wagonType: { $ref: '#/components/schemas/WagonType' },
          },
        },
        Manufacturer: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', description: 'Название производителя' },
            country: { type: 'string', description: 'Страна' },
            shortName: { type: 'string', description: 'Краткое название' },
            code: { type: 'integer', description: 'Код производителя' },
          },
        },
        WagonType: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', description: 'Название типа вагона' },
            type: { type: 'string', description: 'Код типа' },
          },
        },
        SavedFilter: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', description: 'Название фильтра' },
            filterJson: { type: 'string', description: 'JSON параметров фильтра' },
            sortFieldsJson: { type: 'string', description: 'JSON параметров сортировки' },
            userId: { type: 'string', format: 'uuid', description: 'ID пользователя' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Affiliation: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            value: { type: 'string', description: 'Значение принадлежности' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            code: { type: 'string' },
          },
        },
      },
      responses: {
        Unauthorized: {
          description: 'Не авторизован',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        NotFound: {
          description: 'Ресурс не найден',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        ValidationError: {
          description: 'Ошибка валидации',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/app/api/**/*.ts',
    './src/app/api/auth/**/*.ts',
    './src/app/api/directories/**/*.ts',
    './src/app/api/railway-cisterns/**/*.ts',
    './src/app/api/user/**/*.ts',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
