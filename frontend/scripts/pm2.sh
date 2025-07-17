#!/bin/bash

# PM2 Management Script for Linux/macOS
# Usage: ./pm2.sh <command> [args]
# Commands: start, stop, restart, reload, delete, status, logs, monit

set -euo pipefail

# Color output functions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ Error: $1${NC}" >&2
}

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if PM2 is installed
check_pm2_installation() {
    if command -v pm2 >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Find PM2 config file
find_config_file() {
    local config_files=("ecosystem.config.js" "ecosystem.config.json" "pm2.config.js" "pm2.config.json")
    
    for config_file in "${config_files[@]}"; do
        if [[ -f "$config_file" ]]; then
            echo "$config_file"
            return
        fi
    done
    echo ""
}

# Execute PM2 command
execute_pm2_command() {
    local pm2_command="$1"
    shift
    local args=("$@")
    
    log_info "Executing: pm2 $pm2_command ${args[*]}"
    
    if pm2 "$pm2_command" "${args[@]}"; then
        return 0
    else
        log_error "PM2 command failed with exit code $?"
        return 1
    fi
}

# Main function
main() {
    local command="${1:-}"
    shift || true
    local extra_args=("$@")
    
    echo -e "${MAGENTA}🚀 PM2 Linux/macOS Shell Manager${NC}"
    log_info "Platform: $(uname -s)"
    log_info "Command: $command"
    
    # Validate command
    case "$command" in
        start|stop|restart|reload|delete|status|logs|monit)
            ;;
        "")
            log_error "No command specified"
            echo "Usage: $0 <command> [args]"
            echo "Commands: start, stop, restart, reload, delete, status, logs, monit"
            exit 1
            ;;
        *)
            log_error "Unknown command: $command"
            echo "Available commands: start, stop, restart, reload, delete, status, logs, monit"
            exit 1
            ;;
    esac
    
    # Check PM2 installation
    if ! check_pm2_installation; then
        log_error "PM2 is not installed or not found in PATH"
        log_info "Install PM2 globally: npm install -g pm2"
        exit 1
    fi
    
    log_success "PM2 is installed"
    
    # Execute command
    case "$command" in
        start)
            local config_file
            config_file=$(find_config_file)
            if [[ -n "$config_file" ]]; then
                log_info "Using config file: $config_file"
                if execute_pm2_command "start" "$config_file" "${extra_args[@]}"; then
                    log_success "Application started successfully"
                fi
            else
                log_warning "No PM2 config file found, starting with package.json"
                if execute_pm2_command "start" "package.json" "${extra_args[@]}"; then
                    log_success "Application started successfully"
                fi
            fi
            ;;
        stop)
            if execute_pm2_command "stop" "all" "${extra_args[@]}"; then
                log_success "Application stopped successfully"
            fi
            ;;
        restart)
            if execute_pm2_command "restart" "all" "${extra_args[@]}"; then
                log_success "Application restarted successfully"
            fi
            ;;
        reload)
            if execute_pm2_command "reload" "all" "${extra_args[@]}"; then
                log_success "Application reloaded successfully"
            fi
            ;;
        delete)
            if execute_pm2_command "delete" "all" "${extra_args[@]}"; then
                log_success "Application deleted from PM2"
            fi
            ;;
        status)
            execute_pm2_command "status" "${extra_args[@]}"
            ;;
        logs)
            execute_pm2_command "logs" "${extra_args[@]}"
            ;;
        monit)
            execute_pm2_command "monit" "${extra_args[@]}"
            ;;
    esac
}

# Error handling
trap 'log_error "Script failed at line $LINENO"' ERR

# Run main function
main "$@"
