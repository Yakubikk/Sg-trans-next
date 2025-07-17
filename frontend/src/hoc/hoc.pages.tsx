import { ProtectedPageComponent } from "@/components";
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
      <ProtectedPageComponent {...config}>
        <Component {...props} />
      </ProtectedPageComponent>
    );
  };
}
