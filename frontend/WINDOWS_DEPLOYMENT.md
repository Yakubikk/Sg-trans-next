# Windows Server Deployment Guide

Это руководство описывает процесс развертывания Next.js приложения на Windows Server с использованием PM2.

## Предварительные требования

### 1. Установка Node.js
- Скачайте Node.js LTS версию с [официального сайта](https://nodejs.org/)
- Установите Node.js (рекомендуется версия 18 или выше)
- Проверьте установку:
```cmd
node --version
npm --version
```

### 2. Установка PM2
```cmd
npm install -g pm2
npm install -g pm2-windows-service
```

### 3. Установка зависимостей приложения
```cmd
cd C:\path\to\your\app
npm install
npm run build
```

## Способы запуска PM2

### Способ 1: Использование npm скриптов (рекомендуется)
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
```

### Способ 2: Использование PowerShell скрипта
```powershell
# Открыть PowerShell как администратор
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Запуск команд
.\scripts\pm2.ps1 start
.\scripts\pm2.ps1 stop
.\scripts\pm2.ps1 restart
.\scripts\pm2.ps1 status
.\scripts\pm2.ps1 logs
```

### Способ 3: Использование batch файла
```cmd
# Запуск из командной строки
scripts\pm2.bat start
scripts\pm2.bat stop
scripts\pm2.bat restart
scripts\pm2.bat status
scripts\pm2.bat logs
```

## Настройка Windows Service

### Установка PM2 как Windows Service
```cmd
# Установить PM2 как службу Windows
pm2-service-install

# Установить текущие процессы в автозапуск
pm2 save

# Запустить службу
pm2 startup
```

### Управление службой через Services.msc
1. Откройте `services.msc`
2. Найдите службу "PM2"
3. Настройте автоматический запуск
4. Установите учетную запись для службы

## Конфигурация IIS (если используется)

### Установка iisnode
1. Скачайте [iisnode](https://github.com/Azure/iisnode)
2. Установите iisnode для вашей версии IIS

### Настройка web.config
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server.js\/debug[\/]?" />
        </rule>
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server.js"/>
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>
    <httpErrors existingResponse="PassThrough" />
    <iisnode watchedFiles="web.config;*.js"/>
  </system.webServer>
</configuration>
```

## Мониторинг и логирование

### PM2 Monitoring
```cmd
# Открыть веб-интерфейс мониторинга
pm2 monit

# Просмотр логов в реальном времени
pm2 logs

# Просмотр конкретного процесса
pm2 logs app-name

# Очистка логов
pm2 flush
```

### Windows Event Logs
PM2 автоматически записывает события в Windows Event Log при работе как служба.

## Безопасность

### Настройка брандмауэра
```cmd
# Открыть порт для приложения (например, 3000)
netsh advfirewall firewall add rule name="Next.js App" dir=in action=allow protocol=TCP localport=3000
```

### Настройка прав доступа
1. Создайте отдельного пользователя для приложения
2. Назначьте минимальные необходимые права
3. Настройте службу PM2 для работы под этим пользователем

## Troubleshooting

### Проблема: PM2 не запускается
**Решение:**
```cmd
# Проверить статус службы
sc query PM2

# Перезапустить службу
sc stop PM2
sc start PM2

# Переустановить службу
pm2-service-uninstall
pm2-service-install
```

### Проблема: Приложение недоступно извне
**Решение:**
1. Проверьте настройки брандмауэра
2. Убедитесь, что приложение слушает на правильном порту
3. Проверьте привязку к 0.0.0.0, а не localhost

### Проблема: Высокое потребление памяти
**Решение:**
```javascript
// Обновите ecosystem.config.js
module.exports = {
  apps: [{
    name: 'sg-trans-frontend',
    script: 'server.js',
    instances: 1,
    exec_mode: 'cluster',
    max_memory_restart: '500M',
    node_args: '--max-old-space-size=512'
  }]
}
```

## Полезные команды

```cmd
# Проверка версий
node --version
npm --version
pm2 --version

# Информация о системе
systeminfo
wmic cpu get name
wmic computersystem get TotalPhysicalMemory

# Проверка портов
netstat -an | findstr :3000

# Проверка процессов
tasklist | findstr node
tasklist | findstr pm2
```

## Автоматизация развертывания

Создайте PowerShell скрипт для автоматического развертывания:

```powershell
# deploy.ps1
param(
    [string]$AppPath = "C:\Apps\sg-trans-frontend"
)

Write-Host "Starting deployment..." -ForegroundColor Green

# Остановить приложение
& npm run pm2:stop

# Обновить код (если используется Git)
git pull origin main

# Установить зависимости
npm ci

# Собрать приложение
npm run build

# Запустить приложение
& npm run pm2:start

Write-Host "Deployment completed!" -ForegroundColor Green
```

## Мониторинг производительности

### Интеграция с Windows Performance Toolkit
```cmd
# Установка Windows Performance Toolkit
# Загрузите Windows SDK

# Сбор данных производительности
wpr -start CPU.wprp
# ... работа приложения ...
wpr -stop performance.etl
```

### Использование PM2 Plus (опционально)
```cmd
# Регистрация в PM2 Plus
pm2 register

# Связывание сервера
pm2 link <secret> <public>
```

Этот файл содержит все необходимые инструкции для успешного развертывания на Windows Server.
