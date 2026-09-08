import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon, Github, Linkedin } from "lucide-react";
import { navLinks, profile } from "../../data/profile";
import { useTheme } from "../../theme/theme-context";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "surface-glass shadow-sm" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-px max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="flex items-center gap-2 font-display font-bold text-lg"
          aria-label="Roni Paul — back to top"
        >
          <div className="w-9 h-9 rounded-full border border-accent overflow-hidden bg-accent-soft flex items-center justify-center shrink-0 shadow-sm">
            {!avatarError && profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                onError={() => setAvatarError(true)}
                className="w-full h-full object-cover rounded-full select-none"
              />
            ) : (
              <span className="mono text-accent text-sm font-semibold">{profile.initials}</span>
            )}
          </div>
          <span className="hidden sm:inline text-fg">Roni Paul</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-muted hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Roni Paul on GitHub"
            className="hidden sm:flex w-9 h-9 rounded-full border border-border items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Roni Paul on LinkedIn"
            className="hidden sm:flex w-9 h-9 rounded-full border border-border items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 rounded-full border border-border flex items-center justify-center text-fg"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden surface-glass border-t border-border"
          >
            <ul className="container-px py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="block py-2.5 text-base font-medium text-fg hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
