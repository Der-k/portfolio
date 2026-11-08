export type InvolvementType =
  | "founder"
  | "employment"
  | "internship"
  | "contract"
  | "collaboration"
  | "project";

/** Display labels. Edit here if you want different wording. */
export const involvementLabels: Record<InvolvementType, string> = {
  founder: "Founder",
  employment: "Employment",
  internship: "Internship",
  contract: "Contract",
  collaboration: "Collaboration",
  project: "Project-based",
};

export interface CompanyRelatedWork {
  label: string;
  url?: string;
}

export interface Company {
  id: string;
  /** Unique, URL-safe. Becomes /experience/<slug> */
  slug: string;
  /** Short name shown on cards */
  name: string;
  /** Optional full legal or long-form name */
  fullName?: string;
  /** Optional. Place the file in public/companies/. A monogram is shown when missing. */
  logo?: string;
  industry: string;
  involvementType: InvolvementType;
  role?: string;
  /** e.g. "2024 – Present" */
  period?: string;
  description: string;
  contributions?: string[];
  technologies?: string[];
  website?: string;
  /** Slugs from data/projects.ts */
  relatedProjects?: string[];
  /** Work that is not a portfolio project (plain label, optional link) */
  relatedWork?: CompanyRelatedWork[];
}

/**
 * Add a company:
 *  1. (Optional) put the logo in public/companies/
 *  2. Add an entry below with a unique slug
 * The card on /experience and the page at /experience/<slug> appear automatically.
 *
 * Be accurate about involvementType: use "collaboration" or "project" for
 * project-based work and reserve "employment" for actual employment.
 */
export const companies: Company[] = [
  {
    id: "canvassingtech",
    slug: "canvassingtech",
    name: "CanvassingTech",
    // logo: "/companies/canvassingtech.png",
    industry: "Digital Advertising Technology",
    involvementType: "founder",
    role: "Founder & Software Developer",
    period: "2024 – Present",
    description:
      "An independent startup focused on digital advertising technology.",
    contributions: [
      "Founded an independent startup focused on digital advertising technology.",
      "Built a multi-feature advertising platform spanning web, augmented reality and ad management components.",
      "Designed responsive interfaces for customer onboarding, pricing and advertising management.",
      "Integrated backend services and Firebase; owned technical development and product design.",
    ],
    technologies: [
      "Next.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Bootstrap",
      "Firebase",
    ],
    relatedProjects: ["black-rhino-vr"],
  },
  {
    id: "polytech",
    slug: "polytech",
    name: "Polytech / Polycrest",
    // logo: "/companies/polytech.png",
    industry: "Game Development",
    // TODO: confirm the correct type for this involvement
    // ("employment", "internship", "contract", "project").
    involvementType: "project",
    role: "Junior Developer, Game Development",
    period: "2025",
    description:
      "A web-based game marketplace inspired by established game distribution platforms.",
    contributions: [
      "Built a web-based game marketplace inspired by established game distribution platforms.",
      "Implemented game listings, search and filtering, with Firebase for game data storage.",
      "Developed responsive interfaces aligned with the platform's branding.",
    ],
    technologies: ["JavaScript", "HTML", "CSS", "Firebase"],
    relatedProjects: ["polytech-game-store"],
  },
  {
    id: "aaemi",
    slug: "aaemi",
    name: "AAEMI",
    fullName: "Africa Australia Energy and Minerals Institute",
    // logo: "/companies/aaemi.png",
    industry: "Energy, Minerals and Technology",
    // TODO: confirm the correct type for this involvement
    // ("project", "contract", "employment", ...).
    involvementType: "project",
    description:
      "Software development, digital systems, web development, and technology initiatives for the Africa Australia Energy and Minerals Institute.",
    relatedProjects: ["aaemi-sitelogs"],
    relatedWork: [{ label: "Clean Energy Conference website" }],
  },
  {
    id: "black-rhino-vr",
    slug: "black-rhino-vr",
    name: "Black Rhino VR",
    // logo: "/companies/black-rhino-vr.png",
    industry: "Interactive Technology / Virtual and Augmented Reality",
    involvementType: "collaboration",
    description:
      "Technology integration work involving augmented reality, carried out in collaboration with CanvassingTech.",
    technologies: ["Augmented Reality"],
    relatedProjects: ["black-rhino-vr"],
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getAdjacentCompanies(slug: string): {
  previous?: Company;
  next?: Company;
} {
  const index = companies.findIndex((c) => c.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? companies[index - 1] : undefined,
    next: index < companies.length - 1 ? companies[index + 1] : undefined,
  };
}
