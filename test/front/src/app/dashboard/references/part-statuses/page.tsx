'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { partStatusesService } from '@/lib/api/services';

export default function PartStatusesPage() {
  return (
    <ReferencePage
      title="Статусы деталей"
      description="Управление справочником статусов запасных частей"
      queryKey="part-statuses"
      service={partStatusesService}
    />
  );
}
