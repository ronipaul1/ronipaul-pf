import { SectionHeading } from "../shared/SectionHeading";
import { Reveal } from "../shared/Reveal";
import { profile } from "../../data/profile";
import { GraduationCap, Briefcase, MapPin, Sparkles } from "lucide-react";

const infoBlocks = [
  { icon: GraduationCap, label: "Currently", value: "BCA (Hons.) Student" },
  { icon: Briefcase, label: "Interning at", value: "ApexPlanet" },
  { icon: MapPin, label: "Based in", value: profile.location },
  { icon: Sparkles, label: "Exploring", value: "AI-assisted / Vibe Coding" },
];

export function AboutSection() {
  return (
    <section id="about" className="w-full max-w-7xl mx-auto container-px py-24">
      <SectionHeading kicker="About" title="Who I am" />

      <div className="grid md:grid-cols-5 gap-10 mt-10">
        <Reveal delay={0.1} className="md:col-span-3">
          <div className="space-y-5 text-fg/90 text-base md:text-lg leading-relaxed">
            <p>
              I&apos;m a BCA (Hons.) student at Brainware University, focused on
              frontend development. Most of what I know has come from building
              things, breaking them, fixing them, and constantly experimenting
              with new ways to turn ideas into working applications.
            </p>
            <p>
              I&apos;m currently working as a Frontend Developer Intern at
              ApexPlanet, where I&apos;m getting hands-on experience working
              with a real product codebase and understanding how development
              works beyond personal projects.
            </p>
            <p>
              I&apos;m also exploring AI-assisted development and what people calls
              &quot;vibe coding&quot; — using AI as a development partner to
              experiment, prototype, and solve problems faster while still
              making the technical decisions myself. I&apos;m looking for
              opportunities where I can keep building, learn from experienced
              developers, and contribute to real products.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {infoBlocks.map((block) => (
              <div
                key={block.label}
                className="surface rounded-2xl p-4 flex flex-col gap-2"
              >
                <block.icon className="w-4 h-4 text-accent" />
                <span className="mono text-[10px] uppercase tracking-wider text-muted">
                  {block.label}
                </span>
                <span className="text-sm font-medium text-fg">
                  {block.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
