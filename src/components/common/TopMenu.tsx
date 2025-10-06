"use client";

import Link from "next/link";
import "@/styles/components/topMenu.css";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { IoMenuOutline } from "react-icons/io5";

export const TopMenu = () => {
  const { data: session } = useSession();
  console.log({ session });

  const isAuthenticated = !!session?.user;

  const userName = session?.user.name;

  // const isRole = session?.user.role;
  // if (isRole === "admin") {
  //   console.log({ isRole });
  // } else if (isRole === "tutor") {
  //   console.log({ isRole });
  // } else {
  //   console.log({ isRole });
  // }

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="navigation">
        {/* Logo */}
        <div className="logo-box">
          <Link href="/">
            <span className="title-app">Educasem</span>
          </Link>
        </div>

        {/* Menu central DESKTOP */}
        <div className="menu-desktop">
          <Link className="option-menu" href="#cursos">
            Cursos
          </Link>
          <Link className="option-menu" href="#profesores">
            Profesores
          </Link>
          <Link className="option-menu" href="#planes">
            Planes
          </Link>
          <Link className="option-menu" href="#contacto">
            Contacto
          </Link>
        </div>

        {/* BOTONES DESKTOP - SI NO ESTA AUTENTICADO */}
        {!isAuthenticated && (
          <div className="buttons-desktop">
            <Link href={"/login"} className="btn-login">
              Iniciar Sesión
            </Link>
            <Link href={"/register"} className="btn-signup">
              Registrarse
            </Link>
          </div>
        )}

        {/* BOTON DESKTOP - SI ESTA AUTENTICADO */}
        {isAuthenticated && (
          <div className="buttons-desktop">
            <div className="identity">
              <span className="usuario">{userName}</span>
              <span className="separate"> | </span>
            </div>
            <div
              className="btn-sesion"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <Link href={"/"} className="btn-exit">
                Salir
              </Link>
            </div>
          </div>
        )}

        {/* Botón hamburguesa */}
        <button
          title="menu-hamburguesa"
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoMenuOutline />
        </button>

        {/* Menú MÓVIL/TABLET */}
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          {isAuthenticated && (
            <div className="identity">
              <span className="usuario user-menu">{userName}</span>
            </div>
          )}

          <Link className="option-menu" href="#cursos" onClick={closeMenu}>
            Cursos
          </Link>
          <Link className="option-menu" href="#profesores" onClick={closeMenu}>
            Profesores
          </Link>
          <Link className="option-menu" href="#planes" onClick={closeMenu}>
            Planes
          </Link>
          <Link className="option-menu" href="#contacto" onClick={closeMenu}>
            Contacto
          </Link>

          {/* Botones en menú móvil */}
          <div className="btn-sesion">
            {!isAuthenticated && (
              <>
                <Link href={"/login"} className="btn-login" onClick={closeMenu}>
                  Iniciar Sesión
                </Link>
                <Link
                  href={"/register"}
                  className="btn-signup"
                  onClick={closeMenu}
                >
                  Registrarse
                </Link>
              </>
            )}

            {isAuthenticated && (
              <Link
                href={"/"}
                className="btn-exit"
                onClick={() => {
                  closeMenu();
                  signOut({ callbackUrl: "/" });
                }}
              >
                Salir
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay borroso */}
      <div
        className={`menu-overlay ${isOpen ? "active" : ""}`}
        onClick={closeMenu}
      />
    </>
  );
};
