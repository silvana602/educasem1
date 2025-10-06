/**
 * Componente de formulario de registro
 * Interfaz de usuario para crear una nueva cuenta
 */

"use client";

import Link from "next/link";
import {
  IoCloseOutline,
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { useRegister } from "@/hooks/useRegister";
import { COUNTRIES } from "@/lib/countries";

/**
 * Formulario de registro de usuarios
 * Utiliza el hook useRegister para manejar la lógica
 *
 * @example
 * ```tsx
 * // En app/auth/register/page.tsx
 * import { RegisterForm } from '@/components/RegisterForm';
 *
 * export default function RegisterPage() {
 *   return <RegisterForm />;
 * }
 * ```
 */
export function RegisterForm() {
  const {
    formData,
    errors,
    isSubmitting,
    successMessage,
    handleChange,
    handleSubmit,
  } = useRegister();

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {/* Nombres y Apellidos */}
      <div className="form-row">
        <div className="form-group">
          <label>
            Nombres <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Juan"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.firstName ? "input-error" : ""}
          />
          {errors.firstName && (
            <span className="error-text"><IoAlertCircleOutline /> {errors.firstName}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            Apellidos <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Pérez"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.lastName ? "input-error" : ""}
          />
          {errors.lastName && (
            <span className="error-text"><IoAlertCircleOutline /> {errors.lastName}</span>
          )}
        </div>
      </div>

      {/* Correo y Teléfono */}
      <div className="form-row">
        <div className="form-group">
          <label>
            Correo Electrónico <span className="asterisk">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-text"><IoAlertCircleOutline /> {errors.email}</span>}
        </div>
        <div className="form-group">
          <label>
            Teléfono / Celular <span className="asterisk">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+591 12345678"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <span className="error-text"><IoAlertCircleOutline /> {errors.phone}</span>}
        </div>
      </div>

      {/* Contraseña y Confirmar */}
      <div className="form-row">
        <div className="form-group">
          <label>
            Contraseña <span className="asterisk">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <span className="error-text"><IoAlertCircleOutline /> {errors.password}</span>
          )}
          <small>
            Mínimo 8 caracteres, una mayúscula, una minúscula y un número
          </small>
        </div>
        <div className="form-group">
          <label>
            Confirmar Contraseña <span className="asterisk">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="*********"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.confirmPassword ? "input-error" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-text"><IoAlertCircleOutline /> {errors.confirmPassword}</span>
          )}
        </div>
      </div>

      {/* Fecha y País */}
      <div className="form-row">
        <div className="form-group">
          <label>
            Fecha de Nacimiento <span className="asterisk">*</span>
          </label>
          <input
            type="date"
            name="birthDate"
            placeholder="dd/mm/aaaa"
            value={formData.birthDate}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.birthDate ? "input-error" : ""}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.birthDate && (
            <span className="error-text"><IoAlertCircleOutline /> {errors.birthDate}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            País <span className="asterisk">*</span>
          </label>
          <select
            name="country"
            title="Seleccion un pais"
            value={formData.country}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.country ? "input-error" : ""}
          >
            <option value="">Seleccionar un país</option>
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="error-text"><IoAlertCircleOutline /> {errors.country}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn-submit"
        disabled={isSubmitting || !!successMessage}
      >
        {isSubmitting
          ? "Registrando..."
          : successMessage
          ? "Registro exitoso ✓"
          : "Registrarse"}
      </button>
    </form>
  );
}
