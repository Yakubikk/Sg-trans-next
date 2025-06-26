import { ProtectedComponent } from '@/components/ProtectedComponent';
import UserManagement from '@/components/UserManagement';
import { Permission, Role } from '@/types/permissions';

export default function UsersPage() {
  return (
    <ProtectedComponent
      requiredPermissions={[Permission.VIEW_USERS]}
      requiredRoles={[Role.ADMIN, Role.MANAGER]}
    >
      <div className="min-h-screen bg-gray-50">
        <UserManagement />
      </div>
    </ProtectedComponent>
  );
}
