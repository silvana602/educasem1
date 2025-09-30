/**
 * Extensión de tipos de NextAuth
 * Permite agregar propiedades personalizadas a User, Session y JWT
 * 
 * Este archivo extiende los tipos de NextAuth para incluir campos personalizados
 * como 'role' y 'avatar' que no existen por defecto
 */

import 'next-auth';
import 'next-auth/jwt';

// Extender el módulo de next-auth
declare module 'next-auth' {
  /**
   * Extender la interfaz User de NextAuth
   * Se usa cuando el usuario se autentica por primera vez
   */
  interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'tutor' | 'student';
    image?: string;
  }

  /**
   * Extender la interfaz Session de NextAuth
   * Define qué datos estarán disponibles en la sesión del cliente
   */
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'admin' | 'tutor' | 'student';
      avatar?: string;
    };
  }
}

// Extender el módulo JWT de next-auth
declare module 'next-auth/jwt' {
  /**
   * Extender la interfaz JWT
   * Define qué datos se almacenarán en el token JWT
   */
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'tutor' | 'student';
    avatar?: string;
  }
}