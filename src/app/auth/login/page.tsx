import Link from "next/link";
import "@/styles/pages/login.css";
import { IoCloseOutline } from "react-icons/io5";
import { LoginForm } from "@/components";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Botón cerrar (X) */}
        <Link href={"/"} className="close-btn" aria-label="Cerrar">
          <IoCloseOutline />
        </Link>

        {/* Título */}
        <h2 className="login-title">Iniciar Sesión</h2>
        <p style={{ marginBottom: "1.5rem", color: "#666" }}>
          Accede a tu cuenta
        </p>

        {/* Formulario */}
        <LoginForm />
      </div>
    </div>
  );
};