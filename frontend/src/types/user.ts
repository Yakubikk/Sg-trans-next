import { Role, RoleObject } from './permissions';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  roles: RoleObject[];
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  roles: RoleObject[];
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  roles?: RoleObject[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserFilters {
  search?: string;
  roles?: Role[];
}

export interface UserListParams extends UserFilters {
  page?: number;
  limit?: number;
  sortBy?: 'firstName' | 'lastName' | 'email';
  sortOrder?: 'asc' | 'desc';
}
