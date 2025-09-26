export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expires: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthError {
  message: string;
  code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'SERVER_ERROR' | 'TOKEN_EXPIRED';
}

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: User;
    token: string;
  }
  
  interface User {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'instructor' | 'admin';
    avatar?: string;
    isEmailVerified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role: string;
    isEmailVerified: boolean;
  }
}