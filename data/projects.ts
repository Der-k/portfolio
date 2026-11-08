export const projectCategories = [
  "Full-Stack Development",
  "Applied AI & Machine Learning",
  "RAG & Knowledge Systems",
  "Interactive Applications",
  "Other Projects",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export interface ProjectFeature {
  title: string;
  description: string;
  /** Optional supporting image, e.g. "/projects/my-project/feature-1.png" */
  image?: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  /** Unique, URL-safe. Becomes /projects/<slug> */
  slug: string;
  name: string;
  /** Short description used on cards and in SEO metadata */
  description: string;
  category: ProjectCategory;
  technologies: string[];

  /** Everything below is optional. Empty sections are hidden. */
  /** Italic one-liner under the title, as on the CV */
  tagline?: string;
  /** CV-style bullet points */
  highlights?: string[];
  /** Small italic disclaimer shown with the project */
  note?: string;
  /** Shown first, as a larger card */
  featured?: boolean;

  cover?: string;
  overview?: string;
  problemStatement?: string;
  objectives?: string[];
  features?: ProjectFeature[];
  technicalImplementation?: string[];
  contribution?: string[];
  challenges?: ProjectChallenge[];
  gallery?: ProjectGalleryImage[];

  liveUrl?: string;
  githubUrl?: string;
  otherLinks?: ProjectLink[];
}

/**
 * Add a project:
 *  1. Put images in public/projects/<slug>/
 *  2. Add an entry below with a unique slug
 * The detail page at /projects/<slug> is generated automatically.
 *
 * Content below comes from your CV and original brief. Add covers, links and
 * longer write-ups as you have them.
 */
export const projects: Project[] = [
  {
    slug: "medical-diagnoser",
    name: "AI Medical Diagnosis Platform",
    tagline: "Hosted AI-powered web application",
    description:
      "A hosted, symptom-based medical information platform with user authentication, severity scoring and follow-up questions.",
    category: "Applied AI & Machine Learning",
    technologies: ["Python", "Flask", "JavaScript", "SQLite", "OpenAI API"],
    highlights: [
      "Built and hosted a symptom-based medical information platform with user authentication.",
      "Added severity scoring, follow-up questions, severity-based alerts and a doctor–patient contact system.",
      "Integrated external medical resources; stored user data, diagnosis history and communication logs.",
    ],
    note: "An informational application, not a clinically validated diagnostic system.",
    featured: true,
    // cover: "/projects/medical-diagnoser/cover.png",
  },
  {
    slug: "aaemi-sitelogs",
    name: "AAEMI SiteLogs",
    description:
      "A renewable energy operations management platform designed to digitise and streamline organisational workflows, documentation, contractor management, inductions, training, and operational processes.",
    category: "Full-Stack Development",
    technologies: [],
    // cover: "/projects/aaemi-sitelogs/cover.png",
  },
  {
    slug: "maria-luxury",
    name: "Maria Luxury",
    tagline: "Production-level real estate application",
    description:
      "A production-oriented real estate web application with responsive interfaces.",
    category: "Full-Stack Development",
    technologies: [],
    highlights: [
      "Developed a production-oriented real estate web app with responsive interfaces.",
      "Worked on frontend architecture and feature integration for real-world use.",
    ],
  },
  {
    slug: "ai-cosmetics",
    name: "AI Cosmetics Recommendation",
    tagline: "Hosted AI-powered web application",
    description:
      "A hosted, personalised product recommendation app exploring AI-driven matching.",
    category: "Applied AI & Machine Learning",
    technologies: [],
    highlights: [
      "Built and hosted a personalised product recommendation app.",
      "Explored AI-driven matching based on visitor requirements and preferences.",
    ],
  },
  {
    slug: "gold-in-the-garden",
    name: "Gold in the Garden",
    tagline: "Website with AI-powered event search",
    description:
      "A website with AI-assisted event discovery, search and filtering.",
    category: "Applied AI & Machine Learning",
    technologies: [],
    highlights: [
      "Developed a website with AI-assisted event discovery.",
      "Implemented intelligent event search and filtering to improve information retrieval.",
    ],
  },
  {
    slug: "fun-in-fate",
    name: "Fun in Fate",
    tagline: "Website development | Fate Hope, Texas",
    description:
      "A responsive website with user-facing functionality, built with modern frontend practices.",
    category: "Full-Stack Development",
    technologies: [],
    highlights: [
      "Designed and built a responsive website with user-facing functionality.",
      "Applied modern frontend development practices.",
    ],
  },
  {
    slug: "black-rhino-vr",
    name: "AR Advertising Integration",
    tagline: "CanvassingTech, with Black Rhino VR",
    description:
      "Augmented reality integrated into an advertising platform, extending traditional digital ads into interactive AR experiences.",
    category: "Interactive Applications",
    technologies: ["Augmented Reality"],
    highlights: [
      "Integrated augmented reality into the advertising platform.",
      "Extended traditional digital ads into interactive AR experiences.",
    ],
  },
  {
    slug: "ai-chatbot-zapier",
    name: "AI Chatbot: OpenAI & Zapier",
    tagline: "Chatbot development and workflow automation",
    description:
      "A chatbot that automates customer enquiry responses and connects to business workflows through webhooks.",
    category: "Applied AI & Machine Learning",
    technologies: ["OpenAI API", "Zapier", "Webhooks"],
    highlights: [
      "Automated customer enquiry responses using the OpenAI API.",
      "Connected to business workflows via Zapier: notifications, email follow-ups and CRM logging through webhook triggers.",
    ],
  },
  {
    slug: "polytech-game-store",
    name: "Polytech Game Store",
    tagline: "Web application development",
    description:
      "A digital game store with listings and search, using Firebase for data storage.",
    category: "Full-Stack Development",
    technologies: ["JavaScript", "Firebase"],
    highlights: [
      "Built a digital game store with listings and search, using Firebase for data storage.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
