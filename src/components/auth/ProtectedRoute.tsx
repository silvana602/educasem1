/**
 * Componente para proteger rutas que requieren autenticación
 * Redirige a login si el usuario no está autenticado
 */

'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'user' | 'guest';
}

/**
 * Componente que protege rutas requiriendo autenticación
 * Opcionalmente puede requerir un rol específico
 * 
 * @param children - Contenido a proteger
 * @param requiredRole - Rol mínimo requerido (opcional)
 * 
 * @example
 * ```tsx
 * // Proteger cualquier ruta autenticada
 * export default function DashboardPage() {
 *   return (
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   );
 * }
 * 
 * // Proteger solo para admins
 * export default function AdminPage() {
 *   return (
 *     <ProtectedRoute requiredRole="admin">
 *       <AdminPanel />
 *     </ProtectedRoute>
 *   );
 * }
 * ```
 */
export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si no está cargando y no está autenticado, redirigir al login
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    // Si requiere un rol específico, verificar permisos
    if (!isLoading && isAuthenticated && requiredRole && user) {
      const roleHierarchy: Record<string, number> = {
        guest: 1,
        user: 2,
        admin: 3,
      };

      const userRoleLevel = roleHierarchy[user.role] || 0;
      const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

      // Si el usuario no tiene el rol requerido, redirigir
      if (userRoleLevel < requiredRoleLevel) {
        router.push('/unauthorized');
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (se redirigirá)
  if (!isAuthenticated) {
    return null;
  }

  // Si requiere rol y no lo tiene, no mostrar nada (se redirigirá)
  if (requiredRole && user) {
    const roleHierarchy: Record<string, number> = {
      guest: 1,
      user: 2,
      admin: 3,
    };

    const userRoleLevel = roleHierarchy[user.role] || 0;
    const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

    if (userRoleLevel < requiredRoleLevel) {
      return null;
    }
  }

  // Usuario autenticado y con permisos correctos
  return <>{children}</>;
}