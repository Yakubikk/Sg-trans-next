import { ProtectedComponent } from "@/components/ProtectedComponent";
import { Permission, Role } from "@/types/permissions";

// HOC для защиты страниц
export function withRoleProtection<T extends object>(
  Component: React.ComponentType<T>,
  config: {
    requiredPermissions?: Permission[];
    requiredRoles?: Role[];
    fallbackPath?: string;
  } = {}
) {
  return function ProtectedPage(props: T) {
    return (
      <ProtectedComponent {...config}>
        <Component {...props} />
      </ProtectedComponent>
    );
  };
}
