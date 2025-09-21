"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authApi } from '@/api/auth';
import { cookieUtils, COOKIE_NAMES } from '@/lib/cookies';
import type {
  UpdateUserRequest,
  UpdateUserRolesRequest,
  ResetPasswordRequest,
} from '@/types/auth';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
  allUsers: () => [...authKeys.all, 'allUsers'] as const,
  allRoles: () => [...authKeys.all, 'allRoles'] as const,
  userPermissions: (userId: string) => [...authKeys.all, 'permissions', userId] as const,
};

// Auth mutations
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Сохраняем токены только в cookies
      cookieUtils.set(COOKIE_NAMES.ACCESS_TOKEN, data.accessToken, 7); // 7 дней
      cookieUtils.set(COOKIE_NAMES.REFRESH_TOKEN, data.refreshToken, 30); // 30 дней
      
      // Invalidate current user query to fetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      // Удаляем все cookies
      cookieUtils.remove(COOKIE_NAMES.ACCESS_TOKEN);
      cookieUtils.remove(COOKIE_NAMES.REFRESH_TOKEN);
      cookieUtils.remove(COOKIE_NAMES.USER_ID);
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,
  });
};

// User queries
export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authApi.getCurrentUser,
    enabled: cookieUtils.has(COOKIE_NAMES.ACCESS_TOKEN),
    retry: false,
  });

  // Save userId when user data is fetched
  useEffect(() => {
    if (query.data?.userId) {
      cookieUtils.set(COOKIE_NAMES.USER_ID, query.data.userId, 30); // 30 дней
    }
  }, [query.data?.userId]);

  return query;
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: authKeys.allUsers(),
    queryFn: authApi.getAllUsers,
  });
};

export const useAllRoles = () => {
  return useQuery({
    queryKey: authKeys.allRoles(),
    queryFn: authApi.getAllRoles,
  });
};

export const useUserPermissions = (userId: string) => {
  return useQuery({
    queryKey: authKeys.userPermissions(userId),
    queryFn: () => authApi.getUserPermissions(userId),
    enabled: !!userId,
  });
};

// User mutations
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserRequest }) =>
      authApi.updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      queryClient.invalidateQueries({ queryKey: authKeys.allUsers() });
    },
  });
};

export const useUpdateUserRoles = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserRolesRequest }) =>
      authApi.updateUserRoles(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      queryClient.invalidateQueries({ queryKey: authKeys.allUsers() });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: ResetPasswordRequest }) =>
      authApi.resetPassword(userId, data),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.allUsers() });
    },
  });
};
