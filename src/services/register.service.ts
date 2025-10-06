/**
 * Servicio de registro de usuarios
 * Maneja la lógica de creación de nuevos usuarios
 * 
 * IMPORTANTE: En producción, reemplazar con llamadas a la base de datos real
 */

import type { RegisterPayload, RegisterResponse } from '@/types/register.types';
import type { User } from '@/types/auth.types';

/**
 * Registra un nuevo usuario en el sistema
 * 
 * @param data - Datos del usuario a registrar
 * @returns Respuesta del registro
 * 
 * TODO en producción:
 * - Hashear contraseña: const hashedPassword = await bcrypt.hash(data.password, 10)
 * - Guardar en DB: await prisma.user.create({ data: {...} })
 * - Enviar email de verificación
 * - Validar que el email no exista ya
 */
export async function registerUser(
  data: RegisterPayload
): Promise<RegisterResponse> {
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Verificar que el email no esté registrado
    // const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    // if (existingUser) {
    //   return {
    //     success: false,
    //     message: 'El email ya está registrado',
    //     error: 'EMAIL_EXISTS',
    //   };
    // }

    // Validación simulada: verificar que el email no sea uno de prueba ya registrado
    const existingEmails = [
      'admin@educasem.com',
      'tutor@educasem.com',
      'student@educasem.com',
    ];

    if (existingEmails.includes(data.email.toLowerCase())) {
      return {
        success: false,
        message: 'Este email ya está registrado',
        error: 'EMAIL_EXISTS',
      };
    }

    // TODO: Crear usuario en la base de datos
    // const hashedPassword = await bcrypt.hash(data.password, 10);
    // const newUser = await prisma.user.create({
    //   data: {
    //     email: data.email,
    //     passwordHash: hashedPassword,
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     name: `${data.firstName} ${data.lastName}`,
    //     phone: data.phone,
    //     birthDate: new Date(data.birthDate),
    //     country: data.country,
    //     role: data.role || 'student',
    //     avatar: null,
    //   },
    // });

    // Simular creación exitosa
    const newUserId = `user_${Date.now()}`;

    // TODO: Enviar email de verificación
    // await sendVerificationEmail(data.email, newUser.id);

    return {
      success: true,
      message: 'Usuario registrado exitosamente',
      userId: newUserId,
    };
  } catch (error) {
    console.error('Error en registerUser:', error);
    return {
      success: false,
      message: 'Error al registrar usuario',
      error: 'SERVER_ERROR',
    };
  }
}

/**
 * Verifica si un email ya está registrado
 * 
 * @param email - Email a verificar
 * @returns true si el email existe, false si no
 * 
 * TODO en producción:
 * - return !!(await prisma.user.findUnique({ where: { email } }));
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const existingEmails = [
    'admin@educasem.com',
    'tutor@educasem.com',
    'student@educasem.com',
  ];

  return existingEmails.includes(email.toLowerCase());
}

/**
 * Valida que el teléfono no esté duplicado
 * 
 * @param phone - Teléfono a verificar
 * @returns true si el teléfono existe, false si no
 */
export async function checkPhoneExists(phone: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // TODO: Implementar verificación en base de datos
  // return !!(await prisma.user.findFirst({ where: { phone } }));
  
  return false; // Por ahora siempre retorna false
}