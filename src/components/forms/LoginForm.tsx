/**
 * Componente de formulario de login
 * Interfaz de usuario para el inicio de sesión
 * Soporta login con credenciales y Google OAuth
 */

"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { signIn } from "next-auth/react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IoLogoGoogle } from "react-icons/io";
import Link from "next/link";

/**
 * Formulario de inicio de sesión
 * Utiliza el hook useAuth para manejar la autenticación
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
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Maneja el envío del formulario de credenciales
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Validaciones básicas
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      setIsSubmitting(false);
      return;
    }

    // Intentar login
    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || "Error al iniciar sesión");
      setIsSubmitting(false);
    }
  };

  /**
   * Maneja el login con Google
   */
  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      setError("");

      await signIn("google", {
        callbackUrl: "/dashboard", // Redirigir al dashboard después del login
        redirect: true,
      });
    } catch (err) {
      setError("Error al iniciar sesión con Google");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Email */}
        <div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="input-field"
            placeholder="tu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting || isLoading}
          />
        </div>
        {/* Campo Contraseña */}
        <div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="input-field"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting || isLoading}
          />
        </div>
        {/* Opciones del formulario */}
        <div className="form-options">
          <Link href="/auth/forgot-password" className="forgot-link">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Mostrar error si existe */}
        {error && (
          <div className="msg-error">
            <IoAlertCircleOutline />
            <span>{error}</span>
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
