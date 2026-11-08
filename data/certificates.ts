export const certificateCategories = [
  "Artificial Intelligence & Machine Learning",
  "Software Development",
  "Data Science & Analytics",
  "Cloud & Technology",
  "Other Professional Certifications",
] as const;

export type CertificateCategory = (typeof certificateCategories)[number];

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** ISO date, e.g. "2025-03-14" or "2025-03" */
  dateIssued: string;
  category: CertificateCategory;
  /** Thumbnail shown on the card (PNG/JPG/JPEG/WebP). For image certificates this can be the same file as `file`. */
  image: string;
  /** The ORIGINAL file used for preview and download. */
  file: string;
  fileType: "pdf" | "image";
  /** Optional. The "Verify Credential" button is hidden when this is missing. */
  verificationUrl?: string;
}

/**
 * Add a certificate:
 *  1. Put the original file in public/certificates/
 *  2. (PDFs only) add a PNG/JPG thumbnail in public/certificates/ too
 *  3. Add an entry below
 *
 * Template (copy, uncomment, fill in with your real details):
 *
 * {
 *   id: "my-certificate",
 *   title: "Certificate Title",
 *   issuer: "Issuing Organisation",
 *   dateIssued: "2025-01-01",
 *   category: "Software Development",
 *   image: "/certificates/my-certificate-thumb.png",
 *   file: "/certificates/my-certificate.pdf",
 *   fileType: "pdf",
 *   verificationUrl: "https://example.com/verify/123",
 * },
 */
export const certificates: Certificate[] = [];

/**
 * Certifications as listed on the CV, one entry per certificate so each gets
 * its own banner. They have no original files or dates yet.
 *
 * Banner: put an image in public/certificates/banners/ and uncomment the
 * `banner` line. Without one, the card shows an indigo banner with the
 * issuer's initials.
 *
 * As you upload each original, add it to `certificates` above (with its real
 * date, thumbnail and file) and delete it from this list.
 */
export interface ListedCredential {
  id: string;
  title: string;
  /** Optional. Add it when you know the issuing organisation. */
  issuer?: string;
  /** Optional banner image, e.g. "/certificates/banners/tensorflow-keras.png" */
  banner?: string;
}

export const listedCredentials: ListedCredential[] = [
  {
    id: "python-data-science-ai",
    title: "Python with Data Science AI",
    // TODO: add the issuer once confirmed, e.g. issuer: "...",
    banner: "/certificates/banners/python-data-science.png",
  },
  {
    id: "tensorflow-keras",
    title: "TensorFlow & Keras",
    issuer: "Great Learning",
    banner: "/certificates/banners/tensorflow-keras.png",
  },
  {
    id: "applications-of-ai",
    title: "Applications of AI",
    issuer: "Great Learning",
    // banner: "/certificates/banners/applications-of-ai.png",
  },
  {
    id: "neural-networks-deep-learning",
    title: "Neural Networks & Deep Learning",
    issuer: "Great Learning",
    banner: "/certificates/banners/neural-networks-deep-learning.png",
  },
  {
    id: "ai-with-python",
    title: "AI with Python",
    issuer: "edX",
    banner: "/certificates/banners/ai-with-python.png",
  },
  {
    id: "network-programming",
    title: "Network Programming",
    issuer: "edX",
    banner: "/certificates/banners/network-programming.png",
  },
  {
    id: "intro-to-cs",
    title: "Intro to CS",
    issuer: "edX",
    banner: "/certificates/banners/intro-to-cs.png",
  },
  {
    id: "data-structures",
    title: "Data Structures",
    issuer: "edX",
    // banner: "/certificates/banners/data-structures.png",
  },
  {
    id: "ai-essentials",
    title: "AI Essentials",
    issuer: "Grow with Google",
    // banner: "/certificates/banners/ai-essentials.png",
  },
  {
    id: "full-python-course",
    title: "Full Python Course",
    issuer: "Additional Training",
    // banner: "/certificates/banners/full-python-course.png",
  },
  {
    id: "learn-javascript",
    title: "Learn JavaScript",
    issuer: "Additional Training",
    // banner: "/certificates/banners/learn-javascript.png",
  },
];
