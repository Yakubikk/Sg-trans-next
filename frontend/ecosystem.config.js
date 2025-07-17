module.exports = {
  apps: [
    {
      name: 'sg-trans-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/home/yakubikk/SG/Sg-trans-next/frontend',
      instances: 'max', // Использовать все доступные CPU
      exec_mode: 'cluster',
      
      // Переменные окружения
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1
      },
      env_staging: {
        NODE_ENV: 'production',
        PORT: 3001,
        NEXT_TELEMETRY_DISABLED: 1
      },
      
      // Логирование
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/sg-trans-frontend-error.log',
      out_file: './logs/sg-trans-frontend-out.log',
      log_file: './logs/sg-trans-frontend-combined.log',
      time: true,
      merge_logs: true,
      
      // Мониторинг и рестарт
      autorestart: true,
      watch: false, // Отключено для production
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 5,
      restart_delay: 4000,
      
      // Node.js настройки
      node_args: '--max_old_space_size=4096',
      
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      
      // Health check
      health_check_url: 'http://localhost:3000/api/health',
      health_check_grace_period: 30000
    }
  ],
  
  // Deployment configuration
  deploy: {
    production: {
      user: 'deploy',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'https://github.com/Yakubikk/Sg-trans-next.git',
      path: '/var/www/sg-trans-next',
      'pre-deploy-local': '',
      'post-deploy': 'cd frontend && npm ci && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      env: {
        NODE_ENV: 'production'
      }
    },
    staging: {
      user: 'deploy',
      host: 'staging-server.com', 
      ref: 'origin/develop',
      repo: 'https://github.com/Yakubikk/Sg-trans-next.git',
      path: '/var/www/sg-trans-next-staging',
      'post-deploy': 'cd frontend && npm ci && npm run build && pm2 reload ecosystem.config.js --env staging',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
