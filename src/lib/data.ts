/**
 * Single source of truth for portfolio content.
 *
 * Previously every string lived inline in page.tsx (~499 lines of mixed markup
 * and copy). Extracting it here keeps the Persona-styled components purely
 * presentational and makes adding a project a one-line change.
 */

export type IconName =
  | "github"
  | "kaggle"
  | "dribbble"
  | "linkedin"
  | "whatsapp"
  | "instagram"
  | "mail"
  | "link"
  | "menu";

/* --- Navigation ---------------------------------------------------------- */

export type NavItem = {
  /** Menu label, rendered uppercase. */
  label: string;
  /** Short gloss shown in the pause-menu detail panel on hover/selection. */
  hint: string;
  href: string;
  /**
   * Horizontal nudge in rem for the stacked menu type.
   *
   * P3R's pause menu does not left-align its entries — each line sits at a
   * slightly different inset, which is what makes the overlapping stack read as
   * hand-composed rather than as a list. These are fixed values rather than
   * random so server and client markup agree (a random offset would trip
   * hydration) and so the composition stays identical between renders.
   */
  offset: number;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", hint: "Return to the title screen", href: "#home", offset: 1.0 },
  { label: "Projects", hint: "Browse the compendium", href: "#projects", offset: 2.2 },
  { label: "Skill", hint: "Review stats and proficiency", href: "#skill", offset: 0.6 },
  { label: "History Project", hint: "Past collaborations and roles", href: "#history", offset: 2.5 },
  { label: "Contact", hint: "Reach out directly", href: "#contact", offset: 0.8 },
] as const;

/* --- Social ------------------------------------------------------------- */

export type Social = {
  label: string;
  href: string;
  icon: IconName;
  /** Rendered as a monospace handle beneath the label. */
  handle: string;
};

export const SOCIALS: readonly Social[] = [
  {
    label: "Github",
    href: "https://github.com/ItsQii",
    icon: "github",
    handle: "@ItsQii",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmad-rifqi-hendriansyah-a29853287",
    icon: "linkedin",
    handle: "ahmad-rifqi-hendriansyah",
  },
  {
    label: "Kaggle",
    href: "https://www.kaggle.com/ahmadrifqih",
    icon: "kaggle",
    handle: "@ahmadrifqih",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/ahmad-rifqi-hendriansyah",
    icon: "dribbble",
    handle: "@ahmad-rifqi-hendriansyah",
  },
] as const;

/* --- Profile ------------------------------------------------------------ */

export const PROFILE = {
  name: "Ahmad Rifqi Hendriansyah",
  shortName: "Rifqi",
  role: "Front-end Developer",
  school: "Politeknik Negeri Malang",
  program: "D-IV Teknik Informatika",
  avatar: "/rifqi.jpeg",
  tagline:
    "Saya mahasiswa Teknik Informatika yang mendalami pengembangan web menggunakan Next.js. Fokus saya adalah menciptakan antarmuka responsif dengan visual yang kuat.",
  bio: "Saya seorang pengembang web yang berfokus pada sisi front-end, saat ini menempuh pendidikan D-IV Teknik Informatika di Politeknik Negeri Malang. Spesialisasi saya membangun antarmuka pengguna yang responsif menggunakan React, Next.js, dan Tailwind CSS.",
} as const;

/* --- Contact ------------------------------------------------------------- */

/**
 * Rendered in the footer, which the pause menu's `Contact` entry scrolls to.
 *
 * TODO: replace all three placeholders below with real values. They are
 * deliberately grouped here so it is a single edit rather than a hunt through
 * the markup.
 */
export type Contact = {
  label: string;
  /** Shown beneath the label; the human-readable form of `href`. */
  value: string;
  href: string;
  icon: IconName;
};

export const CONTACT: readonly Contact[] = [
  {
    label: "Email",
    value: "rifqi@example.com", // TODO: real address
    href: "mailto:rifqi@example.com", // TODO: real address
    icon: "mail",
  },
  {
    label: "WhatsApp",
    value: "+62 812-3456-7890", // TODO: real number
    href: "https://wa.me/6281234567890", // TODO: real number
    icon: "whatsapp",
  },
  {
    label: "Instagram",
    value: "@username", // TODO: real handle
    href: "https://instagram.com/username", // TODO: real handle
    icon: "instagram",
  },
] as const;

/* --- Projects ----------------------------------------------------------- */

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  /** Tailwind object-position utility; screenshots frame differently. */
  imagePosition: string;
  stack: readonly string[];
  live?: string;
  repo?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    id: "upa-bahasa",
    title: "Website UPA Bahasa Polinema",
    description:
      "Situs unit pendukung akademik UPA Bahasa Polinema, yang menopang kompetensi bahasa di lingkungan kampus. Dibangun hybrid: halaman Laravel dengan bagian Next.js di dalamnya.",
    image: "/upabahasa.png",
    imagePosition: "object-top",
    stack: ["Laravel", "Next.js", "Hybrid"],
    live: "https://upabahasa.polinema.ac.id/",
    repo: "https://github.com/FandyHanz/Magang_UPA_Bahasa.git",
  },
  {
    id: "smart-eco-campus",
    title: "Smart Eco Campus",
    description:
      "Sistem IoT yang mengintegrasikan ESP32-CAM dengan dashboard Next.js dan Firebase untuk monitoring energi real-time.",
    image: "/smart-eco-campus.png",
    imagePosition: "object-top",
    stack: ["Next.js", "Firebase", "ESP32-CAM"],
    live: "https://smarteco-app.my.id",
    repo: "https://github.com/ItsQii/smart-eco-campus.git",
  },
  {
    id: "nextjs-journey",
    title: "Next.js Full-Stack Journey",
    description:
      "Eksplorasi mendalam Next.js Pages Router, server-side rendering, dan proteksi rute via middleware.",
    image: "/PemrogramanFramework.png",
    imagePosition: "object-top",
    stack: ["Next.js", "SSR", "Middleware"],
    live: "https://pemrograman-framework-chi.vercel.app",
    repo: "https://github.com/ItsQii/PemrogramanFramework.git",
  },
  {
    id: "developer-portfolio",
    title: "Developer Portfolio",
    description:
      "Situs portofolio pribadi yang responsif dengan fokus pada performa dan detail antarmuka.",
    image: "/Portfolio.png",
    imagePosition: "object-left",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    live: "https://rifqi-portfolio-seven.vercel.app",
    repo: "https://github.com/ItsQii/web-portofolio.git",
  },
] as const;

/* --- Skills (rendered as Skill-screen stat bars) ------------------------- */

export type Skill = {
  label: string;
  /** 1-5, mirroring Persona's social stat ranks. */
  rank: number;
  note: string;
};

export const SKILLS: readonly Skill[] = [
  { label: "Next.js", rank: 5, note: "App Router, SSR, middleware" },
  { label: "React", rank: 5, note: "Hooks, component architecture" },
  { label: "Tailwind CSS", rank: 5, note: "Design systems, v4 tokens" },
  { label: "TypeScript", rank: 4, note: "Typed components and data models" },
  { label: "Laravel / PHP", rank: 3, note: "MVC, MySQL integration" },
  { label: "Flutter", rank: 3, note: "Cross-platform mobile UI" },
] as const;

/* --- Experience (rendered as History Project ranks) ---------------------- */

export type Experience = {
  id: string;
  title: string;
  description: string;
  role: string;
  stack: readonly string[];
  /** 1-5 star rank, framed as a Persona confidant level. */
  rank: number;
};

export const EXPERIENCES: readonly Experience[] = [
  {
    id: "sim-tatib",
    title: "SIM-Tatib JTI Polinema",
    description:
      "Platform otomasi pendataan dan pelaporan kedisiplinan mahasiswa di JTI Polinema.",
    role: "Web Developer — Front-End & Integrasi",
    stack: ["JavaScript", "Express.js", "MySQL"],
    rank: 5,
  },
  {
    id: "smart-eco",
    title: "Smart Eco Campus",
    description:
      "Sistem monitoring penggunaan energi listrik di ruang kelas secara real-time.",
    role: "Full-Stack Developer — IoT Integration",
    stack: ["ESP32-CAM", "Firebase", "React"],
    rank: 5,
  },
  {
    id: "manajemen-warga",
    title: "Manajemen Warga Perumahan",
    description:
      "Aplikasi mobile untuk pengelolaan iuran, kependudukan, dan laporan keuangan warga.",
    role: "Mobile Developer",
    stack: ["Flutter", "Dart"],
    rank: 4,
  },
  {
    id: "simagang",
    title: "SIMAGANG",
    description:
      "Sistem administrasi dan pemantauan kegiatan magang mahasiswa berbasis web.",
    role: "Web Developer",
    stack: ["Laravel", "PHP", "MySQL"],
    rank: 4,
  },
] as const;
