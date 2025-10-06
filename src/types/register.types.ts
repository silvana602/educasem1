/**
 * Types para el sistema de registro de usuarios
 * Interfaces y tipos relacionados con el registro
 */

// Datos completos para el registro de usuario
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  country: string;
}

// Datos que se envían al servidor (sin confirmPassword)
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
  country: string;
  role?: 'admin' | 'tutor' | 'student';
}

// Respuesta del registro
export interface RegisterResponse {
  success: boolean;
  message: string;
  userId?: string;
  error?: string;
}

// Errores de validación por campo
export interface RegisterErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  birthDate?: string;
  country?: string;
  general?: string;
}

// País disponible en el selector
export interface Country {
  code: string;
  name: string;
}