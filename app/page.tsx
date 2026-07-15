import Home from "./page.client";
import { getPortfolioData } from "@/lib/portfolio-data-server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const name = data.personal?.name || "Aeropeak";
  const title = data.personal?.title || "Next-Gen Software & Digital Engineering Agency";
  const description = data.personal?.heroSubtitle || "We engineer high-performance web applications, custom API systems, and mobile solutions with a sharp eye for design.";

  return {
    title: `${name} | ${title}`,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: `${name} | ${title}`,
      description,
      url: "/",
    },
    twitter: {
      title: `${name} | ${title}`,
      description,
    },
  };
}

export default async function Page() {
  const data = await getPortfolioData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${data.personal?.name || "Aeropeak"} Technologies`,
    "description": data.personal?.heroSubtitle || "Next-Gen Software & Digital Engineering Agency",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.in",
    "logo": `${process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.in"}/Logo.png`,
    "image": `${process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.in"}/Logo.png`,
    "email": data.personal?.email || "contact.aeropeak@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "sameAs": [
      data.personal?.github,
      data.personal?.linkedin
    ].filter(Boolean),
    "priceRange": "$$",
    "knowsAbout": [
      "Software Engineering",
      "Full-Stack Development",
      "UI/UX Design",
      "Mobile App Development",
      "E-Commerce Solutions"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  );
}
