import Image from "next/image";
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { certificates, listedCredentials } from "@/data/certificates";
import { projects, type Project } from "@/data/projects";
import { companies, involvementLabels } from "@/data/companies";
import { skillGroups } from "@/data/skills";
import { sectionBanners, type SectionBannerConfig } from "@/data/banners";

/**
 * INTERIM HOME PAGE, styled after the CV.
 * Self-contained snippets of every section, built only from the data files.
 * Modules 2-7 replace each block with its real component
 * (Navbar, Hero, CertificateGallery, ProjectGallery, ...).
 */

// Fixed on purpose: Next.js Cache Components forbids new Date() during prerender.
// Update this once a year.
const COPYRIGHT_YEAR = 2026;

const leftBorders = ["border-accent", "border-gold", "border-brand"] as const;
const markers = ["bg-gold", "bg-accent", "bg-brand"] as const;

function SectionHeading({ title, tone = 0 }: { title: string; tone?: number }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span aria-hidden className={`h-3 w-3 shrink-0 ${markers[tone % 3]}`} />
      <h2 className="shrink-0 text-lg font-extrabold uppercase tracking-wide text-brand">
        {title}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}

function Pill({
  children,
  filled = false,
}: {
  children: React.ReactNode;
  filled?: boolean;
}) {
  return (
    <li
      className={
        filled
          ? "rounded-full bg-brand px-3 py-1 text-xs font-medium text-white"
          : "rounded-full border border-accent/60 px-2.5 py-0.5 text-xs text-accent"
      }
    >
      {children}
    </li>
  );
}

type BannerTile = { src?: string; label: string };

function initials(label: string) {
  return label
    .split(/[\s/&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Diagonals({ className = "" }: { className?: string }) {
  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-y-0 right-0 hidden w-[30%] bg-gold sm:block [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)] ${className}`}
      />
      <div
        aria-hidden
        className={`absolute inset-y-0 right-0 hidden w-[27%] bg-accent sm:block [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)] ${className}`}
      />
    </>
  );
}

/**
 * Banner at the top of every section.
 *  - tiles: a row of images (thumbnails, covers, logos); tiles without an
 *    image fall back to a monogram.
 *  - otherwise a single wide image from config.image,
 *  - otherwise a plain text band.
 */
function SectionBanner({
  config,
  tiles,
  size = "logo",
}: {
  config: SectionBannerConfig;
  tiles?: BannerTile[];
  size?: "logo" | "wide";
}) {
  const wide = size === "wide";

  if (tiles && tiles.length > 0) {
    return (
      <div className="relative mb-8 overflow-hidden rounded-card bg-brand px-5 py-5 text-white">
        <Diagonals />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            {config.kicker}
          </p>
          <p className="mb-4 mt-0.5 text-sm text-white/80">{config.caption}</p>
          <ul className="flex gap-3 overflow-x-auto pb-1">
            {tiles.map((tile) => (
              <li
                key={tile.label}
                className={`flex shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg bg-white p-2 shadow-card ${
                  wide ? "h-32 w-48" : "h-24 w-36"
                }`}
              >
                <div className={`relative w-full ${wide ? "h-20" : "h-12"}`}>
                  {tile.src ? (
                    <Image
                      src={tile.src}
                      alt=""
                      fill
                      sizes={wide ? "192px" : "144px"}
                      className="object-contain"
                      unoptimized={tile.src.endsWith(".svg")}
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-full w-full items-center justify-center"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tint text-sm font-extrabold text-brand">
                        {initials(tile.label)}
                      </span>
                    </span>
                  )}
                </div>
                <span className="w-full truncate text-center text-[11px] font-medium text-ink-soft">
                  {tile.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (config.image) {
    return (
      <div className="relative mb-8 h-36 overflow-hidden rounded-card bg-brand sm:h-44">
        <Image
          src={config.image}
          alt=""
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
          unoptimized={config.image.endsWith(".svg")}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-brand/85 via-brand/40 to-transparent"
        />
        <div className="relative flex h-full flex-col justify-end p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            {config.kicker}
          </p>
          <p className="mt-0.5 text-sm text-white/90">{config.caption}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-8 overflow-hidden rounded-card bg-brand px-5 py-6 text-white">
      <Diagonals />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-widest text-gold">
          {config.kicker}
        </p>
        <p className="mt-0.5 text-sm text-white/80">{config.caption}</p>
      </div>
    </div>
  );
}

function CertificateBanner({
  title,
  issuer,
  src,
}: {
  title: string;
  issuer: string;
  src?: string;
}) {
  return (
    <div
      className={`relative aspect-[3/2] w-full overflow-hidden ${
        src ? "border-b border-line bg-white" : "bg-brand"
      }`}
    >
      {src ? (
        // object-contain: the whole certificate is visible, never cropped
        <Image
          src={src}
          alt={`${title} certificate`}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
          unoptimized={src.endsWith(".svg")}
        />
      ) : (
        <>
          <Diagonals />
          <div className="relative flex h-full items-center gap-3 px-4 text-white">
            <span
              aria-hidden
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-base font-extrabold text-brand"
            >
              {initials(issuer)}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              {issuer}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: Project;
  index: number;
  large?: boolean;
}) {
  return (
    <article
      className={`rounded-card border-l-4 bg-tint p-5 ${
        large ? "border-brand" : leftBorders[index % 3]
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        {project.category}
      </p>
      <h3 className="mt-1 text-lg font-bold text-brand">{project.name}</h3>
      {project.tagline && (
        <p className="text-sm italic text-accent">{project.tagline}</p>
      )}
      {project.highlights && project.highlights.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft marker:text-ink">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {project.description}
        </p>
      )}
      {project.technologies.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <Pill key={t} filled={large}>
              {t}
            </Pill>
          ))}
        </ul>
      )}
      {project.note && (
        <p className="mt-3 text-xs italic text-muted">{project.note}</p>
      )}
    </article>
  );
}

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default function HomePage() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => p !== featured).slice(0, 4);

  // Banner tiles are built from the data files
  const projectTiles: BannerTile[] = projects.map((p) => ({
    src: p.cover,
    label: p.name,
  }));
  const companyTiles: BannerTile[] = companies.map((c) => ({
    src: c.logo,
    label: c.name,
  }));

  const contactStrip = [
    profile.phone && {
      label: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
      dot: "bg-gold",
    },
    { label: profile.email, href: `mailto:${profile.email}`, dot: "bg-accent" },
    {
      label: profile.github.replace(/^https?:\/\//, ""),
      href: profile.github,
      dot: "bg-brand",
    },
    {
      label: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: profile.linkedin,
      dot: "bg-gold",
    },
    { label: profile.location, dot: "bg-accent" },
  ].filter(Boolean) as { label: string; href?: string; dot: string }[];

  return (
    <>
      {/* Sticky nav, in the CV's slim indigo header style */}
      <header className="sticky top-0 z-40 border-b-[3px] border-gold bg-brand text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a
            href="#overview"
            className="shrink-0 text-sm font-extrabold uppercase tracking-wide"
          >
            {profile.name}
          </a>
          <nav
            aria-label="Main"
            className="flex gap-4 overflow-x-auto text-sm text-white/75"
          >
            {profile.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href.replace("/#", "#")}
                className="whitespace-nowrap transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero band */}
      <div id="overview">
        <div className="relative overflow-hidden bg-brand text-white">
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 hidden w-[38%] bg-gold sm:block [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 hidden w-[35%] bg-accent sm:block [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
          />
          <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-9 sm:py-11">
            <div>
              <h1 className="text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-2 text-sm font-semibold text-gold sm:text-lg">
                {profile.title}
              </p>
            </div>
            <div
              aria-hidden
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold text-xl font-extrabold text-brand shadow-card sm:mr-6 sm:h-24 sm:w-24 sm:text-3xl"
            >
              {profile.initials}
            </div>
          </div>
        </div>

        {/* Contact strip */}
        <div className="border-b border-line bg-tint">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 text-sm text-ink-soft">
            {contactStrip.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-full ${item.dot}`}
                />
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5">
        {/* Profile */}
        <section className="py-10">
          <SectionHeading title="Profile" tone={0} />
          <p className="max-w-3xl leading-relaxed text-ink-soft">
            {profile.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              href="#projects"
              className="rounded-full bg-brand px-5 py-2.5 font-semibold text-white transition-opacity hover:opacity-85"
            >
              View Projects
            </a>
            <a
              href="#certificates"
              className="rounded-full border border-brand px-5 py-2.5 font-semibold text-brand transition-colors hover:bg-tint"
            >
              Explore Certificates
            </a>
          </div>
        </section>

        {/* Certificates */}
        <section id="certificates" className="py-10">
          <SectionHeading title="Certificates" tone={2} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c) => (
              <article
                key={c.id}
                className="overflow-hidden rounded-card border border-line bg-white shadow-card"
              >
                <CertificateBanner title={c.title} issuer={c.issuer} src={c.image} />
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {c.category}
                  </p>
                  <h3 className="mt-1 font-bold text-brand">{c.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {c.issuer} · {formatDate(c.dateIssued)}
                  </p>
                </div>
              </article>
            ))}
            {listedCredentials.map((c) => (
              <article
                key={c.id}
                className="overflow-hidden rounded-card border border-line bg-white shadow-card"
              >
                <CertificateBanner
                  title={c.title}
                  issuer={c.issuer ?? c.title}
                  src={c.banner}
                />
                <div className="p-4">
                  <h3 className="font-bold text-brand">{c.title}</h3>
                  {c.issuer && (
                    <p className="mt-1 text-sm text-ink-soft">{c.issuer}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-10">
          <SectionBanner
            config={sectionBanners.projects}
            tiles={projectTiles}
            size="wide"
          />
          <SectionHeading title="Projects" tone={1} />
          {featured && (
            <div className="mb-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-accent">
                Featured project
              </p>
              <ProjectCard project={featured} index={0} large />
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            {others.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* Experience timeline */}
        <section id="experience" className="py-10">
          <SectionBanner
            config={sectionBanners.experience}
            tiles={companyTiles}
          />
          <SectionHeading title="Experience" tone={0} />
          <ol className="relative space-y-8 border-l border-line pl-8">
            {companies.map((c) => (
              <li key={c.id} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.6rem] top-1 h-4 w-4 rounded-full border-[3px] border-gold bg-white"
                />
                <h3 className="text-lg font-bold text-brand">
                  {c.role ?? c.name}
                </h3>
                <p className="text-sm italic text-accent">
                  {c.role ? c.name : c.industry}
                  {c.period ? ` | ${c.period}` : ""}
                  {" · "}
                  {involvementLabels[c.involvementType]}
                </p>
                {c.contributions && c.contributions.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft marker:text-ink">
                    {c.contributions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">
                    {c.description}
                  </p>
                )}
                {c.technologies && c.technologies.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {c.technologies.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Skills */}
        <section id="skills" className="py-10">
          <SectionBanner config={sectionBanners.skills} />
          <SectionHeading title="Skills" tone={1} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((g) => (
              <div key={g.category}>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-accent">
                  {g.category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li
                      key={s}
                      className={
                        g.highlight
                          ? "rounded-full bg-brand px-3 py-1 text-xs font-medium text-white"
                          : "rounded-full border border-line px-3 py-1 text-xs text-ink-soft"
                      }
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-10">
          <SectionBanner config={sectionBanners.about} />
          <SectionHeading title="About" tone={2} />
          <div className="max-w-3xl space-y-4 leading-relaxed text-ink-soft">
            {profile.about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mb-3 mt-8 text-xs font-bold uppercase tracking-wide text-accent">
            Education
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.education.map((e, i) => (
              <article
                key={e.institution}
                className={`rounded-card border-l-4 bg-tint p-5 ${leftBorders[i % 3]}`}
              >
                <h4 className="font-bold text-brand">{e.institution}</h4>
                <p className="text-sm text-ink-soft">
                  {e.programme}
                  {e.period ? ` | ${e.period}` : ""}
                </p>
                <p className="text-sm text-muted">{e.note}</p>
              </article>
            ))}
          </div>

          <h3 className="mb-3 mt-8 text-xs font-bold uppercase tracking-wide text-accent">
            Professional interests
          </h3>
          <ul className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <Pill key={interest} filled>
                {interest}
              </Pill>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" className="py-10">
          <SectionBanner config={sectionBanners.contact} />
          <SectionHeading title="Contact" tone={0} />
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-semibold text-white transition-opacity hover:opacity-85"
            >
              <Mail size={16} />
              Contact Me
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              LinkedIn
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">References available upon request.</p>
        </section>
      </main>

      {/* Footer with the CV's tri-colour bar */}
      <footer className="mt-10">
        <p className="py-6 text-center text-sm text-muted">
          © {COPYRIGHT_YEAR} {profile.name}. All rights reserved.
        </p>
        <div aria-hidden className="flex h-2">
          <div className="flex-[6] bg-brand" />
          <div className="flex-[3] bg-accent" />
          <div className="flex-[1.6] bg-gold" />
        </div>
      </footer>
    </>
  );
}
