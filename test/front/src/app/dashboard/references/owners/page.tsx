'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { ownersService } from '@/lib/api/services';

export default function OwnersPage() {
  return (
    <ReferencePage
      title="Владельцы"
      description="Управление справочником владельцев вагонов"
      queryKey="owners"
      service={ownersService}
    />
  );
}
