// src/lib/auth.ts (Configuración NextAuth)

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { AuthService } from '@/services/auth-service';
import { getDashboardUrl } from '@/lib/auth-utils';
import type { User } from '@/types/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    // Proveedor de credenciales (email/password)
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { 
          label: 'Email', 
          type: 'email',
          placeholder: 'tu@email.com'
        },
        password: { 
          label: 'Contraseña', 
          type: 'password' 
        },
      },
      async authorize(credentials){
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email y contraseña son requeridos');
        }

        try {
          const loginResponse = await AuthService.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (!loginResponse.success || !loginResponse.user) {
            throw new Error(loginResponse.error || 'Credenciales inválidas');
          }

          // Actualizar última fecha de login
          await AuthService.updateLastLogin(loginResponse.user.id);

          return {
            id: loginResponse.user.id,
            email: loginResponse.user.email,
            name: loginResponse.user.name,
            role: loginResponse.user.role,
            avatar: loginResponse.user.avatar,
            isEmailVerified: loginResponse.user.isEmailVerified,
            isActive: true,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error(error instanceof Error ? error.message : 'Error de autenticación');
        }
      },
    }),

    // Proveedor de Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  callbacks: {
    /**
     * Callback JWT - Se ejecuta cuando se crea el token
     */
    async jwt({ token, user, account }) {
      // Si es un login inicial, agregar datos del usuario al token
      if (user && account) {
        token.userId = user.id;
        token.role = user.role;
        token.isEmailVerified = user.isEmailVerified;
      }

      return token;
    },

    /**
     * Callback Session - Se ejecuta cuando se crea/actualiza la sesión
     */
    async session({ session, token }) {
      if (session?.user && token) {
        // Obtener datos actualizados del usuario
        const userData = await AuthService.getUserById(token.userId as string);
        
        if (userData) {
          session.user = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            avatar: userData.avatar,
            isEmailVerified: userData.isEmailVerified,
            isActive: userData.isActive,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
          };
        }

        // Agregar token a la sesión si es necesario
        session.token = (token.jti as string) ?? '';
      }

      return session;
    },

    /**
     * Callback de redirección después del login
     */
    async redirect({ url, baseUrl }) {
      // Si es una URL relativa, construir URL completa
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      
      // Si es la misma base URL, permitir redirección
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      
      // Por defecto, redirigir al dashboard
      return `${baseUrl}/student/dashboard`;
    },

    /**
     * Callback de autorización para páginas protegidas
     */
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Lógica especial para Google OAuth
        // Verificar si el usuario ya existe o crear uno nuevo
        const existingUser = await AuthService.getUserByEmail(user.email || '');
        
        if (!existingUser) {
          // En producción, aquí crearías un nuevo usuario en la base de datos
          console.log('Would create new user from Google OAuth:', user.email);
        }
      }

      return true;
    },
  },

  pages: {
    signIn: '/auth/login',
    signUp: '/auth/register',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/student/dashboard', // Redirigir nuevos usuarios al dashboard
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 días
    updateAge: 24 * 60 * 60, // 24 horas
  },

  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 días
  },

  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  events: {
    async signIn(message) {
      console.log(`User signed in: ${message.user.email}`);
    },
    async signOut(message) {
      console.log(`User signed out: ${message.token?.email || 'unknown'}`);
    },
  },

  debug: process.env.NODE_ENV === 'development',
  
  secret: process.env.NEXTAUTH_SECRET,
};