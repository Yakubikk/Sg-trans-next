import { Role } from './permissions';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  isActive: boolean;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  avatar?: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Role;
  isActive?: boolean;
  isBanned?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
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
  role?: Role;
  isActive?: boolean;
  isBanned?: boolean;
}

export interface UserListParams extends UserFilters {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'firstName' | 'lastName' | 'email' | 'lastLoginAt';
  sortOrder?: 'asc' | 'desc';
}
