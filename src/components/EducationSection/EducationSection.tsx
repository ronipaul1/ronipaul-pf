import { SectionHeading } from "../shared/SectionHeading";
import { Reveal } from "../shared/Reveal";
import { education } from "../../data/profile";
import { GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="w-full max-w-7xl mx-auto container-px py-24">
      <SectionHeading kicker="Education" title="Academic background" />

      <Reveal delay={0.1} className="mt-10 max-w-3xl">
        <div className="surface rounded-3xl p-6 md:p-8 flex gap-5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-2" aria-hidden="true" />
          <div className="w-12 h-12 rounded-xl bg-accent-soft border border-accent flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="section-heading text-xl text-fg">{education.degree}</h3>
              <span className="mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent-2/15 text-accent-2 border border-accent-2/30">
                {education.period}
              </span>
            </div>
            <p className="text-muted text-sm md:text-base mt-2">{education.institution}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
