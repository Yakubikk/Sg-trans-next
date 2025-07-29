import { ProtectedPageComponent } from '@/components';
import { OwnersPageClient } from '@/components';

export default function OwnersPage() {
  return (
    <ProtectedPageComponent requiredRoles={["Admin", "User"]}>
      <OwnersPageClient />
    </ProtectedPageComponent>
  );
}
