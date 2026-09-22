'use client';

import { useEffect, useRef, useState } from 'react';

export function PauseMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  // Load script Svelte Web Component saat komponen pertama kali dipasang
  useEffect(() => {
    if (!document.getElementById('p3r-menu-script')) {
      const script = document.createElement('script');
      script.id = 'p3r-menu-script';
      script.src = '/p3r-menu.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Menangkap interaksi klik menu Svelte untuk pindah section portfolio
  useEffect(() => {
    if (!isOpen) return;
    const menuElement = menuRef.current;
    if (!menuElement) return;

    let attempts = 0;
    let animationFrame = 0;

    const injectStylesIntoShadowRoot = async () => {
      const shadowRoot = menuElement.shadowRoot;
      if (!shadowRoot || shadowRoot.querySelector("style[data-p3r-styles]")) {
        if (!shadowRoot && attempts < 30) {
          attempts += 1;
          animationFrame = requestAnimationFrame(injectStylesIntoShadowRoot);
        }
        return;
      }

      const style = document.createElement("style");
      style.dataset.p3rStyles = "true";
      const cssChunks: string[] = [];

      for (const stylesheet of Array.from(document.querySelectorAll("style"))) {
        if (stylesheet.textContent) {
          cssChunks.push(stylesheet.textContent);
        }
      }

      for (const stylesheet of Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
      )) {
        try {
          const response = await fetch(stylesheet.href);
          if (response.ok) cssChunks.push(await response.text());
        } catch {
          // Ignore stylesheets that are unavailable while the page is loading.
        }
      }

      if (cssChunks.length === 0) {
        if (attempts < 30) {
          attempts += 1;
          animationFrame = requestAnimationFrame(() => {
            void injectStylesIntoShadowRoot();
          });
        }
        return;
      }

      style.textContent = cssChunks
        .join("\n")
        .replaceAll("p3r-pause-menu ", ":host ");
      shadowRoot.appendChild(style);
    };

    customElements.whenDefined("p3r-pause-menu").then(() => {
      void injectStylesIntoShadowRoot();
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('[data-section]') as HTMLElement | null;
      const rawLabel =
        (clickable?.dataset.section ?? target.innerText ?? '').trim().toLowerCase();
      const normalized = rawLabel
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const sectionMap: Record<string, string> = {
        home: '#home',
        project: '#projects',
        projects: '#projects',
        skill: '#skill',
        'recent project': '#history-project',
        'history project': '#history-project',
        'history-project': '#history-project',
        'social link': '#social-link',
        'social-link': '#social-link',
        'social links': '#social-link',
        contact: '#social-link',
      };

      const section = sectionMap[normalized];
      if (!section) {
        setIsOpen(false);
        return;
      }

      setIsOpen(false);
      const sectionId = section.replace('#', '');
      const sectionElement = document.getElementById(sectionId);

      if (sectionElement) {
        window.history.pushState(null, '', section);
        setTimeout(() => {
          const top = sectionElement.getBoundingClientRect().top + window.scrollY - 24;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 50);
        return;
      }

      window.location.hash = section;
    };

    menuElement.addEventListener('click', handleClick);
    return () => {
      cancelAnimationFrame(animationFrame);
      menuElement.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  return (
    <>
      {/* Tombol Utama untuk Membuka Menu P3R di Pojok Kanan Atas */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9998,
          background: '#07152f',
          color: '#5fe0ff',
          border: '2px solid #5fe0ff',
          padding: '10px 20px',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          boxShadow: '3px -3px 0px #F00',
        }}
      >
        MENU
      </button>

      {/* OVERLAY FULLSCREEN */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999999,
            backgroundColor: 'transparent',
            overflow: 'hidden',
          }}
        >

          <p3r-pause-menu
            ref={menuRef}
            style={{
              display: 'block',
              width: '100vw',
              height: '100vh',
              position: 'fixed',
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </>
  );
}