"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Studies from "@/components/sections/Studies";
import Projects from "@/components/sections/Projects";
import FreelanceProjects from "@/components/sections/FreelanceProjects";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import MarqueeBar from "@/components/ui/MarqueeBar";
import StatsBar from "@/components/sections/StatsBar";

export default function Home() {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    hero: true,
    marquee: true,
    about: true,
    stats: true,
    services: true,
    studies: true,
    projects: true,
    freelance: true,
    pricing: true,
    testimonials: true,
    contact: true,
  });

  useEffect(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.data?.sectionVisibility) {
          setVisibility(resData.data.sectionVisibility);
        }
      })
      .catch((err) => {
        console.error("Error loading visibility:", err);
      });

    // Listen for storage events (updates from admin dashboard)
    const handleStorageChange = () => {
      fetch(`/api/portfolio?t=${Date.now()}`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData?.data?.sectionVisibility) {
            setVisibility(resData.data.sectionVisibility);
          }
        });
    };

    window.addEventListener("storage", handleStorageChange);
    // Add custom event listener for immediate same-window updates
    window.addEventListener("portfolio-updated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("portfolio-updated", handleStorageChange);
    };
  }, []);

  return (
    <main>
      <Navbar />
      {visibility.hero !== false && <Hero />}
      {visibility.marquee !== false && <MarqueeBar />}
      {visibility.about !== false && <About />}
      {visibility.stats !== false && <StatsBar />}
      {visibility.services !== false && <Services />}
      {visibility.studies !== false && <Studies />}
      {visibility.projects !== false && <Projects />}
      {visibility.freelance !== false && <FreelanceProjects />}
      {visibility.pricing !== false && <Pricing />}
      {visibility.testimonials !== false && <Testimonials />}
      {visibility.contact !== false && <Contact />}
      <Footer />
    </main>
  );
}
