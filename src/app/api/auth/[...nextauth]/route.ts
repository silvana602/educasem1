import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * Configuración de NextAuth para App Router
 * Esta ruta maneja todas las operaciones de autenticación:
 * - GET /api/auth/signin - Página de login
 * - POST /api/auth/signin - Procesar login
 * - GET /api/auth/signout - Cerrar sesión
 * - POST /api/auth/signout - Procesar logout
 * - GET /api/auth/session - Obtener sesión actual
 * - GET /api/auth/csrf - Token CSRF
 * - GET /api/auth/providers - Proveedores disponibles
 * - GET /api/auth/callback/[provider] - Callbacks OAuth
 */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };