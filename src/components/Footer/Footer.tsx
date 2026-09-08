import { Github, Linkedin } from "lucide-react";
import { profile } from "../../data/profile";

export function Footer() {
  return (
    <footer className="w-full border-t border-border">
      <div className="max-w-7xl mx-auto container-px py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="section-heading text-fg">{profile.name}</p>
          <p className="text-muted text-sm mt-0.5">{profile.specialty}</p>
          <p className="text-muted text-xs mt-0.5">{profile.location}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <span className="mono text-[10px] uppercase tracking-wider px-3 py-2 rounded-full bg-accent-2/15 text-accent-2 border border-accent-2/30">
            Open to Internships
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto container-px pb-8">
        <p className="text-muted text-xs text-center md:text-left">
          © {new Date().getFullYear()} {profile.name}. Built from scratch, by hand (and a bit of vibe coding).
        </p>
      </div>
    </footer>
  );
}

export default Footer;
