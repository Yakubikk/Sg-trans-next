import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserDto } from '@/types/auth';
import { apiClient } from '@/lib/api/client';

interface AuthState {
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: UserDto) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.login({ email, password });
          // Создаем объект пользователя из данных AuthResponseDto
          const user: UserDto = {
            id: '', // ID будет получен отдельно если нужно
            email: response.email,
            firstName: response.fullName.split(' ')[0] || '',
            lastName: response.fullName.split(' ')[1] || '',
            patronymic: response.fullName.split(' ')[2] || '',
            phoneNumber: '',
            roles: response.roles,
          };
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        apiClient.logout();
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: UserDto) => {
        set({ user, isAuthenticated: true });
      },

      initializeAuth: async () => {
        const state = get();
        // Если уже идет загрузка или пользователь уже аутентифицирован, не запускаем повторно
        if (state.isLoading || (state.isAuthenticated && state.user)) {
          return;
        }

        const token = apiClient.getToken();
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        set({ isLoading: true });
        try {
          const user = await apiClient.getCurrentUser() as UserDto;
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          // Token is invalid
          apiClient.clearToken();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
