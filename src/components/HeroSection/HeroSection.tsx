import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { IDCard } from "../IDCard/IDCard";

const tags = ["Vibe Coder", "BCA Student", "Builder", "Intern"];

export function HeroSection() {
  return (
    <section id="home" className="relative w-full max-w-7xl mx-auto container-px pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="kicker mb-4"
          >
            Hi, I&apos;m Roni.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-heading text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-fg"
          >
            Frontend
            <br />
            Developer<span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted text-lg mt-6 max-w-md leading-relaxed"
          >
            I build modern web experiences with clean interfaces and solid fundamentals — and I like
            exploring AI-assisted, "vibe coded" workflows to move faster without losing craft.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 mt-6"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium mono px-3 py-1.5 rounded-full border border-border text-muted"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-9"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fg text-bg font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border font-semibold text-sm text-fg hover:border-accent hover:text-accent transition-colors"
            >
              Contact Me <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right: ID Card */}
        <div className="flex justify-center md:justify-end">
          <IDCard />
        </div>
      </div>
    </section>
  );
}
