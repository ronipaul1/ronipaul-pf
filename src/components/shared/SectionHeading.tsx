import { Reveal } from "./Reveal";

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "text-left"}>
        <span className="kicker">{kicker}</span>
        <h2 className="section-heading text-3xl md:text-5xl mt-3 mb-4 text-fg">{title}</h2>
        {description && <p className="text-muted text-base md:text-lg leading-relaxed">{description}</p>}
      </div>
    </Reveal>
  );
}
