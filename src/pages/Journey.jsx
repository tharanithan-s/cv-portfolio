import React from 'react';

const educationalTimeline = [
  {
    period: '2020',
    qualification: 'G.C.E. Advanced Level',
    institution: "St. John's College, Jaffna.",
    status: 'Completed',
    planned: false,
    description:
      'Completed secondary education and G.C.E. Advanced Level studies in Jaffna, building foundational analytical and academic skills.',
  },
  {
    period: '2021',
    qualification: 'Diploma in Networking',
    institution: 'ESOFT.',
    status: 'Completed',
    planned: false,
    description:
      'Studied core computer networking concepts and foundational IT infrastructure principles.',
  },
  {
    period: 'March 2025 – August 2026',
    qualification: 'HND in Software Engineering',
    institution: 'BCAS Campus, Jaffna.',
    status: 'Completed',
    planned: false,
    description:
      'Completed Higher National Diploma coursework focused on software development, programming fundamentals, web technologies, and structured problem-solving.',
  },
  {
    period: 'Future Education (Planned)',
    qualification: 'Artificial Intelligence',
    institution: 'ESOFT.',
    status: 'Planned Future Education',
    planned: true,
    description:
      'Planned next academic step to explore Artificial Intelligence concepts and expand my software engineering foundation.',
  },
];

const freelanceTracks = [
  {
    title: 'Freelance Video Editor',
    tag: 'Creative Media',
    summary:
      'Undertaken independent freelance video editing work tailored to project requirements.',
    points: [
      'Video editing activities',
      'Working with editing requirements',
      'Creative project handling',
      'Independent freelance work',
    ],
  },
  {
    title: 'Freelance Game Server Hosting',
    tag: 'Discord Communities',
    summary:
      'Obtained game server hosting-related work through Discord communities.',
    points: [
      'Game server hosting activities',
      'Online client communication',
      'Practical technical learning',
      'Working with online communities',
    ],
  },
  {
    title: 'Freelance Software Developer',
    tag: 'Software Development',
    summary:
      'Undertaken independent freelance software development activities through real-world tasks.',
    points: [
      'Working on software-related tasks',
      'Applying programming knowledge',
      'Independent development',
      'Practical problem-solving',
      'Learning through real projects',
    ],
  },
];

const personalDevelopmentItems = [
  'Continuous learning',
  'Improving programming skills',
  'Building practical applications',
  'Learning new technologies',
  'Developing professional communication',
  'Exploring Artificial Intelligence',
];

const futureGoalsItems = [
  'Improve programming knowledge',
  'Gain professional industry experience',
  'Develop more software applications',
  'Improve software engineering abilities',
  'Continue higher education',
  'Explore Artificial Intelligence',
];

export default function Journey({ onNavigate }) {
  const handleNav = (e, page, sectionId = null) => {
    e.preventDefault();
    onNavigate(page, sectionId);
  };

  return (
    <div id="page-journey" className="view-animate">
      {/* SECTION 1: INTRODUCTION */}
      <section className="section-container hero-section">
        <span className="eyebrow">How I Got Here</span>
        <h1 className="hero-name">My Journey</h1>
        <p className="hero-intro" style={{ maxWidth: '46rem' }}>
          Every step in my journey has helped me learn something new. From my
          early interest in technology to studying Software Engineering and
          working on freelance projects, I continue to develop my knowledge and
          practical abilities.
        </p>
      </section>

      {/* SECTION 2: EDUCATIONAL TIMELINE */}
      <section className="section-container section-block">
        <div className="section-header">
          <span className="eyebrow">01 // Academic Path</span>
          <h2 className="section-heading">Educational Timeline</h2>
          <p className="section-subtitle">
            My progression from secondary studies to Networking, Software
            Engineering, and planned future study in Artificial Intelligence.
          </p>
        </div>

        <div className="premium-card">
          <div className="timeline-track">
            {educationalTimeline.map((item) => (
              <div key={item.qualification} className="timeline-item">
                <span
                  className={`timeline-dot${item.planned ? ' planned' : ''}`}
                  aria-hidden="true"
                ></span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <span className="mono text-accent" style={{ fontSize: '0.8rem' }}>
                    {item.period}
                  </span>
                  <span
                    className={`status-badge ${
                      item.planned ? 'status-planned' : 'status-completed'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3
                  className="text-white"
                  style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.35rem' }}
                >
                  {item.qualification}
                </h3>
                <p
                  className="text-accent"
                  style={{ fontSize: '0.875rem', fontWeight: 500 }}
                >
                  {item.institution}
                </p>
                <p
                  className="text-gray"
                  style={{ fontSize: '0.9rem', marginTop: '0.4rem', maxWidth: '46rem' }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FREELANCE EXPERIENCE */}
      <section className="section-container section-block">
        <div className="section-header">
          <span className="eyebrow">02 // Practical Exposure</span>
          <h2 className="section-heading">Freelance Experience</h2>
          <p className="section-subtitle">
            Hands-on independent work across video editing, game server hosting
            communities, and practical software development tasks.
          </p>
        </div>

        <div className="freelance-grid">
          {freelanceTracks.map((track) => (
            <article key={track.title} className="premium-card">
              <span className="chip" style={{ marginBottom: '0.75rem' }}>
                {track.tag}
              </span>
              <h3
                className="text-white"
                style={{ fontSize: '1.12rem', fontWeight: 700 }}
              >
                {track.title}
              </h3>
              <p
                className="text-gray"
                style={{ fontSize: '0.88rem', marginTop: '0.45rem' }}
              >
                {track.summary}
              </p>
              <ul className="bullet-list">
                {track.points.map((pt) => (
                  <li key={pt}>
                    <span className="bullet-dot" aria-hidden="true">
                      •
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 4 & 5: PERSONAL DEVELOPMENT & FUTURE GOALS */}
      <section className="section-container section-block">
        <div className="two-col-grid">
          <div className="premium-card">
            <span className="eyebrow">03 // Growth Mindset</span>
            <h2
              className="text-white"
              style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}
            >
              Personal Development
            </h2>
            <p className="text-gray" style={{ fontSize: '0.9rem' }}>
              Areas I actively focus on every day to strengthen my foundation as
              an aspiring software developer:
            </p>
            <ul className="bullet-list" style={{ marginTop: '1.15rem' }}>
              {personalDevelopmentItems.map((item) => (
                <li key={item}>
                  <span className="bullet-dot" aria-hidden="true">
                    ✦
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="premium-card">
            <span className="eyebrow">04 // Looking Ahead</span>
            <h2
              className="text-white"
              style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}
            >
              Future Goals
            </h2>
            <p className="text-gray" style={{ fontSize: '0.9rem' }}>
              My realistic goals as I transition into the software industry and
              continue my education:
            </p>
            <ul className="bullet-list" style={{ marginTop: '1.15rem' }}>
              {futureGoalsItems.map((goal) => (
                <li key={goal}>
                  <span
                    className="bullet-dot"
                    style={{ color: 'var(--accent-purple-light)' }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="surface-secondary"
          style={{
            marginTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <h3 className="text-white" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              See what I have built so far
            </h3>
            <p className="text-gray" style={{ fontSize: '0.875rem', marginTop: '0.2rem' }}>
              Explore my completed software work on the Projects page.
            </p>
          </div>
          <div className="btn-group">
            <a
              href="/projects"
              className="btn btn-primary"
              onClick={(e) => handleNav(e, 'projects', null)}
            >
              Explore Projects →
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
