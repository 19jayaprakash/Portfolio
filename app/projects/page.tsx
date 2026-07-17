import ProjectsClient from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects & Case Studies",
  description: "Explore our portfolio of high-performance web applications, custom API integrations, Laravel solutions, and mobile apps engineered by AeroPeak.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Our Projects & Case Studies | AeroPeak",
    description: "Explore our portfolio of high-performance web applications, custom API integrations, Laravel solutions, and mobile apps engineered by AeroPeak.",
    url: "/projects",
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
    title: "Our Projects & Case Studies | AeroPeak",
    description: "Explore our portfolio of high-performance web applications, custom API integrations, Laravel solutions, and mobile apps engineered by AeroPeak.",
    images: ["/Logo2.png"],
  },
};

export default function Page() {
  return <ProjectsClient />;
}
