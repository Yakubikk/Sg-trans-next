import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { History, Clock } from 'lucide-react';

export function HistoryTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Журнал изменений
          </CardTitle>
          <CardDescription>
            История всех изменений данных цистерны
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">Создание записи</div>
                <div className="text-sm text-gray-500">Первоначальное добавление цистерны в систему</div>
                <div className="text-xs text-gray-400 mt-1">Сегодня в 10:30</div>
              </div>
            </div>
            
            <div className="text-center py-8 text-gray-500">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Дополнительные записи истории появятся здесь</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}