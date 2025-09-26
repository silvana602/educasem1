import type { User } from '@/types/auth';
// import { hashPassword } from './auth-utils';

/**
 * Datos ficticios de usuarios para desarrollo
 * En producción, estos datos vendrán de la base de datos
 */

export interface MockUserData {
  id: string;
  email: string;
  name: string;
  password: string;
  hashedPassword: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


// Contraseñas hasheadas (todas son "123456789")
const HASHED_PASSWORD = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeVMpYxNHtR5SLFYy';

export const MOCK_USERS: MockUserData[] = [
  {
    id: '1',
    email: 'admin@educasem.com',
    name: 'Admin Usuario',
    password: '123456789', // Solo para referencia
    hashedPassword: HASHED_PASSWORD,
    role: 'admin',
    avatar: '/images/avatars/admin.jpg',
    isEmailVerified: true,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'instructor@educasem.com',
    name: 'Carlos Mendez',
    password: '123456789',
    hashedPassword: HASHED_PASSWORD,
    role: 'instructor',
    avatar: '/images/avatars/instructor.jpg',
    isEmailVerified: true,
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    email: 'estudiante@educasem.com',
    name: 'María García',
    password: '123456789',
    hashedPassword: HASHED_PASSWORD,
    role: 'student',
    avatar: '/images/avatars/student.jpg',
    isEmailVerified: true,
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '4',
    email: 'instructor2@educasem.com',
    name: 'Ana Rodriguez',
    password: '123456789',
    hashedPassword: HASHED_PASSWORD,
    role: 'instructor',
    avatar: '/images/avatars/instructor2.jpg',
    isEmailVerified: true,
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-28'),
  },
  {
    id: '5',
    email: 'estudiante2@educasem.com',
    name: 'Pedro López',
    password: '123456789',
    hashedPassword: HASHED_PASSWORD,
    role: 'student',
    isEmailVerified: false,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-30'),
  },
];

/**
 * Convierte MockUserData a User (sin contraseñas)
 */
export function mockUserToUser(mockUser: MockUserData): User {
  return {
    id: mockUser.id,
    email: mockUser.email,
    name: mockUser.name,
    role: mockUser.role,
    avatar: mockUser.avatar,
    isEmailVerified: mockUser.isEmailVerified,
    isActive: mockUser.isActive,
    createdAt: mockUser.createdAt,
    updatedAt: mockUser.updatedAt,
  };
}


/**
 * Busca un usuario por email en los datos mock
 */
export function findMockUserByEmail(email: string): MockUserData | undefined {
  return MOCK_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
}

/**
 * Busca un usuario por ID en los datos mock
 */
export function findMockUserById(id: string): MockUserData | undefined {
  return MOCK_USERS.find(user => user.id === id);
}

/**
 * Obtiene todos los usuarios (sin contraseñas) para administración
 */
export function getAllMockUsers(): User[] {
  return MOCK_USERS.map(mockUserToUser);
}