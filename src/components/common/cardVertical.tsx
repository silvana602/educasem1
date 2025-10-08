"use client";

import React, { useState } from "react";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import "@/styles/components/cardVertical.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CourseCardDetail() {
  const { data: session } = useSession();
  console.log({ session });
  const isAuthenticated = !!session?.user;

  const [isSaved, setIsSaved] = useState(false);
  const progress = 45; // porcentaje de progreso

  return (
    <div className="course-card-detail">
      {/* Imagen del curso */}
      <div className="course-card-image-detail">
        <div className="image-overlay"></div>
        <span className="image-label">Imagen del Curso</span>
      </div>

      {/* Contenido */}
      <div className="course-card-body">
        {/* Header */}
        <div className="course-card-header">
          <div className="course-card-titles">
            <h3 className="course-card-title-main">Título del Curso</h3>
            <p className="course-card-tutor">Tutor del curso</p>
          </div>
          <Link href={"#"} className="btn-tag-course">
            Tema
          </Link>
        </div>

        {/* Descripción */}
        <p className="course-card-description-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem.
        </p>

        {/* Información */}
        <div className="course-card-info">
          <span className="info-item">
            <span className="info-icon">⏱</span> # horas
          </span>
          <span className="info-item">
            <span className="info-icon">📚</span> # clases
          </span>
        </div>

        {/* Precio */}
        <div className="course-card-price-section">
          <span className="price-label">Precio</span>
          <span className="course-card-price-text">$</span>
        </div>

        {/* Acciones principales */}
        <div className="course-card-actions-main">
          <button className="btn-buy-course">Comprar Curso</button>
          {isAuthenticated && (
            <button
              className={`btn-bookmark-course ${isSaved ? "saved" : ""}`}
              onClick={() => setIsSaved(!isSaved)}
              title={isSaved ? "Guardado" : "Guardar"}
            >
              {isSaved ? <IoBookmark /> : <IoBookmarkOutline />}
            </button>
          )}
        </div>

        {/* Barra de progreso */}
        <div className="course-progress-section">
          <div className="progress-header">
            <span className="progress-label">Progreso del curso</span>
            <span className="course-progress-text">{progress}%</span>
          </div>
          <div className="course-progress-bar">
            <div
              className="course-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <span className="progress-shimmer"></span>
            </div>
          </div>
        </div>

        {/* Acciones secundarias */}
        <div className="course-card-actions-secondary">
          <button className="btn-continue-course">
            <span className="btn-icon">▶</span>
            Continuar Aprendiendo
          </button>
          <button className="btn-certificate-course">
            <span className="btn-icon">🎓</span>
            Ver Certificado
          </button>
        </div>
      </div>
    </div>
  );
}
