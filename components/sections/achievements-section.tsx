import { SectionHeading } from "@/components/ui/section-heading";
import type { PortfolioContent } from "@/content/portfolio";

export function AchievementsSection({ achievements }: { achievements: PortfolioContent["achievements"] }) {
  return (
    <section className="achievements full-row" id="achievements">
      <div className="rail content-section">
        <SectionHeading title="Hackathons & Achievements" kicker="Proof of work" />
        <div className="achievement-list">
          {achievements.map((item) => (
            <article key={item.title}>
              <span className={`achievement-logo ${item.iconTone}`}>
                <img src={item.icon} alt="" aria-hidden="true" />
              </span>
              <div className="achievement-copy">
                <h3>{item.title}</h3>
                <div className="achievement-meta">
                  <em className={`badge ${item.badgeTone}`}>{item.badge}</em>
                  <span className="achievement-org">{item.org}</span>
                </div>
              </div>
              <strong className="achievement-year">{item.year}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
