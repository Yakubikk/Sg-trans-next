'use client';

import { CisternMileageTable } from '@/components/data/vehicles';
import { InteractiveMap } from '@/components/common';

interface CisternLocationClientProps {
  cisternNumber: string;
}

export default function CisternLocationClient({ cisternNumber }: CisternLocationClientProps) {
  // В реальном приложении cisternId можно получить из API по номеру цистерны
  // Пока используем заглушку
  const cisternId = "a242aa00-fb83-4b7f-87f7-d11a2c354467";

  return (
    <div className="space-y-8">
      {/* Таблица пробегов цистерны */}
      <CisternMileageTable 
        cisternId={cisternId} 
        cisternNumber={cisternNumber} 
      />
      
      {/* Интерактивная карта */}
      <InteractiveMap 
        cisternNumber={cisternNumber}
        className="min-h-[500px]"
      />
    </div>
  );
}

export type { CisternLocationClientProps };
