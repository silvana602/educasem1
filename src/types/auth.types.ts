/**
 * Types para el sistema de autenticación
 * Interfaces y tipos relacionados con usuarios y sesiones
 */

// Interfaz principal del usuario
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'tutor' | 'student';
  avatar?: string;
  createdAt: Date;
}

// Credenciales para el login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Datos del usuario en la sesión
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'tutor' | 'student';
  avatar?: string;
}

// Estructura completa de la sesión
export interface AuthSession {
  user: SessionUser;
  expires: string;
}

// Respuesta de autenticación
export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Token JWT personalizado
export interface CustomJWT {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'Tutor' | 'student';
  avatar?: string;
}