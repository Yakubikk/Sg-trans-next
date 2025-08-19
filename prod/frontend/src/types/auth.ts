// Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  roleIds: number[];
}

export interface RefreshTokenRequest {
  id: string;
  refreshToken: string;
}

export interface UpdateUserRequest {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
}

export interface UpdateUserRolesRequest {
  userId: string;
  roles: Role[];
}

export interface ResetPasswordRequest {
  userId: string;
  newPassword: string;
}

// Response types
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface GetCurrentUserResponse {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  refreshToken?: string;
  refreshTokenExpiry?: string;
  roles: RolesForCurrentUser[];
}

export interface GetAllUsersResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  roles: RoleResponse[];
}

export interface GetAllRolesResponse {
  id: number;
  name: string;
}

// Common types
export interface RolesForCurrentUser {
  id: number;
  name: string;
}

export interface RoleResponse {
  id: number;
  name: string;
}

export enum Permission {
  Read = 1,
  Create = 2,
  Update = 3,
  Delete = 4,
}

export enum Role {
  Admin = 1,
  User = 2,
}
