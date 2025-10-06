/**
 * Datos de países para el selector
 * Lista de países disponibles en el formulario de registro
 */

import type { Country } from '@/types/register.types';

/**
 * Lista de países disponibles
 * Ordenados alfabéticamente por nombre
 */
export const COUNTRIES: Country[] = [
  { code: 'ar', name: 'Argentina' },
  { code: 'bo', name: 'Bolivia' },
  { code: 'br', name: 'Brasil' },
  { code: 'cl', name: 'Chile' },
  { code: 'co', name: 'Colombia' },
  { code: 'cr', name: 'Costa Rica' },
  { code: 'cu', name: 'Cuba' },
  { code: 'ec', name: 'Ecuador' },
  { code: 'sv', name: 'El Salvador' },
  { code: 'es', name: 'España' },
  { code: 'gt', name: 'Guatemala' },
  { code: 'hn', name: 'Honduras' },
  { code: 'mx', name: 'México' },
  { code: 'ni', name: 'Nicaragua' },
  { code: 'pa', name: 'Panamá' },
  { code: 'py', name: 'Paraguay' },
  { code: 'pe', name: 'Perú' },
  { code: 'do', name: 'República Dominicana' },
  { code: 'uy', name: 'Uruguay' },
  { code: 've', name: 'Venezuela' },
];

/**
 * Obtiene el nombre del país por su código
 */
export function getCountryName(code: string): string {
  const country = COUNTRIES.find(c => c.code === code);
  return country?.name || code;
}