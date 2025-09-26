// src/middleware.ts

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

/**
 * Middleware de autenticación para proteger rutas
 * Utiliza NextAuth para verificar sesiones
 */
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Permitir acceso a rutas públicas
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    // Redirigir usuarios no autenticados
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Verificar permisos por rol
    const userRole = token.role as string;
    
    // Rutas de administrador
    if (pathname.startsWith('/admin')) {
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
    
    // Rutas de instructor
    if (pathname.startsWith('/instructor')) {
      if (userRole !== 'instructor' && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
    
    // Rutas de estudiante (accesible para todos los usuarios autenticados)
    if (pathname.startsWith('/student')) {
      // Todos los usuarios autenticados pueden acceder
    }

    // Redirigir desde dashboard genérico al específico del rol
    if (pathname === '/dashboard') {
      const dashboardUrl = getDashboardUrlByRole(userRole);
      return NextResponse.redirect(new URL(dashboardUrl, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // Permitir acceso a rutas públicas sin token
        if (isPublicRoute(pathname)) {
          return true;
        }
        
        // Requerir token para rutas protegidas
        return !!token;
      },
    },
  }
);

/**
 * Determina si una ruta es pública (no requiere autenticación)
 */
function isPublicRoute(pathname: string): boolean {
  const publicRoutes = [
    '/',
    '/about',
    '/contact',
    '/courses',
    '/instructors',
    '/plans',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/error',
    '/auth/verify-request',
    '/unauthorized',
    '/api/auth/callback',
    '/api/auth/signin',
    '/api/auth/signout',
    '/api/auth/session',
    '/api/auth/csrf',
    '/api/auth/providers',
  ];

  // Verificar rutas exactas
  if (publicRoutes.includes(pathname)) {
    return true;
  }

  // Verificar patrones de rutas públicas
  const publicPatterns = [
    /^\/courses\/[^\/]+$/, // /courses/[id]
    /^\/instructors\/[^\/]+$/, // /instructors/[id]
    /^\/api\/auth\//, // Todas las rutas de NextAuth
    /^\/api\/public\//, // APIs públicas
    /^\/_next\//, // Archivos estáticos de Next.js
    /^\/favicon\.ico$/, // Favicon
    /^\/images\//, // Imágenes públicas
    /^\/icons\//, // Iconos públicos
  ];

  return publicPatterns.some(pattern => pattern.test(pathname));
}

/**
 * Obtiene la URL del dashboard según el rol del usuario
 */
function getDashboardUrlByRole(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'instructor':
      return '/instructor/dashboard';
    case 'student':
      return '/student/dashboard';
    default:
      return '/student/dashboard';
  }
}

/**
 * Configuración de rutas que deben ser procesadas por el middleware
 */
export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas de solicitud excepto las que comienzan con:
     * - api (rutas API)
     * - _next/static (archivos estáticos)
     * - _next/image (archivos de optimización de imagen)
     * - favicon.ico (favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};