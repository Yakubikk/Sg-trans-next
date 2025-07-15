import { ProtectedPageComponent } from '@/components/ProtectedPage';
import UserManagement from '@/components/UserManagement';
import { Permission, Role } from '@/types/permissions';

export default function UsersPage() {
  return (
    <ProtectedPageComponent
      requiredPermissions={[Permission.VIEW_USERS]}
      requiredRoles={[Role.ADMIN]}
    >
      <div className="min-h-screen bg-gray-50">
        <UserManagement />
      </div>
    </ProtectedPageComponent>
  );
}
