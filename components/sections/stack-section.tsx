import { SectionHeading } from "@/components/ui/section-heading";
import type { PortfolioContent } from "@/content/portfolio";

export function StackSection({ stackGroups }: { stackGroups: PortfolioContent["stackGroups"] }) {
  return (
    <section className="stack full-row" id="stack">
      <div className="rail content-section">
        <SectionHeading title="Tech Stack" kicker="What I reach for" />
        <div className="ai-stack" aria-label="AI developer technology stack">
          {stackGroups.map((group) => (
            <div key={group.title} className="stack-category">
              <h3>{group.title}</h3>
              <div className="stack-pills">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
