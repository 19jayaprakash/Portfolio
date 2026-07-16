import ContactClient from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Aeropeak Technologies. Let's discuss your next project, custom software engineering, mobile app development, or website design.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Aeropeak Technologies",
    description: "Get in touch with Aeropeak Technologies. Let's discuss your next project, custom software engineering, mobile app development, or website design.",
    url: "/contact",
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
    title: "Contact Us | Aeropeak Technologies",
    description: "Get in touch with Aeropeak Technologies. Let's discuss your next project, custom software engineering, mobile app development, or website design.",
    images: ["/Logo.png"],
  },
};

export default function Page() {
  return <ContactClient />;
}
