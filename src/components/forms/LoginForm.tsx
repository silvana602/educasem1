/**
 * Componente de formulario de login con validaciones
 * Interfaz de usuario para el inicio de sesión
 * Soporta login con credenciales y Google OAuth
 */

"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { signIn } from "next-auth/react";
import { IoAlertCircleOutline, IoLogoGoogle } from "react-icons/io5";
import Link from "next/link";
import { 
  validateLoginForm, 
  hasValidationErrors
} from "@/lib/login-validation";
import type { LoginErrors } from "@/types/login.types";

/**
 * Formulario de inicio de sesión con validaciones completas
 * 
 * Características:
 * - Validación en tiempo real
 * - Errores específicos por campo
 * - Mensaje general de credenciales incorrectas
 * - Inputs marcados en rojo cuando hay error
 * - Login con Google OAuth
 * 
 * @example
 * ```tsx
 * // En app/auth/signin/page.tsx
 * export default function SignInPage() {
 *   return <LoginForm />;
 * }
 * ```
 */
export function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Limpia el error de un campo específico
   */
  const clearFieldError = (field: keyof LoginErrors) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Maneja el cambio en el campo de email
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Limpiar errores cuando el usuario empieza a escribir
    clearFieldError('email');
    clearFieldError('general');
  };

  /**
   * Maneja el cambio en el campo de contraseña
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    // Limpiar errores cuando el usuario empieza a escribir
    clearFieldError('password');
    clearFieldError('general');
  };

  /**
   * Valida el formulario antes de enviarlo
   */
  const validateForm = (): boolean => {
    const validationErrors = validateLoginForm(email, password);
    
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      return false;
    }
    
    return true;
  };

  /**
   * Maneja el envío del formulario de credenciales
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    // Validar formulario
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    // Intentar login
    const result = await login(email, password);

    if (!result.success) {
      setErrors({
        general: result.error || "Error al iniciar sesión",
      });
      setIsSubmitting(false);
    }
    // Si success es true, el hook ya maneja la redirección
  };

  /**
   * Maneja el login con Google
   */
  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      setErrors({
        general: "Error al iniciar sesión con Google",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Email */}
        <div>
          {errors.email && (
            <div className="field-error">
              <IoAlertCircleOutline className="error-icon" />
              <span>{errors.email}</span>
            </div>
          )}
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`input-field ${errors.email ? 'input-error' : ''}`}
            placeholder="tu@email.com"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting || isLoading}
          />
        </div>

        {/* Campo Contraseña */}
        <div>
          {errors.password && (
            <div className="field-error">
              <IoAlertCircleOutline className="error-icon" />
              <span>{errors.password}</span>
            </div>
          )}
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className={`input-field ${errors.password ? 'input-error' : ''}`}
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            disabled={isSubmitting || isLoading}
          />
        </div>

        {/* Opciones del formulario */}
        <div className="form-options">
          <Link href="/auth/forgot-password" className="forgot-link">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Error general (credenciales incorrectas) */}
        {errors.general && (
          <div className="msg-error">
            <IoAlertCircleOutline />
            <span>{errors.general}</span>
          </div>
        )}

        {/* Botón de login */}
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="login-btn"
        >
          {isSubmitting || isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>

        {/* Divisor */}
        <div className="divider">
          <span>O continúa con</span>
        </div>

        {/* Botón de Google */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting || isLoading}
            className="google-btn"
          >
            <IoLogoGoogle className="google-icon" />
            Google
          </button>
        </div>
      </form>

      {/* Link para registro */}
      <p className="signup-text">
        ¿No tienes una cuenta?{" "}
        <Link href="/auth/register" className="signup-link">
          Registrarse
        </Link>
      </p>
    </>
  );
}