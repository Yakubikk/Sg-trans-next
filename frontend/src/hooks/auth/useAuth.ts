import { useQuery, useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/userStore';

// Query keys для аутентификации
export const authKeys = {
  all: ['auth'] as const,
  current: () => [...authKeys.all, 'current'] as const,
  login: () => [...authKeys.all, 'login'] as const,
};

// Auth hooks
export function useLogin() {
  const login = useUserStore((state) => state.login);
  
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Additional success handling if needed
    },
  });
}

export function useLogout() {
  const clearUser = useUserStore((state) => state.clearUser);
  
  return useMutation({
    mutationFn: async () => {
      clearUser();
    },
  });
}

export function useCurrentUser() {
  const currentUser = useUserStore((state) => state.currentUser);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  
  return useQuery({
    queryKey: authKeys.current(),
    queryFn: async () => {
      if (!isAuthenticated) return null;
      return currentUser;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
