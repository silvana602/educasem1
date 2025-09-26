import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { User, UserRole, UpdateProfileData } from '@/types/auth';

// Definir interfaces para las respuestas de la API
interface ApiResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

interface UpdateProfileResponse extends ApiResponse {
  user?: User;
}

// No necesitamos ChangePasswordResponse ya que es igual que ApiResponse
type ChangePasswordResponse = ApiResponse;

export const useAuth = () => {
  const { data: session, status, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Casting seguro con verificación de tipos
  const user = session?.user as User | undefined;
  const isAuthenticated = status === 'authenticated';
  const loading = status === 'loading' || isLoading;

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: '/auth/login' });
    } catch (err) {
      setError('Error al cerrar sesión');
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    if (!user?.id) {
      setError('Usuario no autenticado');
      return false;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result: UpdateProfileResponse = await response.json();
        
        if (result.success || result.user) {
          // Actualizar sesión con los nuevos datos
          await update();
          return true;
        } else {
          setError(result.error || 'Error al actualizar perfil');
          return false;
        }
      } else {
        const result: UpdateProfileResponse = await response.json();
        setError(result.error || 'Error al actualizar perfil');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (
    currentPassword: string, 
    newPassword: string
  ): Promise<boolean> => {
    if (!user?.id) {
      setError('Usuario no autenticado');
      return false;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/users/${user.id}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        const result: ChangePasswordResponse = await response.json();
        
        if (result.success !== false) {
          return true;
        } else {
          setError(result.error || 'Error al cambiar contraseña');
          return false;
        }
      } else {
        const result: ChangePasswordResponse = await response.json();
        setError(result.error || 'Error al cambiar contraseña');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (): void => setError(null);

  return {
    user,
    isAuthenticated,
    isLoading: loading,
    error,
    
    // Roles - usando boolean específicos
    isAdmin: user?.role === 'admin',
    isInstructor: user?.role === 'instructor',
    isStudent: user?.role === 'student',
    
    // Acciones
    logout,
    updateProfile,
    changePassword,
    clearError,
    
    // Session update
    updateSession: update
  } as const; // as const para mayor seguridad de tipos
};

// Hook para verificar roles con mejor tipado
interface UseRequireRoleReturn {
  hasRequiredRole: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: User;
  redirecting?: boolean;
}

export const useRequireRole = (
  allowedRoles: UserRole[], 
  redirectTo: string = '/unauthorized'
): UseRequireRoleReturn => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [redirecting, setRedirecting] = useState(false);
  
  if (!isLoading && isAuthenticated && user) {
    const hasRequiredRole = allowedRoles.includes(user.role);
    
    if (!hasRequiredRole && !redirecting) {
      setRedirecting(true);
      window.location.href = redirectTo;
      return { 
        hasRequiredRole: false, 
        isLoading, 
        isAuthenticated,
        user,
        redirecting: true 
      };
    }
  }
  
  const hasRequiredRole = user ? allowedRoles.includes(user.role) : false;
  
  return {
    hasRequiredRole,
    isLoading,
    isAuthenticated,
    user,
    redirecting
  };
};

// Hook para verificación simple de autenticación
export const useRequireAuth = (redirectTo: string = '/auth/login') => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  if (!isLoading && !isAuthenticated && !redirecting) {
    setRedirecting(true);
    window.location.href = redirectTo;
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    redirecting
  };
};

// Hook para obtener solo información del usuario (sin acciones)
export const useUser = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    // Roles como computed properties
    isAdmin: user?.role === 'admin',
    isInstructor: user?.role === 'instructor', 
    isStudent: user?.role === 'student'
  } as const;
};

// Hook específico para manejar errores de autenticación
export const useAuthError = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  
  const handleAuthError = (error: unknown): void => {
    if (error instanceof Error) {
      setAuthError(error.message);
    } else if (typeof error === 'string') {
      setAuthError(error);
    } else {
      setAuthError('Error de autenticación desconocido');
    }
  };
  
  const clearAuthError = (): void => setAuthError(null);
  
  return {
    authError,
    handleAuthError,
    clearAuthError
  } as const;
};