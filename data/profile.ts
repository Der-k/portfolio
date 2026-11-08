export interface NavLink {
  label: string;
  href: string;
}

export interface Education {
  institution: string;
  programme: string;
  /** e.g. "2022 – 2025" */
  period?: string;
  /** Kept exactly as honest as on the CV */
  note: string;
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  siteUrl: string;
  description: string;
  intro: string;
  interests: string[];
  about: string[];
  education: Education[];
  location: string;
  email: string;
  /** Optional. Shown in the contact strip when set; remove or comment out to hide it. */
  phone?: string;
  github: string;
  linkedin: string;
  profileImage: string;
  navLinks: NavLink[];
}

export const profile: Profile = {
  name: "Derrick Gatonye",
  initials: "DG",
  title: "Full-Stack Software Developer | Applied AI Developer",

  // TODO: replace with your deployed URL (used for SEO metadata)
  siteUrl: "https://your-domain.vercel.app",

  description:
    "Portfolio of Derrick Gatonye: full-stack software developer and applied AI developer. Professional certificates, projects, experience and technical skills.",

  // Profile text from the CV
  intro:
    "Full-Stack Software Developer experienced in designing, building and deploying web applications, software products and AI-powered solutions. Skilled across frontend and backend development, API integration, database management, application architecture and applied AI.",

  about: [
    "Has delivered software across real estate, digital advertising, event management, gaming and AI applications, and brings an entrepreneurial background as founder of an independent advertising software startup. Particularly interested in scalable systems, intelligent automation and practical technology solutions for business operations.",
  ],

  interests: [
    "Full-Stack Engineering",
    "AI & Machine Learning",
    "Applied AI & Intelligent Automation",
    "SaaS Product Development",
    "Software Architecture & System Design",
    "Intelligent Search & Recommendation Systems",
    "Business Technology Solutions",
  ],

  education: [
    {
      institution: "KCA University",
      programme: "Software Engineering",
      period: "2022 – 2025",
      note: "Coursework completed; no degree awarded.",
    },
    {
      institution: "Multimedia University of Kenya",
      programme: "Control & Instrumentation Engineering",
      note: "1.5 years; degree not completed.",
    },
  ],

  location: "Kenya",
  email: "derekgk0@gmail.com",
  // Shown publicly if set. Comment it out to keep your number off the site.
  phone: "+254 759 016 794",
  github: "https://github.com/Der-k",
  linkedin: "https://www.linkedin.com/in/derrick-gk",

  // Place your photo at public/profile/profile.jpg
  profileImage: "/profile/profile.jpg",

  // Absolute hrefs so anchor links also work from /experience and /projects/*
  navLinks: [
    { label: "Overview", href: "/#overview" },
    { label: "Certificates", href: "/#certificates" },
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/experience" },
    { label: "Skills", href: "/#skills" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
};
