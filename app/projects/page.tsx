import ProjectsClient from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects & Case Studies",
  description: "Explore our portfolio of high-performance web applications, custom API integrations, and mobile solutions engineered by Aeropeak.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Our Projects & Case Studies | Aeropeak Technologies",
    description: "Explore our portfolio of high-performance web applications, custom API integrations, and mobile solutions engineered by Aeropeak.",
    url: "/projects",
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
    title: "Our Projects & Case Studies | Aeropeak Technologies",
    description: "Explore our portfolio of high-performance web applications, custom API integrations, and mobile solutions engineered by Aeropeak.",
    images: ["/Logo.png"],
  },
};

export default function Page() {
  return <ProjectsClient />;
}
