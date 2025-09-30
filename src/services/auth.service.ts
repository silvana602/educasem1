/**
 * Servicio de autenticación
 * Funciones para validar credenciales y gestionar usuarios
 * 
 * IMPORTANTE: En producción, reemplazar las funciones con llamadas a la base de datos real
 * La estructura de tipos se mantiene, solo cambiar la implementación
 */

import { User, LoginCredentials, AuthResponse } from '@/types/auth.types';

// Base de datos ficticia de usuarios
// TODO: Reemplazar con consultas a base de datos real (Prisma, MongoDB, etc.)
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin Usuario',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Usuario Normal',
    role: 'tutor',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '3',
    email: 'guest@example.com',
    name: 'Usuario Invitado',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: new Date('2024-03-20'),
  },
];

// Contraseñas ficticias (en producción, usar hashing con bcrypt)
// TODO: Implementar bcrypt.compare() para validar contraseñas hasheadas
const MOCK_PASSWORDS: Record<string, string> = {
  'admin@example.com': 'admin123',
  'user@example.com': 'user123',
  'guest@example.com': 'guest123',
};

/**
 * Valida las credenciales del usuario
 * @param credentials - Email y contraseña del usuario
 * @returns Usuario si las credenciales son válidas, null si no
 * 
 * TODO en producción:
 * - Consultar base de datos: const user = await prisma.user.findUnique({ where: { email } })
 * - Validar contraseña: await bcrypt.compare(password, user.passwordHash)
 */
export async function validateCredentials(
  credentials: LoginCredentials
): Promise<User | null> {
  const { email, password } = credentials;

  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 300));

  // Buscar usuario por email
  const user = MOCK_USERS.find(u => u.email === email);
  
  if (!user) {
    return null;
  }

  // Validar contraseña
  const isValidPassword = MOCK_PASSWORDS[email] === password;
  
  if (!isValidPassword) {
    return null;
  }

  return user;
}

/**
 * Obtiene un usuario por su ID
 * @param userId - ID del usuario
 * @returns Usuario encontrado o null
 * 
 * TODO en producción:
 * - return await prisma.user.findUnique({ where: { id: userId } })
 */
export async function getUserById(userId: string): Promise<User | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const user = MOCK_USERS.find(u => u.id === userId);
  return user || null;
}

/**
 * Obtiene un usuario por su email
 * @param email - Email del usuario
 * @returns Usuario encontrado o null
 * 
 * TODO en producción:
 * - return await prisma.user.findUnique({ where: { email } })
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const user = MOCK_USERS.find(u => u.email === email);
  return user || null;
}

/**
 * Realiza el login del usuario
 * @param credentials - Credenciales de acceso
 * @returns Respuesta con el usuario o error
 */
export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  try {
    const user = await validateCredentials(credentials);
    
    if (!user) {
      return {
        success: false,
        error: 'Credenciales inválidas',
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Error en el servidor',
    };
  }
}