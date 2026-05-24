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
};

export function ProjectAccordion({ project }: ProjectAccordionProps) {
  const [open, setOpen] = useState(project.defaultOpen);

  return (
    <article className={`project-card ${open ? "open" : ""}`}>
      <div className="timeline-icons" aria-hidden="true">
        <span>
          <img src={project.icon} alt="" />
        </span>
        <span>⌘</span>
      </div>
      <button type="button" className="project-head" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span>
          <strong>
            {project.name}{" "}
            <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub`}>
              GH
            </a>
          </strong>
          <em>{project.kind}</em>
          <small>{project.summary}</small>
        </span>
        <b aria-hidden="true">⌄</b>
      </button>
      <p>{project.description}</p>
      <div className="project-details">
        <h4>Built</h4>
        <ul>
          {project.built.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>Challenging (but overcame)</h4>
        <ul>
          {project.challenge.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
