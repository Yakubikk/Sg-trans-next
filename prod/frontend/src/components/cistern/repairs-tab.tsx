import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Wrench, Calendar } from 'lucide-react';

export function RepairsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            История ремонтов
          </CardTitle>
          <CardDescription>
            Записи о проведенных ремонтах и техническом обслуживании
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>История ремонтов пока не ведется</p>
              <p className="text-sm mt-2">Функция будет доступна в следующих версиях</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Плановое обслуживание
          </CardTitle>
          <CardDescription>
            График предстоящих технических осмотров и ремонтов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Планирование ТО и ремонтов</p>
            <p className="text-sm mt-2">Функция в разработке</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}