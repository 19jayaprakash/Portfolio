import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";

export const metadata: Metadata = {
  title: "Aeropeak Technologies | Next-Gen Software Engineering",
  description: "We engineer high-performance web applications, custom API systems, and mobile solutions with a sharp eye for design.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23C8956B' opacity='0.15'/><text x='50%' y='50%' dominant-baseline='central' text-anchor='middle' font-size='60' font-family='sans-serif' font-weight='bold' fill='%23C8956B'>A</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@300;400;500&family=Space+Grotesk:wght@400;500;700&family=Orbitron:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <Preloader />
          <CustomCursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
