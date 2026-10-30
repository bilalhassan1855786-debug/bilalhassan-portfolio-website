import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import ScrollFX from "@/components/ScrollFX";

export const metadata: Metadata = {
  title: "Bilal Hassan – Full-Stack Engineer",
  description: "Full-stack engineer building production web apps and AI products with Next.js, TypeScript, Node.js and MongoDB.",
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

const init = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Manrope:wght@400;500;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: init }} />
      </head>
      <body>
        <div id="pr" />
        <div id="cg" />
        <Nav />
        {children}
        <footer>© {new Date().getFullYear()} Bilal Hassan. Built with care in Pakistan.</footer>
        <ScrollFX />
      </body>
    </html>
  );
}
