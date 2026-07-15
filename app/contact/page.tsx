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
  },
  twitter: {
    title: "Contact Us | Aeropeak Technologies",
    description: "Get in touch with Aeropeak Technologies. Let's discuss your next project, custom software engineering, mobile app development, or website design.",
  },
};

export default function Page() {
  return <ContactClient />;
}
