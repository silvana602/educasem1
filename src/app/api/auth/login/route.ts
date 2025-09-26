import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth-service';
import type { LoginCredentials } from '@/types/auth';

/**
 * Ruta API adicional para login personalizado
 * POST /api/auth/login
 * 
 * Esta ruta es opcional y proporciona una alternativa
 * al sistema de NextAuth para casos de uso específicos
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos requeridos
    if (!body.email || !body.password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email y contraseña son requeridos' 
        },
        { status: 400 }
      );
    }

    const credentials: LoginCredentials = {
      email: body.email,
      password: body.password,
    };

    // Procesar login
    const loginResponse = await AuthService.login(credentials);

    if (!loginResponse.success) {
      return NextResponse.json(
        loginResponse,
        { status: 401 }
      );
    }

    // Login exitoso
    return NextResponse.json(loginResponse, { status: 200 });

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}

/**
 * Método no permitido para otros verbos HTTP
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Método no permitido' },
    { status: 405 }
  );
}