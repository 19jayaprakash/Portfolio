import ContactClient from "./page.client";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Contact Us",
  description: "Get in touch with AeroPeak. Let's discuss your next project, custom software engineering, mobile app development, website design, or Laravel applications.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    title: "Contact Us | AeroPeak",
    description: "Get in touch with AeroPeak. Let's discuss your next project, custom software engineering, mobile app development, website design, or Laravel applications.",
    url: "/contact",
    siteName: "AeroPeak",
    images: [
      {
        url: `${siteUrl}/Logo2.png`,
        width: 1200,
        height: 630,
        alt: "AeroPeak Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | AeroPeak",
    description: "Get in touch with AeroPeak. Let's discuss your next project, custom software engineering, mobile app development, website design, or Laravel applications.",
    images: [`${siteUrl}/Logo2.png`],
  },
};

export default function Page() {
  return <ContactClient />;
}
