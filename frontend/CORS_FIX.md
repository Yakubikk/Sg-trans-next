# CORS Troubleshooting Guide

## Проблема
```
Access to XMLHttpRequest at 'vagon.sgtrans.by:5000/users/login' from origin 'http://192.168.100.33:3000' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: brave, chrome, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
```

## Причина
URL API не содержал протокол `http://`, что вызывало ошибки CORS.

## Исправления

### 1. Обновлены конфигурации API
- `src/api/core/apiInstance.ts` - добавлены fallback URL с протоколом
- `src/config/api.ts` - обновлены базовые URL

### 2. Добавлены переменные окружения
- `.env.local` - локальные настройки
- `.env.example` - пример конфигурации

### 3. Обновлен Next.js конфиг
- `next.config.ts` - добавлена поддержка переменных окружения

### 4. Улучшен обработчик ошибок
- `src/api/core/errorHandler.ts` - добавлена обработка CORS ошибок

## Переменные окружения
```bash
NEXT_PUBLIC_API_BASE_URL=http://vagon.sgtrans.by:5000/api
NEXT_PUBLIC_AUTH_BASE_URL=http://vagon.sgtrans.by:5000/api
NEXT_PUBLIC_API_TIMEOUT=10000
```

## Проверка
После применения изменений:
1. Перезапустите Next.js сервер
2. Проверьте в браузере Network tab
3. URL должен содержать `http://vagon.sgtrans.by:5000/api/users/login`

## Дополнительные настройки сервера
Если проблема сохраняется, убедитесь что на сервере настроено:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.100.33:3000'],
  credentials: true
}));
```
