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
  },
  twitter: {
    title: "Our Projects & Case Studies | Aeropeak Technologies",
    description: "Explore our portfolio of high-performance web applications, custom API integrations, and mobile solutions engineered by Aeropeak.",
  },
};

export default function Page() {
  return <ProjectsClient />;
}
