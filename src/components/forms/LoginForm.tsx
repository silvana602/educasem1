// src/components/forms/LoginForm.tsx

"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { IoLogoGoogle, IoAlertCircleOutline } from "react-icons/io5";
import { useRememberMe } from "@/hooks/useRememberMe";
import { getDashboardUrl } from "@/lib/auth-utils";
import type { LoginCredentials } from "@/types/auth";

interface LoginFormProps {
  redirectTo?: string;
}

export const LoginForm = ({ redirectTo }: LoginFormProps) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { rememberMe, savedEmail, toggleRememberMe, saveEmail } = useRememberMe();
  
  const [formData, setFormData] = useState<LoginCredentials>({
    email: savedEmail,
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación básica
    if (!formData.email || !formData.password) {
      setError("Por favor, completa todos los campos");
      setLoading(false);
      return;
    }

    try {
      // Intentar login con NextAuth
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result?.ok) {
        // Guardar email si "Recordarme" está activado
        if (rememberMe) {
          saveEmail(formData.email);
        }
        
        // Obtener sesión actualizada para determinar redirección
        const session = await getSession();
        
        if (session?.user) {
          const dashboardUrl = redirectTo || getDashboardUrl(session.user.role);
          
          // Usar window.location para forzar recarga completa
          window.location.replace(dashboardUrl);
        } else {
          // Fallback si no hay sesión
          router.push(redirectTo || '/student/dashboard');
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error en el servidor. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signIn('google', {
        callbackUrl: redirectTo || '/student/dashboard',
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Error al conectar con Google");
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            className="input-field"
            required
            disabled={loading}
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>

        {/* Campo Contraseña */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="input-field"
            required
            disabled={loading}
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>

        {/* Opciones del formulario */}
        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={toggleRememberMe}
              disabled={loading}
            />
            {" "}Recordarme
          </label>
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
        <LoginButton loading={loading} />

        {/* Divisor */}
        <div className="divider">
          <span>O continúa con</span>
        </div>

        {/* Botón de Google */}
        <button 
          type="button" 
          className="google-btn" 
          disabled={loading}
          onClick={handleGoogleSignIn}
        >
          <IoLogoGoogle />
          Google
        </button>
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
};

interface LoginButtonProps {
  loading: boolean;
}

function LoginButton({ loading }: LoginButtonProps) {
  return (
    <button
      type="submit"
      className={clsx({
        "btn btn-primary": !loading,
        "btn btn-disabled": loading,
      })}
      disabled={loading}
    >
      {loading ? "Iniciando sesión..." : "Ingresar"}
    </button>
  );
}