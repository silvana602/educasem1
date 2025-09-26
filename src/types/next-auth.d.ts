import { DefaultSession, DefaultUser } from 'next-auth';
import { UserRole } from './auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      avatar?: string;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date; 
      profile?: {
        phone?: string;
        bio?: string;
        specialization?: string;
        dateOfBirth?: Date;
      };
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: UserRole;
    avatar?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    profile?: {
      phone?: string;
      bio?: string;
      specialization?: string;
      dateOfBirth?: Date;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole;
    avatar?: string;
    isActive: boolean;
    profile?: {
      phone?: string;
      bio?: string;
      specialization?: string;
      dateOfBirth?: Date;
    };
  }
}