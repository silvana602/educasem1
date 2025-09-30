/**
 * Utilidades para autenticación
 * Funciones auxiliares para manejo de sesiones y validaciones
 */

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/auth.config';
import type { AuthSession, SessionUser } from '@/types/auth.types';

/**
 * Obtiene la sesión del lado del servidor
 * Útil para Server Components y API Routes
 * 
 * @returns Sesión actual o null si no está autenticado
 * 
 * @example
 * ```tsx
 * // En un Server Component
 * export default async function ProfilePage() {
 *   const session = await getSession();
 *   
 *   if (!session) {
 *     redirect('/auth/signin');
 *   }
 *   
 *   return <div>Hola {session.user.name}</div>;
 * }
 * ```
 */
export async function getSession(): Promise<AuthSession | null> {
  const session = await getServerSession(authOptions);
  return session as AuthSession | null;
}

/**
 * Obtiene el usuario actual desde el servidor
 * 
 * @returns Usuario autenticado o null
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Verifica si el usuario está autenticado (servidor)
 * 
 * @returns true si está autenticado, false si no
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Verifica si el usuario tiene un rol específico
 * 
 * @param requiredRole - Rol requerido
 * @returns true si tiene el rol o superior
 * 
 * @example
 * ```tsx
 * const canAccess = await hasRole('admin');
 * if (!canAccess) {
 *   redirect('/unauthorized');
 * }
 * ```
 */
export async function hasRole(
  requiredRole: 'admin' | 'user' | 'guest'
): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  const roleHierarchy: Record<string, number> = {
    guest: 1,
    user: 2,
    admin: 3,
  };

  const userRoleLevel = roleHierarchy[user.role] || 0;
  const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

  return userRoleLevel >= requiredRoleLevel;
}

/**
 * Valida formato de email
 * 
 * @param email - Email a validar
 * @returns true si el formato es válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida fortaleza de contraseña
 * 
 * @param password - Contraseña a validar
 * @returns Objeto con resultado y mensaje
 */
export function validatePassword(password: string): {
  isValid: boolean;
  message: string;
} {
  if (password.length < 6) {
    return {
      isValid: false,
      message: 'La contraseña debe tener al menos 6 caracteres',
    };
  }

  // Puedes agregar más validaciones según necesites
  // Por ejemplo: mayúsculas, minúsculas, números, caracteres especiales

  return {
    isValid: true,
    message: 'Contraseña válida',
  };
}

/**
 * Sanitiza input del usuario para prevenir XSS
 * 
 * @param input - String a sanitizar
 * @returns String sanitizado
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remover < y >
    .substring(0, 255); // Limitar longitud
}