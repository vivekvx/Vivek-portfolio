import { SectionHeading } from "@/components/ui/section-heading";
import type { PortfolioContent } from "@/content/portfolio";

export function ExperienceSection({ experience }: { experience: PortfolioContent["experience"] }) {
  return (
    <section className="experience full-row" id="experience">
      <div className="rail content-section">
        <SectionHeading title="Work Experience" kicker="Where I build" />
        <div className="experience-list">
          {experience.map((item) => (
            <article key={`${item.company}-${item.title}`} className="experience-item">
              <div className={`company-logo ${item.tone}`}>
                <img src={item.icon} alt="" aria-hidden="true" />
              </div>
              <div className="experience-copy">
                <h3>{item.title}</h3>
                <p className="experience-meta">{item.company}</p>
                <p className="experience-meta">{item.meta.join(" · ")}</p>
                <p>{item.description}</p>
                {item.tags.length ? (
                  <div className="tags compact">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
