/**
 * Proveedor de sesión para NextAuth
 * Envuelve la aplicación para proporcionar acceso a la sesión en todos los componentes
 */

'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface SessionProviderProps {
  children: ReactNode;
}

/**
 * Componente que provee el contexto de sesión a toda la aplicación
 * Debe envolver el contenido en el layout principal
 * 
 * @example
 * ```tsx
 * // En app/layout.tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <SessionProvider>
 *           {children}
 *         </SessionProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
}