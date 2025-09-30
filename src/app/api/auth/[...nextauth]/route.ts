/**
 * API Route Handler para NextAuth
 * Este archivo maneja todas las rutas de autenticación de NextAuth
 * 
 * Rutas automáticas creadas:
 * - GET  /api/auth/signin - Página de login
 * - POST /api/auth/signin/:provider - Endpoint de login
 * - GET  /api/auth/signout - Página de logout
 * - POST /api/auth/signout - Endpoint de logout
 * - GET  /api/auth/session - Obtener sesión actual
 * - GET  /api/auth/csrf - Token CSRF
 * - GET  /api/auth/providers - Lista de proveedores
 * 
 * Documentación: https://next-auth.js.org/configuration/initialization#route-handlers-app
 */

import NextAuth from 'next-auth';
import { authOptions } from '@/auth/auth.config';

/**
 * Handler para NextAuth en App Router
 * Exportamos GET y POST para manejar las peticiones HTTP
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };