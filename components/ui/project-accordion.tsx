"use client";

import { useState } from "react";

type ProjectAccordionProps = {
  project: {
    name: string;
    href: string;
    kind: string;
    summary: string;
    description: string;
    icon: string;
    built: readonly string[];
    challenge: readonly string[];
    tags: readonly string[];
    defaultOpen: boolean;
  };
  index: number;
};

export function ProjectAccordion({ project, index: _index }: ProjectAccordionProps) {
  const [open, setOpen] = useState(project.defaultOpen);

  return (
    <article className={`project-card ${open ? "open" : ""}`}>
      <button
        type="button"
        className="project-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="project-icon-cell">
          <img src={project.icon} alt="" aria-hidden="true" />
        </span>
        <span className="project-title-cell">
          <strong>{project.name}</strong>
          <em>{project.kind}</em>
        </span>
        <span className="project-summary-cell">{project.summary}</span>
        <span className="project-chevron-cell" aria-hidden="true" />
      </button>

      <div className="project-body">
        <div className="project-body-inner">
          <p className="project-desc">{project.description}</p>
          <div className="project-detail-cols">
            <div className="project-detail-col">
              <h4 className="detail-label">Built</h4>
              <ul className="detail-list">
                {project.built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="project-foot">
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} on GitHub`}
          className="project-gh"
        >
          GitHub ↗
        </a>
      </footer>
    </article>
  );
}
