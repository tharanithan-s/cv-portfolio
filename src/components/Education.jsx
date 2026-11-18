import React from 'react';

export const homeEducationData = [
  {
    title: 'HND IN SOFTWARE ENGINEERING',
    institution: 'BCAS Campus, Jaffna',
    period: 'March 2025 – August 2026',
    status: 'Completed',
  },
  {
    title: 'DIPLOMA IN NETWORKING',
    institution: 'ESOFT',
    period: '2021',
    status: 'Completed',
  },
  {
    title: 'G.C.E. ADVANCED LEVEL',
    institution: "St. John's College, Jaffna",
    period: '2020',
    status: 'Completed',
  },
];

export default function Education() {
  return (
    <section id="education" className="section-container section-block">
      <div className="section-header">
        <span className="eyebrow">02 // Academic Background</span>
        <h2 className="section-heading">Education</h2>
      </div>

      <div className="education-grid">
        {homeEducationData.map((item) => (
          <article key={item.title} className="premium-card education-card">
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.75rem',
                }}
              >
                <span className="mono text-accent" style={{ fontSize: '0.78rem' }}>
                  {item.period}
                </span>
                <span className="status-badge status-completed">
                  {item.status}
                </span>
              </div>
              <h3
                className="text-white"
                style={{ fontSize: '1.02rem', fontWeight: 700, lineHeight: 1.35 }}
              >
                {item.title}
              </h3>
            </div>
            <p className="text-gray" style={{ fontSize: '0.9rem' }}>
              {item.institution}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
