import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary for the Persona 3 Reload UI.
 *
 * Values mirror the CSS custom properties in globals.css. Rules that keep the
 * motion feeling like P3R rather than generic web easing:
 *
 *   1. Nothing exceeds 450ms. Menus should read as near-instant.
 *   2. Exit runs at roughly 60% of enter duration, with hard acceleration.
 *   3. Skew is animated alongside translate, never held static.
 *   4. Selection changes snap (80ms), they do not tween.
 *
 * `motion` handles orchestration (enter/exit, stagger, gestures); perpetual
 * ambient loops stay in CSS so they never occupy the JS thread.
 */

/* --- Durations (seconds, framer's unit) ---------------------------------- */

export const DUR = {
  instant: 0.08,
  fast: 0.14,
  base: 0.2,
  slow: 0.32,
  wipe: 0.42,
} as const;

export const STAGGER = 0.04;

/* --- Easing -------------------------------------------------------------- */

export const EASE = {
  snap: [0.2, 0, 0, 1],
  overshoot: [0.34, 1.56, 0.64, 1],
  inHard: [0.7, 0, 0.84, 0],
} as const satisfies Record<string, [number, number, number, number]>;

/* --- Transition presets -------------------------------------------------- */

/** Springy entrance. Overshoots then settles — the core P3 feel. */
export const springEntry: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 22,
  mass: 0.6,
};

/** Fast, hard-accelerating exit. Deliberately shorter than the entrance. */
export const exitHard: Transition = {
  duration: DUR.fast,
  ease: EASE.inHard,
};

/** Selection cursor movement. Short enough to read as a cut. */
export const snap: Transition = {
  duration: DUR.instant,
  ease: EASE.snap,
};

export const SKEW = {
  /** Brief shear applied to menu items at the start of their entrance. */
  enter: -18,
} as const;

/* --- Overlay ------------------------------------------------------------- */

/** Backdrop scrim. Opacity only, so it never fights the wipe. */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.base, ease: EASE.snap } },
  exit: { opacity: 0, transition: exitHard },
};

/**
 * Diagonal wipe sweeping in from the right.
 * clip-path is animated rather than transform so the edge stays crisp and
 * genuinely diagonal regardless of viewport size.
 */
export const wipeVariants: Variants = {
  hidden: { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
  visible: {
    clipPath: "polygon(0% 0, 100% 0, 100% 100%, -12% 100%)",
    transition: { duration: DUR.wipe, ease: EASE.snap },
  },
  exit: {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    transition: { duration: DUR.base, ease: EASE.inHard },
  },
};

/** Parent list. Delays children until the wipe has covered the screen. */
export const menuListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: DUR.base },
  },
  exit: {
    transition: { staggerChildren: STAGGER / 2, staggerDirection: -1 },
  },
};

/**
 * A single menu entry cascading in from the left.
 *
 * The <li> owns the entrance animation only — no persistent skewX at rest,
 * because the three-layer CSS system (.plate / .ghost / .label) handles all
 * visual selection state via CSS transforms and mix-blend-mode. Keeping motion
 * off the resting state means CSS ::before and the plate transition can run on
 * the compositor without fighting an inline style.
 */
export const menuItemVariants: Variants = {
  hidden: { x: -48, opacity: 0, skewX: SKEW.enter },
  visible: {
    x: 0,
    opacity: 1,
    skewX: 0,
    transition: springEntry,
  },
  exit: {
    x: -32,
    opacity: 0,
    skewX: SKEW.enter / 2,
    transition: exitHard,
  },
};

/** Right-hand profile panel. Arrives last to anchor the composition. */
export const panelVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.slow, ease: EASE.snap, delay: DUR.base },
  },
  exit: { opacity: 0, x: 24, transition: exitHard },
};

/* --- Scroll reveal ------------------------------------------------------- */

/** Section content rising into view. Reused across every section. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32, skewX: -6 },
  visible: {
    opacity: 1,
    y: 0,
    skewX: 0,
    transition: { duration: DUR.slow, ease: EASE.snap },
  },
};

/**
 * Reduced-motion replacements. Skew, overshoot and travel are removed rather
 * than shortened; opacity alone survives.
 */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.fast } },
  exit: { opacity: 0, transition: { duration: DUR.fast } },
};
