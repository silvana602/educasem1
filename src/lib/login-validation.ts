/**
 * Utilidades de validación para el login
 * Funciones para validar campos del formulario de login
 */

import type { LoginErrors } from '@/types/login.types';

/**
 * Valida el formato de email
 */
export function validateEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida el campo de email
 * @returns Error message o undefined si es válido
 */
export function validateEmailField(email: string): string | undefined {
  if (!email || email.trim() === '') {
    return 'Por favor ingresa tu email';
  }
  
  if (!validateEmailFormat(email)) {
    return 'El formato del email no es válido';
  }
  
  return undefined;
}

/**
 * Valida el campo de contraseña
 * @returns Error message o undefined si es válido
 */
export function validatePasswordField(password: string): string | undefined {
  if (!password || password.trim() === '') {
    return 'Por favor ingresa tu contraseña';
  }
  
  if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  
  return undefined;
}

/**
 * Valida todos los campos del formulario de login
 * @returns Objeto con los errores encontrados
 */
export function validateLoginForm(
  email: string,
  password: string
): LoginErrors {
  const errors: LoginErrors = {};

  const emailError = validateEmailField(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePasswordField(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

/**
 * Verifica si hay errores en el objeto de errores
 */
export function hasValidationErrors(errors: LoginErrors): boolean {
  return Object.keys(errors).length > 0;
}