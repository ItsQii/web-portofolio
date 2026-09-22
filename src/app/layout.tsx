import type { Metadata, Viewport } from "next";
import { Archivo, Chakra_Petch } from "next/font/google";
import "./globals.css";

/* Archivo: variable (100-900), bold-condensed grotesque. Carries display +
   body. No `weight` needed for variable fonts. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

/* Chakra Petch: angular, cut-corner game-UI feel. Static family, so `weight`
   is required. Used for labels, stats and numerals. */
const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rifqi | Front-end Developer",
  description:
    "Portfolio of Ahmad Rifqi Hendriansyah — front-end developer building responsive interfaces with React, Next.js and Tailwind CSS.",
};

/* themeColor and colorScheme must live on the viewport export: both have been
   deprecated on `metadata` since Next 14. */
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#04081a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* Next 16 no longer neutralises scroll-behavior during navigation, so the
         global `smooth` in globals.css is opted into explicitly. */
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${chakraPetch.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
