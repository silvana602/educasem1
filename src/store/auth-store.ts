import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, User, AuthToken, LoginCredentials, RegisterData, ChangePasswordData, UpdateProfileData } from '@/types/auth';

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
  changePassword: (data: ChangePasswordData) => Promise<boolean>;
  verifySession: () => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  isInstructor: () => boolean;
  isStudent: () => boolean;
}

type AuthStore = AuthState & AuthActions;

const AUTH_STORAGE_KEY = 'educasem-auth';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          const result = await response.json();
          
          if (response.ok && result.user && result.token) {
            set({
              user: result.user,
              token: result.token,
              isLoading: false,
              error: null
            });
            return true;
          } else {
            set({
              error: result.error || 'Error de autenticación',
              isLoading: false
            });
            return false;
          }
        } catch {
          set({
            error: 'Error de conexión',
            isLoading: false
          });
          return false;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          
          if (response.ok && result.user && result.token) {
            set({
              user: result.user,
              token: result.token,
              isLoading: false,
              error: null
            });
            return true;
          } else {
            set({
              error: result.error || 'Error de registro',
              isLoading: false
            });
            return false;
          }
        } catch  {
          set({
            error: 'Error de conexión',
            isLoading: false
          });
          return false;
        }
      },

      logout: async () => {
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
          });
        } catch (error) {
          console.error('Logout error:', error);
        }
        
        set({
          user: null,
          token: null,
          isLoading: false,
          error: null
        });
      },

      refreshToken: async () => {
        const { token } = get();
        
        if (!token?.refreshToken) {
          return false;
        }

        set({ isLoading: true });
        
        try {
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
          });

          const result = await response.json();
          
          if (response.ok && result.token) {
            set({
              token: result.token,
              isLoading: false
            });
            return true;
          } else {
            get().logout();
            return false;
          }
        } catch  {
          get().logout();
          return false;
        }
      },

      updateProfile: async (data: UpdateProfileData) => {
        const { user, token } = get();
        if (!user || !token) return false;

        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          
          if (response.ok && result.user) {
            set({
              user: result.user,
              isLoading: false,
              error: null
            });
            return true;
          } else {
            set({
              error: result.error || 'Error al actualizar perfil',
              isLoading: false
            });
            return false;
          }
        } catch  {
          set({
            error: 'Error de conexión',
            isLoading: false
          });
          return false;
        }
      },

      changePassword: async (data: ChangePasswordData) => {
        const { user, token } = get();
        if (!user || !token) return false;

        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/users/${user.id}/change-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          
          if (response.ok) {
            set({
              isLoading: false,
              error: null
            });
            return true;
          } else {
            set({
              error: result.error || 'Error al cambiar contraseña',
              isLoading: false
            });
            return false;
          }
        } catch  {
          set({
            error: 'Error de conexión',
            isLoading: false
          });
          return false;
        }
      },

      verifySession: async () => {
        const { token } = get();
        
        if (!token?.accessToken) {
          return false;
        }

        set({ isLoading: true });
        
        try {
          const response = await fetch('/api/auth/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token.accessToken}`,
            },
          });

          const result = await response.json();
          
          if (response.ok && result.user) {
            set({
              user: result.user,
              isLoading: false
            });
            return true;
          } else {
            get().logout();
            return false;
          }
        } catch  {
          get().logout();
          return false;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      isAuthenticated: () => {
        const { user, token } = get();
        return Boolean(user && token?.accessToken);
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin';
      },

      isInstructor: () => {
        const { user } = get();
        return user?.role === 'instructor';
      },

      isStudent: () => {
        const { user } = get();
        return user?.role === 'student';
      }
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token?.accessToken) {
          state.verifySession();
        }
      }
    }
  )
);