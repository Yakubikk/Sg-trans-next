'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { affiliationsService } from '@/lib/api/services';

export default function AffiliationsPage() {
  return (
    <ReferencePage
      title="Принадлежности"
      description="Управление справочником принадлежностей и организаций"
      queryKey="affiliations"
      service={affiliationsService}
    />
  );
}
