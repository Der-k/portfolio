/**
 * Banner shown at the top of each section, before its heading.
 *
 * Certificates, Projects and Experience build their banner tiles
 * automatically from data/certificates.ts, data/projects.ts and
 * data/companies.ts (thumbnails, covers, logos). For those three, only
 * `kicker` and `caption` are used.
 *
 * Skills, About and Contact have no natural images. Set `image` to show one
 * wide banner photo, e.g. "/banners/skills.jpg" (put the file in
 * public/banners/). Without `image` they show a plain text banner.
 */
export interface SectionBannerConfig {
  kicker: string;
  caption: string;
  image?: string;
}

export const sectionBanners = {
  certificates: {
    kicker: "Credentials",
    caption: "Certifications and training",
  },
  projects: {
    kicker: "Work",
    caption: "Selected projects",
  },
  experience: {
    kicker: "Organisations",
    caption: "Companies and collaborations",
  },
  skills: {
    kicker: "Toolkit",
    caption: "Languages, frameworks and tools",
    // image: "/banners/skills.jpg",
  },
  about: {
    kicker: "Background",
    caption: "Profile and education",
    // image: "/banners/about.jpg",
  },
  contact: {
    kicker: "Get in touch",
    caption: "Let's work together",
    // image: "/banners/contact.jpg",
  },
} satisfies Record<string, SectionBannerConfig>;
