import AboutClient from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about AeroPeak, our website and mobile app development company in Coimbatore, Tamil Nadu, and our mission to create high-performance web and mobile products.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | AeroPeak",
    description: "Learn about AeroPeak, our website and mobile app development company in Coimbatore, Tamil Nadu, and our mission to create high-performance web and mobile products.",
    url: "/about",
    siteName: "AeroPeak",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <AboutClient />;
}
