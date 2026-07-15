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
  },
  twitter: {
    title: "About Us | Aeropeak Technologies",
    description: "Learn about Aeropeak Technologies, our next-gen digital engineering agency in Coimbatore, Tamil Nadu, and our mission to create high-performance web and mobile products.",
  },
};

export default function Page() {
  return <AboutClient />;
}
