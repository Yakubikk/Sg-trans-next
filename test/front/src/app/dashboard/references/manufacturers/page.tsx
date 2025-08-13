'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { manufacturersService } from '@/lib/api/services';

export default function ManufacturersPage() {
  return (
    <ReferencePage
      title="Производители"
      description="Управление справочником производителей вагонов"
      queryKey="manufacturers"
      service={manufacturersService}
    />
  );
}
