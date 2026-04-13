"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import styles from "./page.module.scss";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Mencegah error hidrasi (next-themes butuh ini agar sinkron dengan browser)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Logika klik di luar untuk menutup menu
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Jika belum 'mounted', jangan render dulu agar tidak ada kedipan warna
  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.logo}>Rfq.</div>

          <div className={styles.navPill} ref={menuRef}>
            {/* Navigasi: Muncul bergeser ke kiri saat isOpen true */}
            <nav className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
              <a href="#about" onClick={() => setIsOpen(false)}>
                About
              </a>
              <a href="#projects" onClick={() => setIsOpen(false)}>
                Projects
              </a>
            </nav>

            {/* Tombol Hamburger (...) */}
            <button
              className={`${styles.toggleBtn} ${isOpen ? styles.active : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <MoreIcon />
            </button>

            {/* Dropdown Card: Transparan Glassmorphism */}
            <div
              className={`${styles.dropdownCard} ${isOpen ? styles.visible : ""}`}
            >
              <div className={styles.socialList}>
                <div className={styles.iconItem}>
                  <SocialLink
                    icon={GithubIcon}
                    label="Github"
                    href="https://github.com/ItsQii"
                  />
                </div>
                <div className={styles.iconItem}>
                  <SocialLink icon={KaggleIcon} label="Kaggle" href="#" />
                </div>
                <div className={styles.iconItem}>
                  <SocialLink icon={DribbbleIcon} label="Dribbble" href="#" />
                </div>
                <div className={styles.iconItem}>
                  <SocialLink icon={LinkedInIcon} label="LinkedIn" href="#" />
                </div>
              </div>

              {/* Theme Toggle: Mengatur Light/Dark Mode */}
              <div className={styles.themeToggles}>
                <button
                  onClick={() => setTheme("dark")}
                  className={theme === "dark" ? "text-indigo-400" : ""}
                  aria-label="Dark Mode"
                >
                  <MoonIcon />
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={theme === "light" ? "text-orange-400" : ""}
                  aria-label="Light Mode"
                >
                  <SunIcon />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex w-full">
          <div className={styles.contentLeft}>
            <div className={styles.profileImageWrapper}>
              <Image
                src="/rifqi.jpeg"
                alt="Rifqi Portfolio Profile"
                width={120}
                height={120}
                /* className lama yang berisi grayscale/opacity-50 DIHAPUS */
              />
            </div>
            <h1 className={styles.heading}>Hi I&apos;m Rifqi, Web Developer</h1>
            <p className={styles.description}>
              I am an Informatics Engineering student, I specialize in web
              development with Next.js
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- Komponen Pendukung ---

function SocialLink({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialLink}
    >
      <Icon /> {label}
    </a>
  );
}

// --- Koleksi Ikon SVG ---

const MoreIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);
const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);
const KaggleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 21V3" />
    <path d="M20 3 8 12 20 21" />
  </svg>
);
const DribbbleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
  </svg>
);
const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);
const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);
