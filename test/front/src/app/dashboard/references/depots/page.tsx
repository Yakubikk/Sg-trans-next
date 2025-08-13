'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { depotsService } from '@/lib/api/services';

export default function DepotsPage() {
  return (
    <ReferencePage
      title="Депо"
      description="Управление справочником депо и мастерских"
      queryKey="depots"
      service={depotsService}
    />
  );
}
