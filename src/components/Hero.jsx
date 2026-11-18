import React, { useState } from 'react';
import profilePhoto from '../assets/profile.jpg';
import { CV_FILE_PATH } from './Navbar';

export default function Hero({ onNavigate }) {
  const [imgError, setImgError] = useState(false);

  const handleNav = (e, page, sectionId = null) => {
    e.preventDefault();
    onNavigate(page, sectionId);
  };

  return (
    <section id="home" className="section-container hero-section">
      <div className="hero-layout">
        <div className="hero-content">
          <span className="eyebrow">Personal Portfolio</span>
          <h1 className="hero-name">THARANITHAN SANTHIRATHAS</h1>
          <p className="hero-role">
            Aspiring Software Developer | IT Enthusiast
          </p>
          <p className="hero-intro">
            An aspiring software developer with an educational background in
            Software Engineering and Networking. Interested in programming, web
            development, and continuously improving my technical abilities
            through practical projects and independent learning.
          </p>

          <div className="btn-group hero-actions">
            <a
              href="/projects"
              className="btn btn-primary"
              onClick={(e) => handleNav(e, 'projects', null)}
            >
              View Projects
            </a>
            <a
              href="/journey"
              className="btn btn-secondary"
              onClick={(e) => handleNav(e, 'journey', null)}
            >
              My Journey
            </a>
            <a
              href="/#contact"
              className="btn btn-ghost"
              onClick={(e) => handleNav(e, 'home', 'contact')}
            >
              Contact Me
            </a>
            <a
              href={CV_FILE_PATH}
              download="Tharanithan_Santhirathas_CV.pdf"
              className="btn btn-ghost"
            >
              Download CV
            </a>
          </div>

          <div>
            <span className="hero-location">
              <span aria-hidden="true">📍</span>
              <span>Sri Lanka</span>
            </span>
          </div>
        </div>

        <div className="hero-photo-wrapper">
          <div className="hero-photo-ring">
            <div className="hero-photo-inner">
              {!imgError ? (
                <img
                  id="profile-photo"
                  src={profilePhoto}
                  alt="Portrait of Tharanithan Santhirathas"
                  className="hero-photo-img"
                  width="272"
                  height="272"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div id="photo-fallback" className="hero-photo-fallback">
                  <span
                    className="text-accent"
                    style={{ fontSize: '2.75rem', fontWeight: 700 }}
                  >
                    TS
                  </span>
                  <span
                    className="mono text-gray"
                    style={{ fontSize: '0.7rem', marginTop: '0.35rem' }}
                  >
                    Tharanithan Santhirathas
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
