import React from 'react';
import { skillCategories } from '../data/skillsData';

export { skillCategories };

export default function Skills() {
  return (
    <section id="skills" className="section-container section-block">
      <div className="section-header">
        <span className="eyebrow">03 // Capabilities</span>
        <h2 className="section-heading">Technical Skills</h2>
        <p className="section-subtitle">
          A transparent overview of my current technical foundation across web
          development, programming, development tools, and IT fundamentals.
        </p>
      </div>

      <div className="skills-category-grid">
        {skillCategories.map((group) => (
          <div key={group.category} className="premium-card">
            <h3
              className="text-white"
              style={{ fontSize: '1.08rem', fontWeight: 600 }}
            >
              {group.category}
            </h3>
            <p
              className="text-gray"
              style={{ fontSize: '0.82rem', marginTop: '0.2rem' }}
            >
              {group.subtitle}
            </p>

            <div className="skill-item-list">
              {group.skills.map((skill) => (
                <div key={skill.name} className="skill-row">
                  <div className="skill-name-wrap">
                    <span className="skill-icon" aria-hidden="true">
                      {skill.icon}
                    </span>
                    <span>{skill.name}</span>
                  </div>
                  {skill.level && (
                    <span className="status-level">{skill.level}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
