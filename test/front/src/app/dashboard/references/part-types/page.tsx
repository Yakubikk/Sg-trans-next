'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { partTypesService } from '@/lib/api/services';

export default function PartTypesPage() {
  return (
    <ReferencePage
      title="Типы деталей"
      description="Управление справочником типов запасных частей"
      queryKey="part-types"
      service={partTypesService}
    />
  );
}
