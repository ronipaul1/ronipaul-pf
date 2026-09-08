import { SectionHeading } from "../shared/SectionHeading";
import { Reveal } from "../shared/Reveal";
import { skills } from "../../data/profile";

const groups = [
  { title: "Frontend", items: skills.frontend },
  { title: "Programming", items: skills.programming },
  { title: "Database", items: skills.database },
];

export function SkillsSection() {
  return (
    <section id="skills" className="w-full max-w-7xl mx-auto container-px py-24">
      <SectionHeading
        kicker="Skills"
        title="What I work with"
        description="Tools and languages I use day to day, grouped by category rather than arbitrary percentages."
      />

      <div className="grid sm:grid-cols-3 gap-5 mt-10">
        {groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.1}>
            <div className="surface rounded-2xl p-6 h-full">
              <h3 className="mono text-xs uppercase tracking-widest text-accent mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm font-medium px-3 py-1.5 rounded-lg bg-accent-soft text-fg border border-border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-6">
        <div className="surface rounded-2xl p-6">
          <h3 className="mono text-xs uppercase tracking-widest text-accent-2 mb-4">Focus Areas</h3>
          <div className="flex flex-wrap gap-2">
            {skills.focus.map((item) => (
              <span
                key={item}
                className="text-sm font-medium px-3 py-1.5 rounded-lg border border-border text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
