/**
 * Utilidades de validación para el registro
 * Funciones para validar campos del formulario de registro
 */

import type { RegisterData, RegisterErrors } from '@/types/register.types';

/**
 * Valida el formato de email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida el formato de teléfono (mínimo 8 dígitos)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s+()-]{8,}$/;
  return phoneRegex.test(phone);
}

/**
 * Valida la fortaleza de la contraseña
 * Requisitos: mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
 */
export function validatePassword(password: string): {
  isValid: boolean;
  message: string;
} {
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'La contraseña debe tener al menos 8 caracteres',
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'La contraseña debe contener al menos una mayúscula',
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'La contraseña debe contener al menos una minúscula',
    };
  }

  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'La contraseña debe contener al menos un número',
    };
  }

  return {
    isValid: true,
    message: 'Contraseña válida',
  };
}

/**
 * Valida que el usuario sea mayor de 13 años
 */
export function validateAge(birthDate: string): {
  isValid: boolean;
  message: string;
} {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  const actualAge =
    monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())
      ? age - 1
      : age;

  if (actualAge < 13) {
    return {
      isValid: false,
      message: 'Debes tener al menos 13 años para registrarte',
    };
  }

  return {
    isValid: true,
    message: 'Edad válida',
  };
}

/**
 * Valida que el nombre solo contenga letras y espacios
 */
export function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return nameRegex.test(name) && name.trim().length >= 2;
}

/**
 * Valida todos los campos del formulario de registro
 * Retorna un objeto con los errores encontrados
 */
export function validateRegisterForm(
  data: RegisterData
): RegisterErrors {
  const errors: RegisterErrors = {};

  // Validar nombres
  if (!data.firstName.trim()) {
    errors.firstName = 'El nombre es requerido';
  } else if (!validateName(data.firstName)) {
    errors.firstName = 'El nombre solo debe contener letras';
  }

  // Validar apellidos
  if (!data.lastName.trim()) {
    errors.lastName = 'El apellido es requerido';
  } else if (!validateName(data.lastName)) {
    errors.lastName = 'El apellido solo debe contener letras';
  }

  // Validar email
  if (!data.email.trim()) {
    errors.email = 'El email es requerido';
  } else if (!validateEmail(data.email)) {
    errors.email = 'El email no es válido';
  }

  // Validar teléfono
  if (!data.phone.trim()) {
    errors.phone = 'El teléfono es requerido';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'El teléfono debe tener al menos 8 dígitos';
  }

  // Validar contraseña
  if (!data.password) {
    errors.password = 'La contraseña es requerida';
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message;
    }
  }

  // Validar confirmación de contraseña
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Debes confirmar tu contraseña';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  // Validar fecha de nacimiento
  if (!data.birthDate) {
    errors.birthDate = 'La fecha de nacimiento es requerida';
  } else {
    const ageValidation = validateAge(data.birthDate);
    if (!ageValidation.isValid) {
      errors.birthDate = ageValidation.message;
    }
  }

  // Validar país
  if (!data.country) {
    errors.country = 'Debes seleccionar un país';
  }

  return errors;
}

/**
 * Verifica si hay errores en el objeto de errores
 */
export function hasErrors(errors: RegisterErrors): boolean {
  return Object.keys(errors).length > 0;
}