import { GetCurrentUserResponse, Role } from '@/types/auth';

// Утилиты для проверки ролей и разрешений
export const roleUtils = {
  // Проверка, является ли пользователь администратором
  isAdmin: (user: GetCurrentUserResponse | undefined): boolean => {
    if (!user?.roles) return false;
    return user.roles.some(role => role.id === Role.Admin);
  },

  // Проверка наличия определенной роли
  hasRole: (user: GetCurrentUserResponse | undefined, roleId: Role): boolean => {
    if (!user?.roles) return false;
    return user.roles.some(role => role.id === roleId);
  },

  // Проверка наличия любой из указанных ролей
  hasAnyRole: (user: GetCurrentUserResponse | undefined, roleIds: Role[]): boolean => {
    if (!user?.roles) return false;
    return user.roles.some(role => roleIds.includes(role.id));
  },

  // Получение названий ролей пользователя
  getRoleNames: (user: GetCurrentUserResponse | undefined): string[] => {
    if (!user?.roles) return [];
    return user.roles.map(role => role.name);
  }
};
