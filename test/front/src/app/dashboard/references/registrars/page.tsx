'use client';

import { ReferencePage } from '@/components/common/reference-page';
import { registrarsService } from '@/lib/api/services';

export default function RegistrarsPage() {
  return (
    <ReferencePage
      title="Регистраторы"
      description="Управление справочником регистрирующих организаций"
      queryKey="registrars"
      service={registrarsService}
    />
  );
}
