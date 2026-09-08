// Single source of truth for all portfolio content.
// Every value here is real information provided by Roni Paul or verified
// from his public GitHub/live-demo pages — nothing here is invented.

export const profile = {
  name: "Roni Paul",
  initials: "RP",
  avatar: "/assets/avatar.jpg",
  role: "Frontend Developer",
  specialty: "Frontend Developer & Vibe Coder",
  location: "Kolkata, West Bengal",
  status: "Open to Internships",
  email: "ronipaul326@gmail.com",
  github: "https://github.com/ronipaul1",
  linkedin: "https://linkedin.com/in/roni-paul-dev",
  currentRole: "Frontend Developer Intern",
  currentCompany: "ApexPlanet",
};

export const education = {
  degree: "BCA (Hons.)",
  institution: "Brainware University",
  period: "2025 – 2029",
};

export const experience = {
  title: "Frontend Developer Intern",
  company: "ApexPlanet",
  period: "Present",
  description:
    "Currently interning as a frontend developer, contributing to real-world frontend tasks and working with a live product codebase alongside the ApexPlanet team.",
};

export const skills = {
  frontend: ["HTML5", "CSS", "JavaScript"],
  programming: ["C", "Python"],
  database: ["MySQL"],
  focus: [
    "Frontend Development",
    "Modern Web Development",
    "AI-assisted Development",
    "Vibe Coding",
  ],
};

export type Project = {
  id: string;
  name: string;
  tag: string;
  description: string;
  tech: string[];
  demoUrl: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    id: "fintrack",
    name: "FinTrack",
    tag: "Personal Finance",
    description:
      "A full-stack personal finance manager for tracking income and expenses. It includes a dashboard with spend analytics, transaction management, PDF/CSV statements, bill reminders, and a khatabook-style ledger for tracking money given or received — all behind JWT-secured authentication.",
    tech: ["React", "Node.js", "Express", "MySQL", "Chart.js", "JWT"],
    demoUrl: "https://fintrack-manager.vercel.app/",
    repoUrl: "https://github.com/ronipaul1/FinTrack",
  },
  {
    id: "weather-app",
    name: "Weather App",
    tag: "Utility",
    description:
      "A responsive weather lookup app that fetches live conditions from the OpenWeather API. Search any city to see the current temperature, sky condition, humidity, and wind speed at a glance.",
    tech: ["HTML5", "CSS", "JavaScript", "OpenWeather API"],
    demoUrl: "https://ronipaul1.github.io/Weather-App/",
    repoUrl: "https://github.com/ronipaul1/Weather-App",
  },
  {
    id: "voltcart",
    name: "VoltCart",
    tag: "E-Commerce",
    description:
      "A full-stack electronics e-commerce platform with a customer storefront and an admin dashboard. Shoppers can browse and filter products, manage a cart and wishlist, apply coupons, and track orders, while admins manage inventory, orders, and customers.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "MySQL"],
    demoUrl: "https://voltcart-shop.vercel.app/",
    repoUrl: "https://github.com/ronipaul1/VoltCart",
  },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const seo = {
  title: "Roni Paul — Frontend Developer & Vibe Coder",
  description:
    "Portfolio of Roni Paul, a frontend developer, BCA student, and vibe coder based in Kolkata, West Bengal.",
};
