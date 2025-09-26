import '@/styles/pages/home.css'
// import { Search } from './ui';

import { IoCheckmarkCircle, IoGlobeOutline, IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoTiktok, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="container">
      <main className="main">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Conocimiento que empodera y transforma vidas con sentido
            </h1>
            <p className="hero-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit. Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Blanditiis voluptate ducimus sapiente eius fuga, velit animi
              aspernatur quae distinctio, tenetur a sequi recusandae. Voluptas
              reiciendis nisi nostrum labore quibusdam dignissimos. Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Eum quo eligendi
              earum iure officia et. Doloremque, assumenda
            </p>
          </div>
        </section>

        {/* Search Section */}
        {/* <Search /> */}

        {/* Why Study Section */}
        <section className="question-section">
          <div className="question-content">
            <h2 className="section-question-title">
              ¿Por qué estudiar con nosotros?
            </h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <IoCheckmarkCircle size={30} />
                </div>
                <p className="benefit-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <IoCheckmarkCircle size={30} />
                </div>
                <p className="benefit-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <IoCheckmarkCircle size={30} />
                </div>
                <p className="benefit-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <IoCheckmarkCircle size={30} />
                </div>
                <p className="benefit-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
          <div className="question-image">
            <Image
              src="/imgs/portada.jpg"
              alt="portada"
              width={500}
              height={300}
            />
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="popular-courses-section">
          <div className="section-intro-courses">
            <h2 className="section-title">Nuestros Cursos más Populares</h2>
            <p className="section-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="courses-grid">
            {[1, 2, 3].map((course) => (
              <div key={course} className="course-card">
                <div className="course-image">
                  <Image
                    src="/imgs/portada.jpg"
                    alt="portada"
                    width={500}
                    height={200}
                  />
                </div>
                <div className="course-content">
                  <h3 className="course-title">TÍTULO DEL CURSO</h3>
                  <span className="course-tutor">Tutor de curso</span>
                  <div className="course-info">
                    <span className="course-theme">Tema</span>
                    <span className="course-price">$99</span>
                  </div>
                  <button className="enroll-button">Inscribirse</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professionals Section */}
        <section className="professionals-section">
          {/* Columna izquierda */}
          <div className="professionals-content">
            <h2 className="section-title">Nuestros Profesionales</h2>
            <p className="section-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore.
            </p>
          </div>

          {/* Columna derecha con carrusel */}
          <div className="professionals-carousel">
            <div className="carousel-track">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="professional-card">
                  <div className="professional-image">
                    <Image
                      src="/imgs/portada.jpg"
                      alt="Profesor"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="professional-info">
                    <h4 className="professional-name">Profesor {i + 1}</h4>
                    <p className="professional-title">
                      Especialista en su área
                    </p>
                    <p className="professional-desc">
                      Breve descripción del profesor {i + 1}.
                    </p>
                  </div>
                </div>
              ))}

              {/* Duplicamos para scroll infinito */}
              {Array.from({ length: 6 }, (_, i) => (
                <div key={`dup-${i}`} className="professional-card">
                  <div className="professional-image">
                    <Image
                      src="/imgs/portada.jpg"
                      alt="Profesor"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="professional-info">
                    <h4 className="professional-name">Profesor {i + 1}</h4>
                    <p className="professional-title">
                      Especialista en su área
                    </p>
                    <p className="professional-desc">
                      Breve descripción del profesor {i + 1}.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="pricing-section">
          <h2 className="section-title">Los mejores planes</h2>
          <div className="pricing-container">
            <div className="pricing-card featured">
              <div className="best-offer">MEJOR OFERTA</div>
              <h3 className="plan-title">Mes</h3>
              <div className="plan-price">$$</div>
              <div className="plan-features">
                <div className="feature">
                  <span className="feature-bullet">•</span>
                  <span className="feature-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
                <div className="feature">
                  <span className="feature-bullet">•</span>
                  <span className="feature-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
                <div className="feature">
                  <span className="feature-bullet">•</span>
                  <span className="feature-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
              </div>
              <button className="plan-button featured-button">
                Comenzar prueba por 7 días
              </button>
            </div>

            <div className="pricing-card">
              <h3 className="plan-title">Año</h3>
              <div className="plan-price">$$</div>
              <div className="plan-features">
                <div className="feature">
                  <span className="feature-bullet">•</span>
                  <span className="feature-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
                <div className="feature">
                  <span className="feature-bullet">•</span>
                  <span className="feature-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                  </span>
                </div>
              </div>
              <button className="plan-button">Obtener plan</button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-image">
              <Image
                src="/imgs/portada.jpg"
                alt="Profesor"
                width={500}
                height={400}
              />
            </div>
            <div className='contact-content'>
              <h2 className='contact-title'>Contáctanos</h2>
              <p className='contact-subtitle'>
                y síguenos en nuestras redes sociales
              </p>

              <form className='contact-form'>
                <div className='form-row'>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className='form-input'
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className='form-input'
                    required
                  />
                </div>
                <textarea
                  placeholder="Mensaje"
                  className='form-textarea'
                  rows={4}
                  required
                ></textarea>

                <div className='from-footer'>
                  <div className='social-links'>
                    <Link
                      href="https://cecasem.com/"
                      className='social-icon'
                      aria-label="Website"
                    >
                      <IoGlobeOutline />
                    </Link>
                    <Link
                      href="https://www.facebook.com/cecasem.bolivia"
                      className='social-icon'
                      aria-label="Facebook"
                    >
                      <IoLogoFacebook />
                    </Link>
                    <Link
                      href="https://www.instagram.com/cecasem_bolivia"
                      className='social-icon'
                      aria-label="Instagram"
                    >
                      <IoLogoInstagram />
                    </Link>
                    <Link
                      href="https://x.com/cecasembol"
                      className='social-icon'
                      aria-label="X"
                    >
                      <IoLogoTwitter /> {/* CAMBIAR ICONO */}
                    </Link>
                    <Link
                      href="https://bo.linkedin.com/company/cecasem"
                      className='social-icon'
                      aria-label="LinkedIn"
                    >
                      <IoLogoLinkedin />
                    </Link>
                    <Link
                      href="https://www.tiktok.com/@cecasembolivia"
                      className='social-icon'
                      aria-label="TikTok"
                    >
                      <IoLogoTiktok />
                    </Link>
                    <Link
                      href="https://www.youtube.com/@cecasembolivia"
                      className='social-icon'
                      aria-label="YouTube"
                    >
                      <IoLogoYoutube />
                    </Link>
                  </div>
                  <button type="submit" className='submit-button'>
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
