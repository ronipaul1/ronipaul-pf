import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";
import { projects } from "../../data/profile";

const accents = ["text-accent", "text-accent-2", "text-accent"];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full max-w-7xl mx-auto container-px py-24">
      <SectionHeading
        kicker="Projects"
        title="Things I've built"
        description="A few real projects — built end to end, deployed, and live."
      />

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="group surface rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Faux browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-bg-elevated">
              <span className="w-2.5 h-2.5 rounded-full bg-fg/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-fg/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-fg/15" />
              <span className="mono text-[10px] text-muted ml-3 truncate">
                {project.demoUrl.replace("https://", "")}
              </span>
            </div>

            {/* Content area standing in for a preview */}
            <div className="relative px-6 pt-8 pb-6 flex-1 flex flex-col">
              <span className={`mono text-[10px] uppercase tracking-widest ${accents[i % accents.length]}`}>
                {project.tag}
              </span>
              <h3 className="section-heading text-2xl text-fg mt-2 group-hover:text-accent transition-colors">
                {project.name}
              </h3>
              <p className="text-muted text-sm mt-3 leading-relaxed flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="mono text-[10px] px-2 py-1 rounded-md bg-accent-soft text-fg border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-6">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg hover:text-accent transition-colors"
                >
                  Live Demo <ExternalLink className="w-3.5 h-3.5" />
                </a>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> Code
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
