/**
 * Hook personalizado para autenticación
 * Facilita el acceso a la sesión y funciones de login/logout
 */

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { SessionUser } from '@/types/auth.types';

/**
 * Tipo de retorno del hook useAuth
 */
interface UseAuthReturn {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  redirectToLogin: () => void;
}

/**
 * Resultado del intento de login
 */
export interface LoginResult {
  success: boolean;
  error?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
}

/**
 * Hook para gestionar la autenticación
 * 
 * @returns Objeto con estado de sesión y funciones de auth
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 * 
 * const handleLogin = async () => {
 *   const result = await login('user@example.com', 'password123');
 *   if (result.success) {
 *     console.log('Login exitoso');
 *   }
 * };
 * ```
 */
export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const router = useRouter();

  /**
   * Función para hacer login
   * 
   * @param email - Email del usuario
   * @param password - Contraseña del usuario
   * @returns Resultado del login
   */
  const login = async (
    email: string, 
    password: string
  ): Promise<LoginResult> => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false, // No redirigir automáticamente
      });

      if (result?.error) {
        return {
          success: false,
          error: 'Email o contraseña incorrectos',
        };
      }

      if (result?.ok) {
        // Redirigir al dashboard después del login exitoso
        router.push('/dashboard');
        return {
          success: true,
        };
      }

      return {
        success: false,
        error: 'Error al iniciar sesión',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión. Intenta nuevamente',
      };
    }
  };

  /**
   * Función para hacer logout
   */
  const logout = async (): Promise<void> => {
    await signOut({
      redirect: true,
      callbackUrl: '/auth/signin', // Redirigir al login
    });
  };

  /**
   * Redirigir a la página de login
   */
  const redirectToLogin = (): void => {
    router.push('/auth/signin');
  };

  return {
    user: session?.user as SessionUser | null,
    isAuthenticated: !!session?.user,
    isLoading: status === 'loading',
    login,
    logout,
    redirectToLogin,
  };
}