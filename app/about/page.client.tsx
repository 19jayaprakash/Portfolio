"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";
import Studies from "@/components/sections/Studies";

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      
      <main className="pt-24">
        {/* Render standalone profile section */}
        <About />
        
        {/* Render standalone timeline (education & certs) */}
        <Studies />
      </main>

      <Footer />
    </div>
  );
}
