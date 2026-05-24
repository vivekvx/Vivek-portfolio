export function SectionHeading({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <div className="section-heading">
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
      <h2>{title}</h2>
    </div>
  );
}
