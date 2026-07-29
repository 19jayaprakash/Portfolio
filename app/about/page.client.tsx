"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutPageContent from "@/components/sections/AboutPageContent";

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      
      <main className="pt-24">
        {/* Render dedicated standalone About Page content */}
        <AboutPageContent />
      </main>

      <Footer />
    </div>
  );
}
