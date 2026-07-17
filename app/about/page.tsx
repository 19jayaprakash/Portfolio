import AboutClient from "./page.client";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "About Us",
  description: "Learn about AeroPeak, our website and mobile app development company in Coimbatore, Tamil Nadu, and our mission to create high-performance web and mobile products.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    title: "About Us | AeroPeak",
    description: "Learn about AeroPeak, our website and mobile app development company in Coimbatore, Tamil Nadu, and our mission to create high-performance web and mobile products.",
    url: "/about",
    siteName: "AeroPeak",
    images: [
      {
        url: `${siteUrl}/Logo2.jpg`,
        width: 1200,
        height: 630,
        alt: "AeroPeak Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | AeroPeak",
    description: "Learn about AeroPeak, our website and mobile app development company in Coimbatore, Tamil Nadu, and our mission to create high-performance web and mobile products.",
    images: [`${siteUrl}/Logo2.jpg`],
  },
};

export default function Page() {
  return <AboutClient />;
}
