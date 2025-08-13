'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Train, Database, Users, Settings } from 'lucide-react';
import Link from 'next/link';

const dashboardCards = [
  {
    title: 'Паспорта цистерн',
    description: 'Управление железнодорожными цистернами',
    icon: Train,
    href: '/dashboard/cisterns',
    color: 'bg-blue-500',
  },
  {
    title: 'Справочники',
    description: 'Управление справочными данными',
    icon: Database,
    href: '/dashboard/references',
    color: 'bg-green-500',
  },
  {
    title: 'Пользователи',
    description: 'Управление пользователями системы',
    icon: Users,
    href: '/dashboard/users',
    color: 'bg-purple-500',
  },
  {
    title: 'Настройки',
    description: 'Настройки системы',
    icon: Settings,
    href: '/dashboard/settings',
    color: 'bg-gray-500',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Панель управления
        </h1>
        <p className="text-gray-500">
          Добро пожаловать в систему управления железнодорожными цистернами SG Trans
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${card.color}`}>
                  <card.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Статистика</CardTitle>
            <CardDescription>
              Общая информация о системе
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Всего цистерн</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Активных пользователей</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Ремонтов в работе</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последние действия</CardTitle>
            <CardDescription>
              Недавние операции в системе
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <p className="text-gray-500">Данные загружаются...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
