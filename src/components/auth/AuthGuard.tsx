"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserRole } from '@/types/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  allowedRoles, 
  fallback = <div>Cargando...</div>,
  redirectTo = '/auth/login'
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push(redirectTo);
      return;
    }

    if (allowedRoles && !allowedRoles.includes(session.user.role)) {
      router.push('/unauthorized');
      return;
    }
  }, [session, status, allowedRoles, router, redirectTo]);

  if (status === 'loading') {
    return <>{fallback}</>;
  }

  if (!session) {
    return <>{fallback}</>;
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    return <div>No tienes permisos para acceder a esta página</div>;
  }

  return <>{children}</>;
}