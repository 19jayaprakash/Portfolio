import AboutClient from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Aeropeak Technologies, our next-gen digital engineering agency in Coimbatore, Tamil Nadu, and our mission to create high-performance web and mobile products.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Aeropeak Technologies",
    description: "Learn about Aeropeak Technologies, our next-gen digital engineering agency in Coimbatore, Tamil Nadu, and our mission to create high-performance web and mobile products.",
    url: "/about",
    siteName: "Aeropeak Technologies",
    images: [
      {
        url: "/Logo.png",
        width: 800,
        height: 800,
        alt: "Aeropeak Technologies Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Aeropeak Technologies",
    description: "Learn about Aeropeak Technologies, our next-gen digital engineering agency in Coimbatore, Tamil Nadu, and our mission to create high-performance web and mobile products.",
    images: ["/Logo.png"],
  },
};

export default function Page() {
  return <AboutClient />;
}
