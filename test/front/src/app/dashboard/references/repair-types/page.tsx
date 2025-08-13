'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { repairTypesService } from '@/lib/api/services';

export default function RepairTypesPage() {
  return (
    <ReferencePage
      title="Типы ремонта"
      description="Управление справочником типов ремонтных работ"
      queryKey="repair-types"
      service={repairTypesService}
    />
  );
}
