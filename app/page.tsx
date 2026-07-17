import Home from "./page.client";
import { getPortfolioData } from "@/lib/portfolio-data-server";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.tech";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const name = data.personal?.name || "AeroPeak";
  const title = data.personal?.title || "Website & Mobile App Development Company";
  const description = data.personal?.heroSubtitle || "AeroPeak is a website and mobile app development company in Coimbatore specializing in Next.js, React, Laravel, UI/UX design, SEO, and custom software solutions.";

  return {
    metadataBase: new URL(siteUrl),
    title: `${name} | ${title}`,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      title: `${name} | ${title}`,
      description,
      url: "/",
      siteName: name,
      images: [
        {
          url: `${siteUrl}/Logo2.png`,
          width: 1200,
          height: 630,
          alt: `${name} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${title}`,
      description,
      images: [`${siteUrl}/Logo2.png`],
    },
    other: {
      "build-commit": "3e82c72",
    },
  };
}

export default async function Page() {
  const data = await getPortfolioData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": data.personal?.name || "AeroPeak",
    "description": data.personal?.heroSubtitle || "AeroPeak is a website and mobile app development company in Coimbatore specializing in Next.js, React, Laravel, UI/UX design, SEO, and custom software solutions.",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.tech",
    "logo": `${process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.tech"}/Logo.png`,
    "image": `${process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.tech"}/Logo.png`,
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
