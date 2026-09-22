import type { IconName } from "@/lib/data";

/**
 * Icon set, extracted from the inline definitions that previously sat at the
 * bottom of page.tsx. MoonIcon and SunIcon were dropped along with the theme
 * toggle: the P3R palette is dark-only.
 *
 * All icons inherit `currentColor` and accept a size override so callers
 * control scale without wrapper elements.
 */

type IconProps = {
  size?: number;
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const LinkIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base} width={size} height={size} strokeWidth="2.5" className={className} aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const GithubIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base} width={size} height={size} strokeWidth="2" className={className} aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
  </svg>
);

export const KaggleIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base} width={size} height={size} strokeWidth="2" className={className} aria-hidden="true">
    <path d="M8 21V3" />
    <path d="M20 3 8 12 20 21" />
  </svg>
);

export const DribbbleIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base} width={size} height={size} strokeWidth="2" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
  </svg>
);

export const LinkedInIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base} width={size} height={size} strokeWidth="2" className={className} aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/**
 * WhatsApp. The only filled brand glyph here: the mark is only recognisable at
 * small sizes in its solid form, so a stroke approximation was not worth it.
 */
export const WhatsAppIcon = ({ size = 16, className }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
  </svg>
);

export const InstagramIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base} width={size} height={size} strokeWidth="2" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const MailIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base} width={size} height={size} strokeWidth="2" className={className} aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

/** Pause-menu trigger: three stacked bars, skewed to match the slab language. */
export const MenuIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base} width={size} height={size} strokeWidth="2.5" className={className} aria-hidden="true">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="16" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

export const CloseIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base} width={size} height={size} strokeWidth="2.5" className={className} aria-hidden="true">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

/** Selection cursor rendered beside the active menu slab. */
export const CaretIcon = ({ size = 16, className }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    <path d="M6 3l13 9-13 9z" />
  </svg>
);

/** Filled/hollow star for History Project and skill ranks. */
export const StarIcon = ({
  size = 14,
  className,
  filled = true,
}: IconProps & { filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/** Maps the `icon` field on data records to a component. */
export const ICON_MAP: Record<IconName, (props: IconProps) => React.ReactElement> = {
  github: GithubIcon,
  kaggle: KaggleIcon,
  dribbble: DribbbleIcon,
  linkedin: LinkedInIcon,
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  mail: MailIcon,
  link: LinkIcon,
  menu: MenuIcon,
};
