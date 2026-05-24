import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection({ about }: { about: readonly string[] }) {
  return (
    <section className="about full-row" id="about">
      <div className="rail content-section">
        <SectionHeading title="About" kicker="How I work" />
        <ul className="terminal-list">
          {about.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
