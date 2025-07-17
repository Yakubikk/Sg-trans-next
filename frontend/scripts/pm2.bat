@echo off
REM PM2 Management Batch Script for Windows
REM Usage: pm2.bat <command> [args]

setlocal enabledelayedexpansion

if "%1"=="" (
    echo Error: No command specified
    echo Usage: %0 ^<command^> [args]
    echo Commands: start, stop, restart, reload, delete, status, logs, monit
    exit /b 1
)

set "COMMAND=%1"
set "EXTRA_ARGS="

REM Collect extra arguments
shift
:collect_args
if "%1"=="" goto args_done
set "EXTRA_ARGS=!EXTRA_ARGS! %1"
shift
goto collect_args
:args_done

echo [INFO] PM2 Windows Batch Manager
echo [INFO] Platform: Windows Command Prompt
echo [INFO] Command: %COMMAND%

REM Check if PM2 is installed
pm2 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] PM2 is not installed or not found in PATH
    echo [INFO] Install PM2 globally: npm install -g pm2
    exit /b 1
)

echo [SUCCESS] PM2 is installed

REM Find config file
set "CONFIG_FILE="
if exist "ecosystem.config.js" set "CONFIG_FILE=ecosystem.config.js"
if exist "ecosystem.config.json" set "CONFIG_FILE=ecosystem.config.json"
if exist "pm2.config.js" set "CONFIG_FILE=pm2.config.js"
if exist "pm2.config.json" set "CONFIG_FILE=pm2.config.json"

REM Execute command
if "%COMMAND%"=="start" (
    if defined CONFIG_FILE (
        echo [INFO] Using config file: !CONFIG_FILE!
        pm2 start !CONFIG_FILE! !EXTRA_ARGS!
    ) else (
        echo [WARNING] No PM2 config file found, starting with package.json
        pm2 start package.json !EXTRA_ARGS!
    )
    if !errorlevel! equ 0 echo [SUCCESS] Application started successfully
) else if "%COMMAND%"=="stop" (
    pm2 stop all !EXTRA_ARGS!
    if !errorlevel! equ 0 echo [SUCCESS] Application stopped successfully
) else if "%COMMAND%"=="restart" (
    pm2 restart all !EXTRA_ARGS!
    if !errorlevel! equ 0 echo [SUCCESS] Application restarted successfully
) else if "%COMMAND%"=="reload" (
    pm2 reload all !EXTRA_ARGS!
    if !errorlevel! equ 0 echo [SUCCESS] Application reloaded successfully
) else if "%COMMAND%"=="delete" (
    pm2 delete all !EXTRA_ARGS!
    if !errorlevel! equ 0 echo [SUCCESS] Application deleted from PM2
) else if "%COMMAND%"=="status" (
    pm2 status !EXTRA_ARGS!
) else if "%COMMAND%"=="logs" (
    pm2 logs !EXTRA_ARGS!
) else if "%COMMAND%"=="monit" (
    pm2 monit !EXTRA_ARGS!
) else (
    echo [ERROR] Unknown command: %COMMAND%
    echo Available commands: start, stop, restart, reload, delete, status, logs, monit
    exit /b 1
)

exit /b %errorlevel%
