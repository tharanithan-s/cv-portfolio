import React from 'react';
import profilePhoto from '../assets/profile.jpg';

export default function Footer({ onNavigate }) {
  const handleNav = (e, page, sectionId = null) => {
    e.preventDefault();
    onNavigate(page, sectionId);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="section-container">
        <div className="footer-grid">
          {/* COLUMN ONE: PERSONAL BRAND */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <img
                src={profilePhoto}
                alt="Tharanithan Santhirathas"
                className="brand-avatar"
                width="34"
                height="34"
                loading="lazy"
              />
              <span
                className="text-white"
                style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em' }}
              >
                THARANITHAN SANTHIRATHAS
              </span>
            </div>
            <p
              className="text-accent"
              style={{ fontSize: '0.875rem', fontWeight: 500, marginTop: '0.5rem' }}
            >
              Aspiring Software Developer | IT Enthusiast
            </p>
            <p
              className="text-gray"
              style={{ fontSize: '0.875rem', marginTop: '0.75rem', maxWidth: '24rem' }}
            >
              Continuously learning, building and exploring technology through
              practical projects and independent development.
            </p>
          </div>

          {/* COLUMN TWO: QUICK NAVIGATION */}
          <div>
            <h2 className="footer-col-title">Quick Navigation</h2>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="/"
                  className="footer-nav-link"
                  onClick={(e) => handleNav(e, 'home', null)}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/journey"
                  className="footer-nav-link"
                  onClick={(e) => handleNav(e, 'journey', null)}
                >
                  My Journey
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  className="footer-nav-link"
                  onClick={(e) => handleNav(e, 'projects', null)}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="footer-nav-link"
                  onClick={(e) => handleNav(e, 'home', 'contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN THREE: CONTACT & SOCIALS */}
          <div>
            <h2 className="footer-col-title">Contact &amp; Socials</h2>
            <ul className="footer-contact-list">
              <li>
                <span className="text-white" style={{ fontWeight: 500 }}>
                  Email:{' '}
                </span>
                <a href="mailto:stharanithan@gmail.com">
                  stharanithan@gmail.com
                </a>
              </li>
              <li>
                <span className="text-white" style={{ fontWeight: 500 }}>
                  Phone:{' '}
                </span>
                <a href="tel:+94764038722">076 403 8722</a>
              </li>
              <li>
                <span className="text-white" style={{ fontWeight: 500 }}>
                  WhatsApp:{' '}
                </span>
                <a
                  href="https://wa.me/94764038722"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +94 76 403 8722
                </a>
              </li>
              <li>
                <span className="text-white" style={{ fontWeight: 500 }}>
                  LinkedIn:{' '}
                </span>
                <a
                  href="https://www.linkedin.com/in/tharanithan/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/tharanithan
                </a>
              </li>
              <li>
                <span className="text-white" style={{ fontWeight: 500 }}>
                  GitHub:{' '}
                </span>
                <a
                  href="https://github.com/tharanithan-s"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/tharanithan-s
                </a>
              </li>
            </ul>

            <div className="footer-socials">
              <a
                href="https://github.com/tharanithan-s"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub profile"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0.3C5.37 0.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 22.1 24 17.6 24 12.3 24 5.67 18.63 0.3 12 0.3z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/tharanithan/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn profile"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://wa.me/94764038722"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="WhatsApp contact"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/tharanithan_2k01"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="Instagram profile"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="footer-bottom">
          <div>
            <p>© 2026 Tharanithan Santhirathas. All rights reserved.</p>
            <p className="mono" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
              Designed and developed with curiosity.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="btn btn-ghost btn-sm"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
