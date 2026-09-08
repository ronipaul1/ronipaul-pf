import { SectionHeading } from "../shared/SectionHeading";
import { Reveal } from "../shared/Reveal";
import { experience } from "../../data/profile";
import { Briefcase } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full max-w-7xl mx-auto container-px py-24">
      <SectionHeading kicker="Experience" title="Where I'm working" />

      <Reveal delay={0.1} className="mt-10 max-w-3xl">
        <div className="surface rounded-3xl p-6 md:p-8 flex gap-5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" aria-hidden="true" />
          <div className="w-12 h-12 rounded-xl bg-accent-soft border border-accent flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="section-heading text-xl text-fg">{experience.title}</h3>
              <span className="mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent-2/15 text-accent-2 border border-accent-2/30">
                {experience.period}
              </span>
            </div>
            <p className="text-accent font-medium text-sm mt-1">{experience.company}</p>
            <p className="text-muted text-sm md:text-base mt-3 leading-relaxed">
              {experience.description}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
