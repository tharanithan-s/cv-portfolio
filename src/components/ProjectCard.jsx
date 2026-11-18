import React from 'react';

export default function ProjectCard({ project, onSelect }) {
  return (
    <article className="premium-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.25rem' }}>
      <div>
        {project.screenshot && (
          <div className="project-preview-frame" style={{ marginBottom: '1.15rem' }}>
            <img
              src={project.screenshot}
              alt={`${project.name} preview`}
              loading="lazy"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '0.6rem',
          }}
        >
          <span className="mono text-accent" style={{ fontSize: '0.75rem' }}>
            {project.category || 'Software Project'}
          </span>
          <span className="status-badge status-completed">{project.status}</span>
        </div>

        <h3 className="text-white" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
          {project.name}
        </h3>

        <p className="text-gray" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="chip-list" style={{ marginTop: '1rem' }}>
            {project.technologies.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="btn-group">
        {onSelect && (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onSelect(project)}
          >
            View Details
          </button>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            Live Demo ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
          >
            GitHub Repo ↗
          </a>
        )}
      </div>
    </article>
  );
}
