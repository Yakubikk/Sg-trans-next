export const Role = {
  ADMIN: "Admin",
  USER: "User",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const Permission = {
  // Пользователи
  VIEW_USERS: "view_users",
  CREATE_USER: "create_user",
  EDIT_USER: "edit_user",
  DELETE_USER: "delete_user",

  // Данные
  VIEW_DATA: "view_data",
  CREATE_DATA: "create_data",
  EDIT_DATA: "edit_data",
  DELETE_DATA: "delete_data",

  // Административные функции
  VIEW_DASHBOARD: "view_dashboard",
  VIEW_ANALYTICS: "view_analytics",
  MANAGE_SYSTEM: "manage_system",
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

// Определяем какие разрешения имеет каждая роль
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    // Админ имеет все разрешения
    Permission.VIEW_USERS,
    Permission.CREATE_USER,
    Permission.EDIT_USER,
    Permission.DELETE_USER,
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_SYSTEM,
  ],

  [Role.USER]: [
    // Обычный пользователь имеет доступ к данным
    Permission.VIEW_USERS,
    Permission.VIEW_DATA,
    Permission.CREATE_DATA,
    Permission.EDIT_DATA,
    Permission.DELETE_DATA,
    Permission.VIEW_ANALYTICS,
  ],
};

export interface RoleBasedComponent {
  requiredPermissions?: Permission[];
  requiredRoles?: Role[];
  fallbackPath?: string;
  children: React.ReactNode;
}

export interface RoleBasedRoute {
  requiredPermissions?: Permission[];
  requiredRoles?: Role[];
}
