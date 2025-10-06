"use client";

import React, { useState } from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import '@/styles/pages/detail-tutor.css';
import { IoGlobeOutline, IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoTiktok, IoLogoTwitter, IoLogoWebComponent, IoLogoYoutube } from 'react-icons/io5';
import Link from 'next/link';

export default function TutorPublicProfile() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const courses = [
    {
      id: 1,
      title: "TITULO DEL CURSO",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.",
      hours: 45,
      classes: 120,
      price: 99
    },
    {
      id: 2,
      title: "TITULO DEL CURSO",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.",
      hours: 30,
      classes: 85,
      price: 79
    },
    {
      id: 3,
      title: "TITULO DEL CURSO",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.",
      hours: 60,
      classes: 150,
      price: 120
    }
  ];

  const totalSlides = Math.ceil(courses.length / 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="tutor-public-profile">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-info">
          <h1 className="profile-name">Nombre del Tutor</h1>
          <p className="profile-profession">Profesion del tutor</p>
          
          <div className="profile-stats">
            <p className="stat-item"># de estudiantes</p>
            <p className="stat-item"># de cursos</p>
          </div>
        </div>

        <div className="profile-photo-section">
          <div className="profile-photo">
            <span className="photo-text">foto del tutor</span>
          </div>
          
          <div className="social-links">
            <Link href="#" className="social-icon"><IoGlobeOutline /></Link>
            <Link href="#" className="social-icon"><IoLogoLinkedin /></Link>
            <Link href="#" className="social-icon"><IoLogoFacebook /></Link>
            <Link href="#" className="social-icon"><IoLogoTwitter /></Link>
            <Link href="#" className="social-icon"><IoLogoInstagram /></Link>
            <Link href="#" className="social-icon"><IoLogoYoutube /></Link>
            <Link href="#" className="social-icon"><IoLogoTiktok /></Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section">
        <h2 className="section-heading">Sobre mi</h2>
        <div className="about-text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! Provident similique accusantium nemo autem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! Provident similique accusantium nemo autem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! Provident similique accusantium nemo autem.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses-section">
        <h2 className="section-heading">Mis cursos ( # )</h2>
        
        <div className="courses-carousel">
          <button className="carousel-btn prev" onClick={prevSlide}>
            ‹
          </button>

          <div className="courses-container">
            <div className="courses-grid"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {courses.map((course) => (
                <div key={course.id} className="course-card-profile">
                  <div className="course-card-image">
                    <span className="image-placeholder">foto del curso</span>
                  </div>
                  
                  <div className="course-card-content">
                    <h3 className="course-card-title">{course.title}</h3>
                    <p className="course-card-description">{course.description}</p>
                    
                    <div className="course-card-meta">
                      <span className="meta-item"># horas</span>
                      <span className="meta-item"># clases</span>
                    </div>
                    
                    <div className="course-card-footer">
                      <span className="course-card-price">PRECIO $</span>
                      <div className="card-actions">
                        <button className="btn-comprar">Comprar</button>
                        <button className="btn-bookmark">
                          <BsBookmarkFill />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next" onClick={nextSlide}>
            ›
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="carousel-dots">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}