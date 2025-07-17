# PM2 Scripts Usage Examples

Этот файл содержит примеры использования всех созданных скриптов для управления PM2 на разных платформах.

## 🖥️ Windows Server

### Использование npm скриптов (рекомендуется)
```cmd
# Запуск приложения
npm run pm2:start

# Остановка приложения  
npm run pm2:stop

# Перезапуск приложения
npm run pm2:restart

# Просмотр статуса
npm run pm2:status

# Просмотр логов
npm run pm2:logs

# Мониторинг
npm run pm2:monitor
```

### Использование PowerShell (для продвинутых пользователей)
```powershell
# Установка политики выполнения (один раз)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Основные команды
.\scripts\pm2.ps1 start
.\scripts\pm2.ps1 stop  
.\scripts\pm2.ps1 restart
.\scripts\pm2.ps1 reload
.\scripts\pm2.ps1 delete
.\scripts\pm2.ps1 status
.\scripts\pm2.ps1 logs
.\scripts\pm2.ps1 monit

# С дополнительными параметрами
.\scripts\pm2.ps1 start --name "my-app"
.\scripts\pm2.ps1 logs --lines 100
```

### Использование Batch файлов (базовый CMD)
```cmd
# Основные команды
scripts\pm2.bat start
scripts\pm2.bat stop
scripts\pm2.bat restart  
scripts\pm2.bat reload
scripts\pm2.bat delete
scripts\pm2.bat status
scripts\pm2.bat logs
scripts\pm2.bat monit

# С параметрами
scripts\pm2.bat start --name "my-app"
scripts\pm2.bat logs --lines 50
```

## 🐧 Linux / 🍎 macOS

### Использование npm скриптов
```bash
# Основные команды (аналогично Windows)
npm run pm2:start
npm run pm2:stop
npm run pm2:restart
npm run pm2:status
npm run pm2:logs
```

### Использование Shell скрипта
```bash
# Сделать скрипт исполняемым (один раз)
chmod +x scripts/pm2.sh

# Основные команды  
./scripts/pm2.sh start
./scripts/pm2.sh stop
./scripts/pm2.sh restart
./scripts/pm2.sh reload
./scripts/pm2.sh delete
./scripts/pm2.sh status
./scripts/pm2.sh logs
./scripts/pm2.sh monit

# С параметрами
./scripts/pm2.sh start --name "my-app"
./scripts/pm2.sh logs --lines 100
```

### Использование Node.js скрипта напрямую
```bash
# Основные команды
node scripts/pm2-runner.js start
node scripts/pm2-runner.js stop
node scripts/pm2-runner.js restart
node scripts/pm2-runner.js status
node scripts/pm2-runner.js logs

# С параметрами
node scripts/pm2-runner.js start --name "my-app"
node scripts/pm2-runner.js logs --lines 50
```

## 🔧 Расширенные примеры

### Запуск с конкретной конфигурацией
```bash
# Если есть несколько конфигов
npm run pm2:start -- ecosystem.production.config.js

# Или через скрипты
./scripts/pm2.sh start ecosystem.staging.config.js
scripts\pm2.bat start ecosystem.development.config.js
```

### Мониторинг и отладка
```bash
# Просмотр логов конкретного приложения
npm run pm2:logs -- --name "sg-trans-frontend"

# Просмотр последних 100 строк логов
npm run pm2:logs -- --lines 100

# Непрерывный мониторинг
npm run pm2:monitor

# Очистка логов
pm2 flush
```

### Работа с кластерами
```bash
# ecosystem.config.js с кластером
module.exports = {
  apps: [{
    name: 'sg-trans-frontend',
    script: 'server.js',
    instances: 'max', // или конкретное число
    exec_mode: 'cluster'
  }]
}

# Запуск кластера
npm run pm2:start

# Graceful reload (без downtime)
npm run pm2:reload
```

## 🚀 Примеры для CI/CD

### GitHub Actions (Windows Server)
```yaml
- name: Deploy with PM2
  run: |
    npm ci
    npm run build
    npm run pm2:restart
```

### PowerShell для автодеплоя
```powershell
# deploy.ps1
param(
    [string]$Branch = "main"
)

Write-Host "Deploying branch: $Branch" -ForegroundColor Green

# Остановить приложение
npm run pm2:stop

# Обновить код
git fetch origin
git checkout $Branch
git pull origin $Branch

# Установить зависимости и собрать
npm ci  
npm run build

# Запустить приложение
npm run pm2:start

Write-Host "Deployment completed!" -ForegroundColor Green
```

### Bash скрипт для Linux/macOS
```bash
#!/bin/bash
# deploy.sh

BRANCH=${1:-main}
echo "Deploying branch: $BRANCH"

# Остановить приложение
npm run pm2:stop

# Обновить код
git fetch origin
git checkout $BRANCH
git pull origin $BRANCH

# Установить зависимости и собрать
npm ci
npm run build

# Запустить приложение  
npm run pm2:start

echo "Deployment completed!"
```

## 🛠️ Troubleshooting

### Проверка статуса всех сервисов
```bash
# Универсальная команда для всех платформ
npm run pm2:status
```

### Просмотр логов при ошибках
```bash
# Последние логи
npm run pm2:logs

# Логи с фильтрацией по ошибкам
npm run pm2:logs -- --err

# Логи конкретного процесса
npm run pm2:logs -- 0  # где 0 - ID процесса
```

### Полная перезагрузка
```bash
# Остановить все процессы
npm run pm2:stop

# Удалить все процессы из PM2
npm run pm2:delete

# Запустить заново
npm run pm2:start
```

### Проверка конфигурации
```bash
# Проверить конфигурационный файл
node -c ecosystem.config.js

# Показать конфиг PM2
pm2 prettylist
```

## 📊 Мониторинг производительности

### Встроенный мониторинг PM2
```bash
# Веб-интерфейс мониторинга
npm run pm2:monitor

# Простой вывод статистики
watch -n 1 'npm run pm2:status'
```

### Логирование для анализа
```bash
# Ротация логов (настроить один раз)
pm2 install pm2-logrotate

# Настройка ротации
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

Эти примеры покрывают все основные сценарии использования PM2 скриптов на разных платформах.
