import { RegisterForm } from '@/components/forms/RegisterFrom';
import '@/styles/pages/register.css'
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { IoCloseOutline } from 'react-icons/io5';

export default function RegisterPage() {

  return (
    <div className="register-container">
      <div className="register-box">

        {/* Boton de cerrar */}
        <Link href={'/'} 
        className="close-btn" 
        aria-label="Cerrar">
          <IoCloseOutline />
        </Link>

        <h2 className="register-title">Crear Cuenta</h2>
        <p className="register-subtitle">
          Completa tus datos para registrarte
        </p>

        <RegisterForm />

        <p className="login-text">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="login-link">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
