/**
 * Configuración de NextAuth
 * Define las opciones de autenticación y callbacks
 * 
 * Documentación: https://next-auth.js.org/configuration/options
 */

import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { validateCredentials } from '@/services/auth.service';

/**
 * Configuración principal de NextAuth
 * 
 * Providers: Define los métodos de autenticación (credenciales y Google)
 * Callbacks: Funciones que se ejecutan en diferentes momentos del flujo de auth
 * Pages: Rutas personalizadas para las páginas de autenticación
 * Session: Configuración de la estrategia de sesión (JWT en este caso)
 */
export const authOptions: NextAuthOptions = {
  // Proveedores de autenticación
  providers: [
    // Provider de credenciales (email y contraseña)
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      
      credentials: {
        email: { 
          label: 'Email', 
          type: 'email', 
          placeholder: 'usuario@ejemplo.com' 
        },
        password: { 
          label: 'Contraseña', 
          type: 'password' 
        },
      },
      
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await validateCredentials({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatar,
          role: user.role,
        };
      },
    }),

    // Provider de Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  // Callbacks: Funciones que modifican tokens y sesiones
  callbacks: {
    /**
     * Callback SignIn
     * Se ejecuta cuando un usuario intenta iniciar sesión
     * Útil para manejar usuarios nuevos de OAuth providers
     */
    async signIn({ user, account, profile }) {
      // Si el usuario se logueó con Google
      if (account?.provider === 'google') {
        // TODO: Aquí deberías verificar si el usuario existe en tu DB
        // Si no existe, crearlo con rol 'student' por defecto
        // Por ahora, asignamos un rol por defecto
        
        if (!user.role) {
          user.role = 'student'; // Rol por defecto para usuarios de Google
        }
        
        // Opcional: Guardar usuario en base de datos
        // const existingUser = await getUserByEmail(user.email);
        // if (!existingUser) {
        //   await createUser({
        //     email: user.email,
        //     name: user.name,
        //     role: 'student',
        //     avatar: user.image,
        //     provider: 'google',
        //   });
        // }
      }
      
      return true; // Permitir el login
    },

    /**
     * Callback JWT
     * Se ejecuta cuando se crea o actualiza un token JWT
     * Aquí agregamos datos personalizados al token
     */
    async jwt({ token, user, account }) {
      // En el primer login, agregar datos del usuario al token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || 'student'; // Rol por defecto si no existe
        token.avatar = user.image;
      }

      return token;
    },

    /**
     * Callback Session
     * Se ejecuta cuando se obtiene la sesión del cliente
     * Aquí exponemos los datos del token en la sesión
     */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
      }

      return session;
    },
  },

  // Páginas personalizadas (opcional)
  pages: {
    signIn: '/auth/signin',  // Página de login personalizada
    // signOut: '/auth/signout',
    // error: '/auth/error',
  },

  // Estrategia de sesión: JWT (no requiere base de datos para sesiones)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },

  // Secret para firmar tokens (usar variable de entorno en producción)
  secret: process.env.NEXTAUTH_SECRET,

  // Habilitar debug en desarrollo
  debug: process.env.NODE_ENV === 'development',
};