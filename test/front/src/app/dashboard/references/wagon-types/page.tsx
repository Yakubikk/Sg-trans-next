'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { wagonTypesService } from '@/lib/api/services';

export default function WagonTypesPage() {
  return (
    <ReferencePage
      title="Типы вагонов"
      description="Управление справочником типов железнодорожных вагонов"
      queryKey="wagon-types"
      service={wagonTypesService}
    />
  );
}
