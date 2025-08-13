export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  roleIds: number[];
}

export interface AuthResponseDto {
  token: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions: string[];
}

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  roles: string[];
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  phoneNumber?: string;
  roleIds?: number[];
}
