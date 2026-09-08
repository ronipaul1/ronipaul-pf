import ReactLenis from "lenis/react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Header } from "./components/Header/Header";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { AboutSection } from "./components/AboutSection/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection/ExperienceSection";
import { EducationSection } from "./components/EducationSection/EducationSection";
import { SkillsSection } from "./components/SkillsSection/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection/ProjectsSection";
import { ContactSection } from "./components/ContactSection/ContactSection";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-bg text-fg min-h-screen relative overflow-x-hidden selection:bg-accent/30">
        <ReactLenis root options={{ smoothWheel: true, duration: 1.1 }}>
          <Header />
          <main className="w-full flex flex-col">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </ReactLenis>
      </div>
    </ThemeProvider>
  );
}

export default App;
