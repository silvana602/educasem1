"use client";

import React, { useState, useEffect } from "react";
import { BsBookmarkFill } from "react-icons/bs";
import "@/styles/pages/detail-tutor.css";
import { Footer } from "@/components";
import Link from "next/link";
import {
  IoGlobeOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTiktok,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io5";

export default function DetailTutor() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const courses = [
    {
      id: 1,
      title: "TITULO DEL CURSO",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur.",
      hours: 45,
      classes: 120,
      price: 99,
    },
    {
      id: 2,
      title: "TITULO DEL CURSO",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur.",
      hours: 30,
      classes: 85,
      price: 79,
    },
  ];

  const totalSlides = courses.length;

  // Auto-scroll cada 4 segundos
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
      <div className="tutor-profile-complete">
        {/* Header Section */}
        <div className="profile-main-header">
          {/* Left Side - Info */}
          <div className="profile-main-info">
            <h1 className="profile-main-name">Nombre del Tutor</h1>
            <p className="profile-main-profession">Profesion del tutor</p>

            <div className="profile-main-stats">
              <p># de estudiantes</p>
              <p># de cursos</p>
            </div>
          </div>

          {/* Right Side - Photo and Social */}
          <div className="profile-main-right">
            <div className="profile-main-photo">
              <span className="photo-label">foto del tutor</span>
            </div>

            <div className="profile-main-socials">
              <Link href="#" className="social-icon">
                <IoGlobeOutline />
              </Link>
              <Link href="#" className="social-icon">
                <IoLogoLinkedin />
              </Link>
              <Link href="#" className="social-icon">
                <IoLogoFacebook />
              </Link>
              <Link href="#" className="social-icon">
                <IoLogoTwitter />
              </Link>
              <Link href="#" className="social-icon">
                <IoLogoInstagram />
              </Link>
              <Link href="#" className="social-icon">
                <IoLogoYoutube />
              </Link>
              <Link href="#" className="social-icon">
                <IoLogoTiktok />
              </Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="profile-about-section">
          <h2 className="profile-section-title">Sobre mi</h2>
          <div className="profile-about-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem.
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="profile-courses-section">
          <h2 className="profile-section-title">Mis cursos ( # )</h2>

          <div
            className="profile-courses-carousel"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <button className="carousel-arrow prev" onClick={prevSlide}>
              ‹
            </button>

            <div className="profile-courses-wrapper">
              <div
                className="profile-courses-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {courses.map((course) => (
                  <div key={course.id} className="profile-course-card">
                    <div className="course-thumbnail">
                      <span className="thumbnail-text">foto del curso</span>
                    </div>

                    <div className="course-details">
                      <h3 className="course-name">{course.title}</h3>
                      <p className="course-desc">{course.description}</p>

                      <div className="course-stats">
                        <span># horas</span>
                        <span># clases</span>
                      </div>

                      <div className="course-bottom">
                        <span className="course-pricing">PRECIO $</span>
                        <div className="course-actions">
                          <button className="btn-purchase">Comprar</button>
                          <button title="btn" className="btn-save-course">
                            <BsBookmarkFill />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-arrow next" onClick={nextSlide}>
              ›
            </button>
          </div>
        </section>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
