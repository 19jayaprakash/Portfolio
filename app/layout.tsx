import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AeroPeak | Website & Mobile App Development Company",
    template: "%s | AeroPeak",
  },
  description: "AeroPeak is a website and mobile app development company in Coimbatore specializing in Next.js, React, Laravel, UI/UX design, SEO, and custom software solutions.",
  keywords: [
    "AeroPeak",
    "AeroPeak Coimbatore",
    "Website Development Company",
    "Mobile App Development Company",
    "Software Engineering",
    "Digital Agency Coimbatore",
    "Web Application Development",
    "Custom API Systems",
    "Mobile Solutions",
    "React Native Developers",
    "Next.js Development",
    "Laravel Development",
    "UI/UX Design",
    "Full-Stack Development",
    "E-Commerce Solutions",
    "Coimbatore Software Company"
  ],
  authors: [{ name: "AeroPeak", url: siteUrl }],
  creator: "AeroPeak",
  publisher: "AeroPeak",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23C8956B' opacity='0.15'/><text x='50%' y='50%' dominant-baseline='central' text-anchor='middle' font-size='60' font-family='sans-serif' font-weight='bold' fill='%23C8956B'>A</text></svg>",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "AeroPeak | Website & Mobile App Development Company",
    description: "AeroPeak is a website and mobile app development company in Coimbatore specializing in Next.js, React, Laravel, UI/UX design, SEO, and custom software solutions.",
    siteName: "AeroPeak",
    images: [
      {
        url: "/Logo2.png",
        width: 1200,
        height: 630,
        alt: "AeroPeak Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AeroPeak | Website & Mobile App Development Company",
    description: "AeroPeak is a website and mobile app development company in Coimbatore specializing in Next.js, React, Laravel, UI/UX design, SEO, and custom software solutions.",
    images: ["/Logo2.png"],
    creator: "@aeropeak",
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
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
