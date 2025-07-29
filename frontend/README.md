Это проект [Next.js](https://nextjs.org), созданный с помощью [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Начало работы

Сначала запустите сервер разработки:

```bash
npm run dev
# или
yarn dev
# или
pnpm dev
# или
bun dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы увидеть результат.

Вы можете начать редактировать страницу, изменив файл `app/page.tsx`. Страница автоматически обновляется при редактировании файла.

Этот проект использует [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) для автоматической оптимизации и загрузки [Geist](https://vercel.com/font) - нового семейства шрифтов от Vercel.

## Конфигурация

### Переменные окружения

Проект использует переменные окружения для конфигурации. Скопируйте `.env.example` в `.env` и настройте под ваше окружение:

```bash
cp .env.example .env
```

Доступные переменные:
- `NEXT_PUBLIC_API_BASE_URL` - Базовый URL для API (по умолчанию: http://vagon.sgtrans.by:5000/api)
- `NEXT_PUBLIC_AUTH_BASE_URL` - Базовый URL для аутентификации (по умолчанию: http://vagon.sgtrans.by:5000)
- `NEXT_PUBLIC_API_TIMEOUT` - Таймаут запросов в миллисекундах (по умолчанию: 10000)

**Важно**: Файл `.env` не добавляется в git. Используйте `.env.example` как шаблон для настройки переменных в разных окружениях.

## Продакшн деплой с PM2

Этот проект включает в себя комплексную конфигурацию PM2 для продакшн деплоя на разных платформах.

### Быстрый старт
```bash
# Установка зависимостей и сборка
npm ci
npm run build

# Запуск с PM2 (работает на Windows, Linux, macOS)
npm run pm2:start

# Просмотр статуса
npm run pm2:status

# Просмотр логов
npm run pm2:logs

# Остановка приложения
npm run pm2:stop
```

### Доступные команды PM2
- `npm run pm2:start` - Запуск приложения
- `npm run pm2:stop` - Остановка приложения
- `npm run pm2:restart` - Перезапуск приложения
- `npm run pm2:reload` - Graceful перезагрузка (без простоя)
- `npm run pm2:delete` - Удаление из PM2
- `npm run pm2:status` - Показать статус процессов
- `npm run pm2:logs` - Показать логи приложения
- `npm run pm2:monitor` - Открыть интерфейс мониторинга

### Платформо-специфичные скрипты
- **Windows**: PowerShell скрипт (`scripts/pm2.ps1`) и Batch файл (`scripts/pm2.bat`)
- **Linux/macOS**: Shell скрипт (`scripts/pm2.sh`)
- **Кросс-платформенный**: Node.js runner (`scripts/pm2-runner.js`)

### Документация
- [Руководство по деплою на Windows Server](./WINDOWS_DEPLOYMENT.md) - Комплексная настройка Windows Server
- [Примеры использования PM2](./PM2_USAGE_EXAMPLES.md) - Подробные примеры для всех платформ

### Возможности API
Этот проект включает модульную структуру API с:
- Универсальной обработкой ошибок с Axios интерцепторами
- Toast уведомлениями для обратной связи с пользователем
- TypeScript интерфейсами, соответствующими C# моделям бэкенда
- Организованными модулями API в директории `src/api/`

## Узнать больше

Чтобы узнать больше о Next.js, изучите следующие ресурсы:

- [Документация Next.js](https://nextjs.org/docs) - узнайте о возможностях и API Next.js.
- [Изучение Next.js](https://nextjs.org/learn) - интерактивный учебник по Next.js.

Посетите [GitHub репозиторий Next.js](https://github.com/vercel/next.js) - ваши отзывы и вклад в разработку приветствуются!

## Деплой на Vercel

Самый простой способ развернуть ваше Next.js приложение - использовать [платформу Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) от создателей Next.js.

Ознакомьтесь с [документацией по деплою Next.js](https://nextjs.org/docs/app/building-your-application/deploying) для получения более подробной информации.
