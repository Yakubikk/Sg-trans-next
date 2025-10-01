import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Factory } from 'lucide-react';

interface ManufacturerCardProps {
  manufacturerName?: string;
  typeName?: string;
  modelName?: string;
}

export function ManufacturerCard({ manufacturerName, typeName, modelName }: ManufacturerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Factory className="h-5 w-5" />
          Производитель и модель
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-500">Производитель</div>
          <div className="text-lg">{manufacturerName}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">Тип вагона</div>
          <div className="text-lg">{typeName}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">Модель</div>
          <div className="text-lg">{modelName || 'Не указана'}</div>
        </div>
      </CardContent>
    </Card>
  );
}
