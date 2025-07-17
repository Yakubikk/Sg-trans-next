#!/bin/bash

# Скрипты для управления PM2 приложением

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
log() {
    echo -e "${GREEN}[PM2]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[PM2]${NC} $1"
}

error() {
    echo -e "${RED}[PM2]${NC} $1"
}

info() {
    echo -e "${BLUE}[PM2]${NC} $1"
}

# Проверка наличия PM2
check_pm2() {
    if ! command -v pm2 &> /dev/null; then
        error "PM2 не установлен. Установите его командой: npm install -g pm2"
        exit 1
    fi
}

# Функция для сборки приложения
build() {
    log "Сборка приложения..."
    npm run build
    if [ $? -eq 0 ]; then
        log "Сборка завершена успешно"
    else
        error "Ошибка при сборке приложения"
        exit 1
    fi
}

# Функция для старта приложения
start() {
    check_pm2
    log "Запуск приложения в production режиме..."
    
    # Сборка перед запуском
    build
    
    # Запуск через PM2
    pm2 start ecosystem.config.js --env production
    
    if [ $? -eq 0 ]; then
        log "Приложение запущено успешно"
        pm2 status
    else
        error "Ошибка при запуске приложения"
        exit 1
    fi
}

# Функция для запуска в development режиме
start_dev() {
    check_pm2
    log "Запуск приложения в development режиме..."
    pm2 start ecosystem.config.js --env development
    
    if [ $? -eq 0 ]; then
        log "Приложение запущено в development режиме"
        pm2 status
    else
        error "Ошибка при запуске приложения"
        exit 1
    fi
}

# Функция для запуска в staging режиме
start_staging() {
    check_pm2
    log "Запуск приложения в staging режиме..."
    
    # Сборка перед запуском
    build
    
    pm2 start ecosystem.config.js --env staging
    
    if [ $? -eq 0 ]; then
        log "Приложение запущено в staging режиме"
        pm2 status
    else
        error "Ошибка при запуске приложения"
        exit 1
    fi
}

# Функция для остановки приложения
stop() {
    check_pm2
    log "Остановка приложения..."
    pm2 stop sg-trans-frontend
    
    if [ $? -eq 0 ]; then
        log "Приложение остановлено"
    else
        warn "Приложение уже остановлено или не найдено"
    fi
}

# Функция для рестарта приложения
restart() {
    check_pm2
    log "Перезапуск приложения..."
    pm2 restart sg-trans-frontend
    
    if [ $? -eq 0 ]; then
        log "Приложение перезапущено"
        pm2 status
    else
        error "Ошибка при перезапуске приложения"
        exit 1
    fi
}

# Функция для reload (graceful restart)
reload() {
    check_pm2
    log "Graceful reload приложения..."
    pm2 reload sg-trans-frontend
    
    if [ $? -eq 0 ]; then
        log "Приложение перезагружено"
        pm2 status
    else
        error "Ошибка при перезагрузке приложения"
        exit 1
    fi
}

# Функция для удаления приложения из PM2
delete() {
    check_pm2
    log "Удаление приложения из PM2..."
    pm2 delete sg-trans-frontend
    
    if [ $? -eq 0 ]; then
        log "Приложение удалено из PM2"
    else
        warn "Приложение не найдено в PM2"
    fi
}

# Функция для просмотра статуса
status() {
    check_pm2
    pm2 status sg-trans-frontend
}

# Функция для просмотра логов
logs() {
    check_pm2
    pm2 logs sg-trans-frontend
}

# Функция для просмотра мониторинга
monitor() {
    check_pm2
    pm2 monit
}

# Функция для деплоя
deploy() {
    check_pm2
    if [ -z "$1" ]; then
        error "Укажите окружение для деплоя: production или staging"
        exit 1
    fi
    
    log "Деплой на $1..."
    pm2 deploy ecosystem.config.js "$1"
}

# Функция для показа справки
help() {
    echo -e "${BLUE}Доступные команды:${NC}"
    echo ""
    echo -e "${GREEN}build${NC}           - Сборка приложения"
    echo -e "${GREEN}start${NC}           - Запуск в production режиме"
    echo -e "${GREEN}start:dev${NC}       - Запуск в development режиме"
    echo -e "${GREEN}start:staging${NC}   - Запуск в staging режиме"
    echo -e "${GREEN}stop${NC}            - Остановка приложения"
    echo -e "${GREEN}restart${NC}         - Перезапуск приложения"
    echo -e "${GREEN}reload${NC}          - Graceful reload приложения"
    echo -e "${GREEN}delete${NC}          - Удаление приложения из PM2"
    echo -e "${GREEN}status${NC}          - Статус приложения"
    echo -e "${GREEN}logs${NC}            - Просмотр логов"
    echo -e "${GREEN}monitor${NC}         - Мониторинг приложения"
    echo -e "${GREEN}deploy <env>${NC}    - Деплой (production|staging)"
    echo -e "${GREEN}help${NC}            - Показать эту справку"
    echo ""
    echo -e "${YELLOW}Примеры:${NC}"
    echo -e "  ./pm2.sh start"
    echo -e "  ./pm2.sh deploy production"
    echo -e "  ./pm2.sh logs"
}

# Основная логика
case "$1" in
    "build")
        build
        ;;
    "start")
        start
        ;;
    "start:dev")
        start_dev
        ;;
    "start:staging")
        start_staging
        ;;
    "stop")
        stop
        ;;
    "restart")
        restart
        ;;
    "reload")
        reload
        ;;
    "delete")
        delete
        ;;
    "status")
        status
        ;;
    "logs")
        logs
        ;;
    "monitor")
        monitor
        ;;
    "deploy")
        deploy "$2"
        ;;
    "help"|"--help"|"-h")
        help
        ;;
    *)
        error "Неизвестная команда: $1"
        help
        exit 1
        ;;
esac
