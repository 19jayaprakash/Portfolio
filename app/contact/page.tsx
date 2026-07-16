import ContactClient from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with AeroPeak. Let's discuss your next project, custom software engineering, mobile app development, website design, or Laravel applications.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | AeroPeak",
    description: "Get in touch with AeroPeak. Let's discuss your next project, custom software engineering, mobile app development, website design, or Laravel applications.",
    url: "/contact",
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
    title: "Contact Us | AeroPeak",
    description: "Get in touch with AeroPeak. Let's discuss your next project, custom software engineering, mobile app development, website design, or Laravel applications.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <ContactClient />;
}
