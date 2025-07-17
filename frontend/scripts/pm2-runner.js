#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Определение команд и их соответствие
const PM2_COMMANDS = {
  start: 'start',
  stop: 'stop',
  restart: 'restart',
  reload: 'reload',
  delete: 'delete',
  status: 'status',
  logs: 'logs',
  monit: 'monit'
};

// Определение OS
const isWindows = process.platform === 'win32';
const isMacOS = process.platform === 'darwin';

// Получение команды из аргументов
const command = process.argv[2];
const extraArgs = process.argv.slice(3);

// Цветная консоль
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  log(`❌ Error: ${message}`, 'red');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Проверка наличия PM2
function checkPM2Installation() {
  return new Promise((resolve) => {
    const pm2Command = isWindows ? 'pm2.cmd' : 'pm2';
    const checkProcess = spawn(pm2Command, ['--version'], { 
      stdio: 'pipe',
      shell: isWindows 
    });

    checkProcess.on('close', (code) => {
      resolve(code === 0);
    });

    checkProcess.on('error', () => {
      resolve(false);
    });
  });
}

// Проверка наличия конфигурационного файла
function findConfigFile() {
  const possibleConfigs = [
    'ecosystem.config.js',
    'ecosystem.config.json',
    'pm2.config.js',
    'pm2.config.json'
  ];

  for (const config of possibleConfigs) {
    const configPath = path.join(process.cwd(), config);
    if (fs.existsSync(configPath)) {
      return config;
    }
  }
  return null;
}

// Выполнение PM2 команды
function runPM2Command(pm2Command, args = []) {
  return new Promise((resolve, reject) => {
    const execCommand = isWindows ? 'pm2.cmd' : 'pm2';
    const fullArgs = [pm2Command, ...args];
    
    logInfo(`Executing: ${execCommand} ${fullArgs.join(' ')}`);
    
    const process = spawn(execCommand, fullArgs, {
      stdio: 'inherit',
      shell: isWindows
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`PM2 command failed with exit code ${code}`));
      }
    });

    process.on('error', (error) => {
      reject(error);
    });
  });
}

// Основная функция
async function main() {
  log('🚀 PM2 Cross-Platform Runner', 'bold');
  log(`Platform: ${process.platform} (${isWindows ? 'Windows' : isMacOS ? 'macOS' : 'Linux'})`, 'cyan');

  if (!command || !PM2_COMMANDS[command]) {
    logError('Invalid command. Available commands:');
    Object.keys(PM2_COMMANDS).forEach(cmd => {
      console.log(`  - ${cmd}`);
    });
    process.exit(1);
  }

  // Проверка установки PM2
  const pm2Installed = await checkPM2Installation();
  if (!pm2Installed) {
    logError('PM2 is not installed or not found in PATH');
    logInfo('Install PM2 globally: npm install -g pm2');
    process.exit(1);
  }

  logSuccess('PM2 is installed');

  try {
    switch (command) {
      case 'start':
        const configFile = findConfigFile();
        if (configFile) {
          logInfo(`Using config file: ${configFile}`);
          await runPM2Command('start', [configFile, ...extraArgs]);
        } else {
          logWarning('No PM2 config file found, starting with package.json');
          await runPM2Command('start', ['package.json', ...extraArgs]);
        }
        logSuccess('Application started successfully');
        break;

      case 'stop':
        await runPM2Command('stop', ['all', ...extraArgs]);
        logSuccess('Application stopped successfully');
        break;

      case 'restart':
        await runPM2Command('restart', ['all', ...extraArgs]);
        logSuccess('Application restarted successfully');
        break;

      case 'reload':
        await runPM2Command('reload', ['all', ...extraArgs]);
        logSuccess('Application reloaded successfully');
        break;

      case 'delete':
        await runPM2Command('delete', ['all', ...extraArgs]);
        logSuccess('Application deleted from PM2');
        break;

      case 'status':
        await runPM2Command('status', extraArgs);
        break;

      case 'logs':
        await runPM2Command('logs', extraArgs);
        break;

      case 'monit':
        await runPM2Command('monit', extraArgs);
        break;

      default:
        logError(`Command ${command} not implemented`);
        process.exit(1);
    }
  } catch (error) {
    logError(`Failed to execute PM2 command: ${error.message}`);
    process.exit(1);
  }
}

// Обработка необработанных ошибок
process.on('unhandledRejection', (reason, promise) => {
  logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logError(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

// Запуск
main().catch((error) => {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
});
