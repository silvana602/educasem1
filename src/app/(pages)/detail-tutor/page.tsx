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
import CourseCardDetail from "@/components/common/cardVertical";

export default function DetailTutor() {
  const repeatCount = 6;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % repeatCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [repeatCount]);

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

          <div className="relative w-full overflow-hidden group">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {[...Array(repeatCount)].map((_, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2">
                  <CourseCardDetail />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
