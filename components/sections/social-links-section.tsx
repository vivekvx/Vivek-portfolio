import type { PortfolioContent } from "@/content/portfolio";

export function SocialLinksSection({ socialLinks }: { socialLinks: PortfolioContent["socialLinks"] }) {
  return (
    <section className="socials full-row" aria-label="Social links">
      <div className="rail social-grid">
        {socialLinks.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            <span className={`social-mark ${link.tone ?? ""}`}>
              <img src={link.icon} alt="" aria-hidden="true" />
            </span>
            <span className="social-copy">
              <strong>{link.label}</strong>
              <em>{link.handle}</em>
            </span>
            <span className="link-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
