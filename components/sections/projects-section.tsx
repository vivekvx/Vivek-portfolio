import { ProjectAccordion } from "@/components/ui/project-accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PortfolioContent } from "@/content/portfolio";

export function ProjectsSection({ projects }: { projects: PortfolioContent["projects"] }) {
  return (
    <section className="work full-row" id="projects">
      <div className="rail content-section">
        <SectionHeading title="Projects" kicker="Things I have shipped" />
        <div className="project-timeline">
          {projects.map((project, idx) => (
            <ProjectAccordion key={project.name} project={project} index={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
