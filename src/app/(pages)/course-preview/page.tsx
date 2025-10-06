"use client";

import React, { useState } from "react";
// components/CoursePage.tsx
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import {
  IoPlayCircleOutline,
  IoDownloadOutline,
  IoRibbonOutline,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi";
import "@/styles/pages/course-preview.css";
import { Footer } from "@/components";

interface Video {
  id: number;
  title: string;
  duration: string;
  isPreview?: boolean;
}

interface Section {
  id: number;
  title: string;
  totalClasses: number;
  totalDuration: string;
  videos: Video[];
}

export default function CoursePage() {
  const [isSaved, setIsSaved] = React.useState(false);

  const [openSections, setOpenSections] = useState<number[]>([1]);
  const [collapseAll, setCollapseAll] = useState(false);

  const [showFullBio, setShowFullBio] = useState(false);

  const tutorBio =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.";

  const sections: Section[] = [
    {
      id: 1,
      title: "Seccion 1",
      totalClasses: 4,
      totalDuration: "45 min",
      videos: [
        {
          id: 1,
          title: "Titulo del video 1",
          duration: "10:30",
          isPreview: true,
        },
        {
          id: 2,
          title: "Titulo del video 2",
          duration: "12:15",
          isPreview: true,
        },
        { id: 3, title: "Titulo del video 3", duration: "08:45" },
        { id: 4, title: "Titulo del video 4", duration: "13:30" },
      ],
    },
    {
      id: 2,
      title: "Seccion 2",
      totalClasses: 3,
      totalDuration: "40 min",
      videos: [
        { id: 7, title: "Titulo del video 1", duration: "15:00" },
        { id: 8, title: "Titulo del video 2", duration: "12:30" },
        { id: 9, title: "Titulo del video 3", duration: "12:30" },
      ],
    },
    {
      id: 3,
      title: "Seccion 3",
      totalClasses: 2,
      totalDuration: "35 min",
      videos: [
        { id: 10, title: "Titulo del video 1", duration: "20:00" },
        { id: 11, title: "Titulo del video 2", duration: "15:00" },
      ],
    },
  ];

  const toggleSection = (sectionId: number) => {
    if (openSections.includes(sectionId)) {
      setOpenSections(openSections.filter((id) => id !== sectionId));
    } else {
      setOpenSections([...openSections, sectionId]);
    }
  };

  const handleCollapseAll = () => {
    if (collapseAll) {
      setOpenSections(sections.map((s) => s.id));
      setCollapseAll(false);
    } else {
      setOpenSections([]);
      setCollapseAll(true);
    }
  };

  return (
    <>
      <div className="course-page">
        {/* Header */}
        <div className="course-header">
          <h1 className="course-title">Titulo del curso</h1>
          <div className="course-actions">
            <button className="btn-buy">Comprar</button>
            <button className="btn-save" onClick={() => setIsSaved(!isSaved)}>
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="course-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum!
        </p>

        {/* Tutor Info */}
        <div className="tutor-section">
          <h2 className="tutor-name">Nombre del tutor del curso</h2>
          <div className="course-meta">
            <span className="course-date">Fecha: __/__/__/</span>
            <span className="course-language">Idioma: Español</span>
            <button className="btn-theme">Tema</button>
          </div>
        </div>

        <div className="divider"></div>

        {/* Lo que aprenderás */}
        <section className="learning-section">
          <h2 className="section-title">Lo que aprenderás</h2>
          <div className="topics-grid">
            {/* Columna 1 */}
            <div className="topics-column">
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 1</span>
              </div>
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 2</span>
              </div>
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 3</span>
              </div>
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 4</span>
              </div>
            </div>
            {/* Columna 2 */}
            <div className="topics-column">
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 1</span>
              </div>
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 2</span>
              </div>
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 3</span>
              </div>
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 4</span>
              </div>
            </div>
            {/* Columna 3 */}
            <div className="topics-column">
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 1</span>
              </div>
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 2</span>
              </div>
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 3</span>
              </div>
              <div className="topic-item">
                <MdEdit className="topic-icon" />
                <span>Tema 4</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lo que incluye */}
        <section className="includes-section">
          <h2 className="section-title">Lo que aprenderás</h2>
          <div className="includes-grid">
            <div className="include-item">
              <IoPlayCircleOutline className="include-icon" />
              <span>## horas de estudio</span>
            </div>
            <div className="include-item">
              <IoDownloadOutline className="include-icon" />
              <span># de recursos disponibles</span>
            </div>
            <div className="include-item">
              <HiOutlineDocumentText className="include-icon" />
              <span># de artículos totales</span>
            </div>
            <div className="include-item">
              <IoRibbonOutline className="include-icon" />
              <span>1 Certificado al final del curso</span>
            </div>
          </div>
        </section>

        {/* Contenido del curso */}
        <section className="content-section">
          <h2 className="section-title">Contenido del curso</h2>
          <div className="content-stats">
            <div className="stat-item">
              <span className="stat-icon">›</span>
              <span># de clases en total</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">›</span>
              <span># de secciones en total</span>
            </div>
            <button className="collapse-all-btn" onClick={handleCollapseAll}>
              {collapseAll ? "Expandir todo" : "Colapsar todo"}
            </button>
          </div>
        </section>

        <div className="course-accordion-container">
          <div className="accordion-sections">
            {sections.map((section) => (
              <div key={section.id} className="accordion-section">
                <button
                  className="section-header"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="section-header-left">
                    <span className="chevron-icon">
                      {openSections.includes(section.id) ? (
                        <IoChevronUp />
                      ) : (
                        <IoChevronDown />
                      )}
                    </span>
                    <h3 className="section-title">{section.title}</h3>
                  </div>
                  <div className="section-info">
                    <span className="section-classes"># de clases</span>
                    <span className="section-duration">__:__ min</span>
                  </div>
                </button>

                <div
                  className={`section-content ${
                    openSections.includes(section.id) ? "open" : ""
                  }`}
                >
                  {section.videos.map((video) => (
                    <div key={video.id} className="video-item">
                      <div className="video-left">
                        <FaPlay className="play-icon" />
                        <span className="video-title">{video.title}</span>
                      </div>
                      <div className="video-right">
                        {video.isPreview && (
                          <a href="#" className="preview-link">
                            Vista previa
                          </a>
                        )}
                        <span className="video-duration">__:__</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <h2 className="tutor-section-title">Tutor de clase</h2>

        <div className="tutor-profile-container">
          {/* Foto del tutor */}
          <div className="tutor-photo-container">
            <div className="tutor-photo">
              <span className="photo-placeholder">foto tutor</span>
            </div>

            {/* Botones */}
            <div className="tutor-actions">
              <button className="btn-buy">Comprar</button>
              <button className="btn-save" onClick={() => setIsSaved(!isSaved)}>
                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
          </div>

          {/* Información del tutor */}
          <div className="tutor-info-container">
            <h3 className="tutor-name">Nombre de tutor de la clase</h3>
            <p className="tutor-profession">Profesion del tutor</p>

            <div className="tutor-stats">
              <p className="tutor-stat"># de estudiantes</p>
              <p className="tutor-stat"># de cursos</p>
            </div>

            <div className="tutor-bio">
              <p className={showFullBio ? "bio-text expanded" : "bio-text"}>
                {tutorBio}
              </p>
              <button
                className="btn-ver-mas"
                onClick={() => setShowFullBio(!showFullBio)}
              >
                {showFullBio ? "Ver menos" : "Ver mas ..."}
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
