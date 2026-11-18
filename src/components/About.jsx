import React from 'react';

export default function About() {
  return (
    <section id="about" className="section-container section-block">
      <div className="section-header">
        <span className="eyebrow">01 // Who I Am</span>
        <h2 className="section-heading">About Me</h2>
      </div>

      <div className="premium-card">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '52rem',
          }}
        >
          <p className="text-slate" style={{ lineHeight: 1.75 }}>
            I am an aspiring software developer with a growing interest in
            technology and software development. My educational background
            includes a Diploma in Networking and a Higher National Diploma in
            Software Engineering.
          </p>
          <p className="text-slate" style={{ lineHeight: 1.75 }}>
            Through freelance activities and independent projects, I have gained
            practical exposure to software development, video editing, and game
            server hosting.
          </p>
          <p className="text-slate" style={{ lineHeight: 1.75 }}>
            I enjoy learning new technologies, solving problems, and building
            practical applications. I am particularly interested in continuing
            my journey in software engineering and exploring Artificial
            Intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}
