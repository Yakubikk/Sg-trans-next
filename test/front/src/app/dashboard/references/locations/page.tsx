'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { locationsService } from '@/lib/api/services';

export default function LocationsPage() {
  return (
    <ReferencePage
      title="Местоположения"
      description="Управление справочником географических местоположений"
      queryKey="locations"
      service={locationsService}
    />
  );
}
