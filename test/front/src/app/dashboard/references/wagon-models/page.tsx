'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { wagonModelsService } from '@/lib/api/services';

export default function WagonModelsPage() {
  return (
    <ReferencePage
      title="Модели вагонов"
      description="Управление справочником моделей вагонов"
      queryKey="wagon-models"
      service={wagonModelsService}
    />
  );
}
