"use client";

import Link from "next/link";
import "@/styles/components/topMenu.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export const TopMenu = () => {
  const { data: session } = useSession();
  console.log({ session });

  const isAuthenticated = !!session?.user;

  // const isRole = session?.user.role;
  // if (isRole === "admin") {
  //   console.log({ isRole });
  // } else if (isRole === "tutor") {
  //   console.log({ isRole });
  // } else {
  //   console.log({ isRole });
  // }

  return (
    <nav className="navigation">
      <div className="logo-box">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className="title-app">Educasem</span>
          </Link>
        </div>
      </div>

      {/* Menu central */}
      <div className="hidden sm:block">
        <Link className="option-menu" href="/">
          Cursos
        </Link>
        <Link className="option-menu" href="/">
          Profesores
        </Link>
        <Link className="option-menu" href="/">
          Planes
        </Link>
        <Link className="option-menu" href="/">
          Contacto
        </Link>
      </div>

      {/* MOSTRAR BOTONES SI NO ESTA AUTENTICADO | LOGIN & SIGNUP */}
      {!isAuthenticated && (
        <>
          <div className="btn-sesionr">
            <Link href={"/auth/login"} className="btn-login">
              Inisiar Sesion
            </Link>

            <Link href={"/auth/register"} className="btn-signup">
              Registrarse
            </Link>
          </div>
        </>
      )}

      {/* MOSTRAR BOTON SI ESTA AUTENTICADO | EXIT */}
      {isAuthenticated && (
        <div className="btn-sesion" onClick={() => signOut({ callbackUrl: "/" })}>
          <Link href={"/"} className="btn-exit">
            Salir
          </Link>
        </div>
      )}
    </nav>
  );
};
