import '@/styles/pages/register.css'
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { IoCloseOutline } from 'react-icons/io5';

export default function RegisterForm() {

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

        <form className="register-form">
          {/* Nombres y Apellidos */}
          <div className="form-row">
            <div className="form-group">
              <label>Nombres <span className='text-red-500'>*</span></label>
              <input type="text" placeholder="Juan" />
            </div>
            <div className="form-group">
              <label>Apellidos <span className='text-red-500'>*</span></label>
              <input type="text" placeholder="Perez" />
            </div>
          </div>

          {/* Correo y Teléfono */}
          <div className="form-row">
            <div className="form-group">
              <label>Correo Electrónico <span className='text-red-500'>*</span></label>
              <input type="email" placeholder="tu@email.com" />
            </div>
            <div className="form-group">
              <label>Teléfono / Celular <span className='text-red-500'>*</span></label>
              <input type="tel" placeholder="+591 12345678" />
            </div>
          </div>

          {/* Contraseña y Confirmar */}
          <div className="form-row">
            <div className="form-group">
              <label>Contraseña <span className='text-red-500'>*</span></label>
              <input type="password" placeholder="*********" />
            </div>
            <div className="form-group">
              <label>Confirmar Contraseña <span className='text-red-500'>*</span></label>
              <input type="password" placeholder="*********" />
            </div>
          </div>

          {/* Fecha y País */}
          <div className="form-row">
            <div className="form-group">
              <label>Fecha de Nacimiento <span className='text-red-500'>*</span></label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>País <span className='text-red-500'>*</span></label>
              <select>
                <option value="">Seleccionar un país</option>
                <option value="bo">Bolivia</option>
                <option value="ar">Argentina</option>
                <option value="pe">Perú</option>
                <option value="cl">Chile</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Registrarse
          </button>
        </form>

        <p className="login-text">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login" className="login-link">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
