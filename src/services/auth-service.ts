import type { LoginCredentials, LoginResponse, User, AuthError } from '@/types/auth';
import { 
  verifyPassword, 
  generateAuthToken, 
  isValidEmail, 
  createAuthError 
} from '@/lib/auth-utils';
import { 
  findMockUserByEmail, 
  mockUserToUser,
  findMockUserById,
  type MockUserData 
} from '@/lib/mock-database';

/**
 * Servicio de autenticación
 * Esta clase maneja toda la lógica de autenticación de usuarios
 */
export class AuthService {
  /**
   * Autentica un usuario con email y contraseña
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Validar formato de email
      if (!isValidEmail(credentials.email)) {
        return {
          success: false,
          error: 'Formato de email inválido',
        };
      }

      // Validar que la contraseña no esté vacía
      if (!credentials.password || credentials.password.trim().length === 0) {
        return {
          success: false,
          error: 'La contraseña es requerida',
        };
      }

      // Buscar usuario en los datos mock
      // En producción, esto sería una consulta a la base de datos
      const mockUser = findMockUserByEmail(credentials.email);
      
      if (!mockUser) {
        return {
          success: false,
          error: 'Usuario no encontrado',
        };
      }

      // Verificar contraseña
      const isPasswordValid = await verifyPassword(
        credentials.password, 
        mockUser.hashedPassword
      );

      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Contraseña incorrecta',
        };
      }

      // Convertir a User (sin datos sensibles)
      const user = mockUserToUser(mockUser);
      
      // Generar token JWT
      const token = generateAuthToken(user);

      return {
        success: true,
        user,
        token,
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Error interno del servidor',
      };
    }
  }

  /**
   * Obtiene un usuario por su ID
   * Usado para refrescar datos de sesión
   */
  static async getUserById(id: string): Promise<User | null> {
    try {
      // En producción, esto sería una consulta a la base de datos
      const mockUser = findMockUserById(id);
      
      if (!mockUser) {
        return null;
      }

      return mockUserToUser(mockUser);
    } catch (error) {
      console.error('Get user by ID error:', error);
      return null;
    }
  }

  /**
   * Obtiene un usuario por su email
   * Útil para verificaciones y actualizaciones
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const mockUser = findMockUserByEmail(email);
      
      if (!mockUser) {
        return null;
      }

      return mockUserToUser(mockUser);
    } catch (error) {
      console.error('Get user by email error:', error);
      return null;
    }
  }

  /**
   * Verifica si un email ya está registrado
   */
  static async isEmailTaken(email: string): Promise<boolean> {
    try {
      const user = await this.getUserByEmail(email);
      return user !== null;
    } catch (error) {
      console.error('Check email taken error:', error);
      return false;
    }
  }

  /**
   * Actualiza la última fecha de acceso del usuario
   * En producción, esto actualizaría la base de datos
   */
  static async updateLastLogin(userId: string): Promise<void> {
    try {
      // En un sistema real, aquí actualizarías la base de datos
      console.log(`Updated last login for user ${userId} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('Update last login error:', error);
    }
  }
}

/**
 * Helper para manejar errores de autenticación de forma consistente
 */
export function handleAuthError(error: unknown): AuthError {
  if (error instanceof Error) {
    // Mapear errores conocidos
    if (error.message.includes('not found')) {
      return createAuthError('USER_NOT_FOUND', 'Usuario no encontrado');
    }
    if (error.message.includes('password')) {
      return createAuthError('INVALID_CREDENTIALS', 'Credenciales inválidas');
    }
  }
  
  return createAuthError('SERVER_ERROR', 'Error interno del servidor');
}