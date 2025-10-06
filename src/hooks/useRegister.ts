/**
 * Hook personalizado para el registro de usuarios
 * Maneja la lógica del formulario de registro
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RegisterData, RegisterErrors } from "@/types/register.types";
import { validateRegisterForm, hasErrors } from "@/lib/register-validation";
import { registerUser } from "@/services/register.service";
import { signIn } from "next-auth/react";

/**
 * Estado inicial del formulario
 */
const initialFormData: RegisterData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  birthDate: "",
  country: "",
};

/**
 * Resultado del registro
 */
interface RegisterResult {
  success: boolean;
  message: string;
}

/**
 * Hook para gestionar el registro de usuarios
 *
 * @returns Objeto con estado del formulario y funciones de registro
 *
 * @example
 * ```tsx
 * const { formData, errors, isSubmitting, handleChange, handleSubmit } = useRegister();
 *
 * <form onSubmit={handleSubmit}>
 *   <input name="firstName" value={formData.firstName} onChange={handleChange} />
 * </form>
 * ```
 */
export function useRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterData>(initialFormData);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Maneja los cambios en los campos del formulario
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar el error del campo al escribir
    if (errors[name as keyof RegisterErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Valida el formulario completo
   */
  const validateForm = (): boolean => {
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);
    return !hasErrors(validationErrors);
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<RegisterResult> => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    // Validar formulario
    if (!validateForm()) {
      setIsSubmitting(false);
      return {
        success: false,
        message: "Por favor corrige los errores en el formulario",
      };
    }

    try {
      // Preparar datos para enviar (sin confirmPassword)
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        birthDate: formData.birthDate,
        country: formData.country,
        role: "student" as const, // Rol por defecto
      };

      // Registrar usuario
      const response = await registerUser(payload);

      if (!response.success) {
        setErrors({
          general: response.message,
        });
        setIsSubmitting(false);
        return {
          success: false,
          message: response.message,
        };
      }

      // Registro exitoso
      setSuccessMessage(response.message);

      // // Esperar 2 segundos antes de redirigir
      // setTimeout(() => {
      //   router.push('/auth/signin?registered=true');
      // }, 2000);

      // Iniciar sesión automáticamente usando las credenciales del nuevo usuario
      await signIn("credentials", {
        redirect: true,
        email: payload.email,
        password: payload.password,
        callbackUrl: "/dashboard",
      });

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      const errorMessage = "Error al procesar el registro. Intenta nuevamente.";
      setErrors({
        general: errorMessage,
      });
      setIsSubmitting(false);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  /**
   * Resetea el formulario a su estado inicial
   */
  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setSuccessMessage("");
    setIsSubmitting(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    successMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
