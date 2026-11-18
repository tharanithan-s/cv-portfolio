import React from 'react';
import ProjectCard from '../components/ProjectCard';

export const featuredProject = {
  id: 'jd-eco',
  name: 'JD Eco-Farm Management Platform',
  website: 'https://jd-eco.com/',
  developer: 'Tharanithan Santhirathas',
  status: 'COMPLETED',
  category: 'Deployed Web Platform',
  technologies: ['HTML5', 'CSS3', 'JavaScript'],
  mainScreenshot: '/images/jd-eco-preview-main.svg',
  additionalScreenshots: [
    {
      src: '/images/jd-eco-preview-workflows.svg',
      caption: 'Eco-Farm Workflows & Information Architecture Preview',
    },
    {
      src: '/images/jd-eco-preview-operations.svg',
      caption: 'Responsive Desktop & Mobile Layout Preview',
    },
  ],
  overview:
    'JD Eco-Farm Management Platform (jd-eco.com) is a completed and deployed web platform built to present sustainable agricultural workflows, operational details, and eco-farm management information in a clear, accessible online interface.',
  purpose:
    'Designed to provide a welcoming, structured digital presence for eco-farm operations—organizing sustainable farming workflows and day-to-day operational details so visitors and stakeholders can explore them easily.',
  features: [
    'Sustainable agricultural workflow presentation',
    'Structured operational details and farm overview sections',
    'Responsive layout accessible across desktop, tablet, and mobile devices',
    'Clean navigation and welcoming user interface',
  ],
  contribution:
    'Developed and deployed by Tharanithan Santhirathas—structuring the web layout, styling the responsive interface, organizing operational content sections, and publishing the live platform at jd-eco.com.',
  challengesAndLearning:
    'Building and deploying a live web platform provided practical experience in organizing real-world operational information clearly, maintaining responsive layouts across different screen sizes, and taking a software project from concept to live deployment.',
};

export default function Projects({ onNavigate }) {
  const handleNav = (e, page, sectionId = null) => {
    e.preventDefault();
    onNavigate(page, sectionId);
  };

  const scrollToFeaturedDetails = () => {
    const el = document.getElementById('featured-project-details');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="page-projects" className="view-animate">
      {/* SECTION 1: INTRODUCTION */}
      <section className="section-container hero-section">
        <span className="eyebrow">Technical Portfolio</span>
        <h1 className="hero-name">My Projects</h1>
        <p className="hero-intro" style={{ maxWidth: '46rem' }}>
          Here are some of the projects I have worked on, developed and
          completed through practical experience, learning and independent
          development.
        </p>
      </section>

      {/* SECTION 2: FEATURED PROJECT — JD ECO-FARM MANAGEMENT PLATFORM */}
      <section className="section-container section-block">
        <div className="section-header">
          <span className="eyebrow">01 // Primary Featured Project</span>
          <h2 className="section-heading">Featured Project</h2>
        </div>

        <div className="featured-project-shell">
          <div className="featured-hero-grid">
            <div className="project-preview-frame">
              <img
                src={featuredProject.mainScreenshot}
                alt="JD Eco-Farm Management Platform interface preview"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.75rem',
                }}
              >
                <span className="status-badge status-completed">
                  ● {featuredProject.status}
                </span>
                <span className="mono text-accent" style={{ fontSize: '0.78rem' }}>
                  Developer: {featuredProject.developer}
                </span>
              </div>

              <h3
                className="text-white"
                style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 1.95rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                {featuredProject.name}
              </h3>

              <p
                className="text-slate"
                style={{ marginTop: '0.9rem', fontSize: '0.95rem', lineHeight: 1.7 }}
              >
                {featuredProject.overview}
              </p>

              <div style={{ marginTop: '1.15rem' }}>
                <p
                  className="mono text-gray"
                  style={{ fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.45rem' }}
                >
                  Technologies Used
                </p>
                <div className="chip-list">
                  {featuredProject.technologies.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="btn-group" style={{ marginTop: '1.5rem' }}>
                <a
                  href={featuredProject.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>Visit Live Website (jd-eco.com)</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <button
                  type="button"
                  onClick={scrollToFeaturedDetails}
                  className="btn btn-ghost"
                >
                  Read Case Study ↓
                </button>
              </div>
            </div>
          </div>

          {/* DETAILED PROJECT INFORMATION SUBSECTIONS */}
          <div id="featured-project-details" className="project-details-grid">
            <div className="surface-secondary">
              <span className="eyebrow">Project Overview</span>
              <p className="text-slate" style={{ fontSize: '0.92rem' }}>
                {featuredProject.overview}
              </p>
            </div>

            <div className="surface-secondary">
              <span className="eyebrow">Project Purpose</span>
              <p className="text-slate" style={{ fontSize: '0.92rem' }}>
                {featuredProject.purpose}
              </p>
            </div>

            <div className="surface-secondary">
              <span className="eyebrow">Main Features</span>
              <ul className="bullet-list" style={{ marginTop: '0.35rem' }}>
                {featuredProject.features.map((feat) => (
                  <li key={feat}>
                    <span className="bullet-dot" aria-hidden="true">
                      •
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-secondary">
              <span className="eyebrow">My Contribution</span>
              <p className="text-slate" style={{ fontSize: '0.92rem' }}>
                {featuredProject.contribution}
              </p>
              <p
                className="text-gray"
                style={{ fontSize: '0.8rem', marginTop: '0.6rem' }}
              >
                Developer: {featuredProject.developer} · Status:{' '}
                {featuredProject.status}
              </p>
            </div>

            <div className="surface-secondary">
              <span className="eyebrow">Technologies Used</span>
              <div className="chip-list" style={{ marginTop: '0.35rem' }}>
                {featuredProject.technologies.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
              <p
                className="text-gray"
                style={{ fontSize: '0.82rem', marginTop: '0.75rem' }}
              >
                Core web technologies used to build and deploy the platform.
                (Additional stack tags can be updated here if backend/hosting
                details are added.)
              </p>
            </div>

            <div className="surface-secondary">
              <span className="eyebrow">Challenges and Learning</span>
              <p className="text-slate" style={{ fontSize: '0.92rem' }}>
                {featuredProject.challengesAndLearning}
              </p>
            </div>
          </div>

          {/* PROJECT SCREENSHOTS SUBSECTION */}
          <div style={{ marginTop: '2rem' }}>
            <span className="eyebrow">Project Screenshots &amp; Visual Previews</span>
            <div className="screenshots-grid">
              {featuredProject.additionalScreenshots.map((shot) => (
                <figure key={shot.caption} className="surface-secondary" style={{ padding: '1rem' }}>
                  <div className="project-preview-frame">
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      loading="lazy"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                  <figcaption
                    className="text-gray"
                    style={{ fontSize: '0.82rem', marginTop: '0.65rem' }}
                  >
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* LIVE DEMONSTRATION SUBSECTION */}
          <div
            className="surface-secondary"
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.25rem' }}>
                Live Demonstration
              </span>
              <h4 className="text-white" style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                Explore JD Eco-Farm Management Platform Live
              </h4>
              <p className="text-gray" style={{ fontSize: '0.85rem', marginTop: '0.15rem' }}>
                Deployed and publicly accessible at https://jd-eco.com/
              </p>
            </div>
            <a
              href={featuredProject.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open https://jd-eco.com/ ↗
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: OTHER PROJECTS GALLERY */}
      <section className="section-container section-block">
        <div className="section-header">
          <span className="eyebrow">02 // Project Gallery</span>
          <h2 className="section-heading">Project Overview &amp; Upcoming Work</h2>
          <p className="section-subtitle">
            Verified completed projects and upcoming software applications in
            development.
          </p>
        </div>

        <div className="projects-gallery-grid">
          <ProjectCard
            project={{
              id: featuredProject.id,
              name: featuredProject.name,
              category: featuredProject.category,
              status: featuredProject.status,
              description: featuredProject.overview,
              technologies: featuredProject.technologies,
              screenshot: featuredProject.mainScreenshot,
              liveUrl: featuredProject.website,
            }}
            onSelect={scrollToFeaturedDetails}
          />

          <article className="coming-soon-card">
            <span
              className="brand-monogram"
              style={{ marginBottom: '1rem' }}
              aria-hidden="true"
            >
              +
            </span>
            <h3 className="text-white" style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              More projects coming soon
            </h3>
            <p
              className="text-gray"
              style={{ fontSize: '0.9rem', marginTop: '0.5rem', maxWidth: '22rem' }}
            >
              I am continuously learning and building new practical applications
              in web development, Java, and Python. Verified projects will be
              added here as they are completed.
            </p>
          </article>
        </div>
      </section>

      {/* SECTION 4: GITHUB */}
      <section className="section-container section-block">
        <div
          className="premium-card"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
          }}
        >
          <div>
            <span className="eyebrow">03 // Code &amp; Repositories</span>
            <h2 className="text-white" style={{ fontSize: '1.35rem', fontWeight: 700 }}>
              Follow My Work on GitHub
            </h2>
            <p className="text-gray" style={{ fontSize: '0.9rem', marginTop: '0.35rem', maxWidth: '38rem' }}>
              Visit my GitHub profile to view my public code repositories,
              ongoing practice projects, and future open-source work.
            </p>
          </div>

          <div className="btn-group">
            <a
              href="https://github.com/tharanithan-s"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0.3C5.37 0.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 22.1 24 17.6 24 12.3 24 5.67 18.63 0.3 12 0.3z" />
              </svg>
              <span>github.com/tharanithan-s ↗</span>
            </a>
            <a
              href="/#contact"
              className="btn btn-ghost"
              onClick={(e) => handleNav(e, 'home', 'contact')}
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
