'use client';

import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types/auth.types';

export function UserInfo() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Mostrar loading
  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Si no está autenticado
  if (!isAuthenticated || !user) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">No has iniciado sesión</p>
      </div>
    );
  }

  // Validación defensiva del objeto user
  const {
    id = '',
    name = 'Usuario',
    email = '',
    role = 'guest',
    avatar,
  } = user as Partial<User>;

  const getRoleBadgeColor = (role: string): string => {
    const colors: Record<string, string> = {
      admin: 'bg-purple-100 text-purple-800',
      instructor: 'bg-green-100 text-green-800',
      student: 'bg-blue-100 text-blue-800',
      guest: 'bg-gray-100 text-gray-800',
    };
    return colors[role] || colors.guest;
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-2xl font-medium text-white">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Información del usuario */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{email}</p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getRoleBadgeColor(role)}`}
          >
            {role.toUpperCase()}
          </span>
        </div>

        {/* Botón de logout */}
        <button
          onClick={logout}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Información adicional */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">ID de Usuario</dt>
            <dd className="mt-1 text-sm text-gray-900 font-mono">{id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Rol</dt>
            <dd className="mt-1 text-sm text-gray-900 capitalize">{role}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
