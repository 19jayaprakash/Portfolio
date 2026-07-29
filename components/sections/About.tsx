"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Code2, ArrowRight, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useDataRefresh } from "@/lib/useDataRefresh";

const defaultFocusAreas = [
  "Conversions & Custom Web Apps",
  "Cross-Platform Mobile Apps",
  "UI/UX Design Systems & Interfaces",
  "Scalable Cloud Architecture & APIs",
  "KPI-Aligned Performance & SEO"
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  
  const [aboutData, setAboutData] = useState<any>({
    badgeText: "OUR APPROACH",
    title: "We engineer your",
    titleEmphasis: "digital growth engine.",
    description1: "At AeroPeak, we see software engineering not as an expense, but as a calculated investment. Led by our core team based in Coimbatore, our agile team specializes in blending creative design with technical rigor.",
    description2: "Rooted in South India, built to global standards — we transform potential into measurable, sustainable market leadership.",
    focusAreasLabel: "PERFORMANCE FOCUS AREAS",
    focusAreas: defaultFocusAreas,
    authorName: "R. Jayaprakash & Engineering Team",
    authorRole: "Founder & Core Team, AeroPeak",
    visionBadge: "OUR VISION",
    visionTitle: "Driving measurable, sustainable growth",
    visionQuote: "Ambitious, regional, and outcome-driven — establishing AeroPeak as a serious, long-term growth partner."
  });

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.about) {
          const ab = result.data.about;
          
          let desc1 = ab.description1 || "";
          if (desc1.includes("Led by Founder & CEO Jayaprakash") || desc1.includes("Led by our core team of engineers, designers")) {
            desc1 = "At AeroPeak, we see software engineering not as an expense, but as a calculated investment. Led by our core team based in Coimbatore, our agile team specializes in blending creative design with technical rigor.";
          }

          setAboutData({
            badgeText: ab.badgeText || "OUR APPROACH",
            title: ab.title || "We engineer your",
            titleEmphasis: ab.titleEmphasis || "digital growth engine.",
            description1: desc1,
            description2: ab.description2 || "Rooted in South India, built to global standards — we transform potential into measurable, sustainable market leadership.",
            focusAreasLabel: ab.focusAreasLabel || "PERFORMANCE FOCUS AREAS",
            focusAreas: ab.focusAreas || defaultFocusAreas,
            authorName: ab.authorName || "R. Jayaprakash & Engineering Team",
            authorRole: ab.authorRole || "Founder & Core Team, AeroPeak",
            visionBadge: ab.visionBadge || "OUR VISION",
            visionTitle: ab.visionTitle || "Driving measurable, sustainable growth",
            visionQuote: ab.visionQuote || "Ambitious, regional, and outcome-driven — establishing AeroPeak as a serious, long-term growth partner."
          });
        }
      })
      .catch(err => console.error("Error fetching about data:", err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useDataRefresh(fetchData);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden"
      style={{ background: "#0c0a09" }}
    >
      {/* Background Giant Watermark Typography - Approach */}
      <div 
        className="absolute top-8 -left-12 select-none pointer-events-none font-serif text-[120px] sm:text-[180px] md:text-[260px] font-normal leading-none opacity-[0.03] text-white tracking-tight"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Approach
      </div>

      {/* Background Giant Watermark Typography - Vision */}
      <div 
        className="absolute bottom-10 right-0 select-none pointer-events-none font-serif text-[120px] sm:text-[180px] md:text-[260px] font-normal leading-none opacity-[0.03] text-amber-200 tracking-tight"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Vision
      </div>

      {/* Subtle Background Radial Glow */}
      <div 
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #C8956B 0%, transparent 70%)", filter: "blur(120px)" }}
      />

      <div className="max-w-7xl mx-auto space-y-28 md:space-y-36 relative z-10">
        
        {/* ================= SECTION 1: OUR APPROACH ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Approach Pill Badge, Headline & Story */}
          <motion.div 
            className="lg:col-span-6 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Pill Badge */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(200,149,107,0.3)] bg-[rgba(200,149,107,0.06)] text-[#d97706] font-mono text-[11px] uppercase tracking-[0.2em] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                {aboutData.badgeText}
              </span>
            </div>

            {/* Main Headline (Editorial Serif + Italic Gradient) */}
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.15] text-stone-100 tracking-tight">
              {aboutData.title}{" "}
              <span className="block italic font-serif bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent pt-1">
                {aboutData.titleEmphasis}
              </span>
            </h2>

            {/* Subtle Divider */}
            <div className="w-full max-w-md h-px bg-gradient-to-r from-amber-500/30 to-transparent" />

            {/* Minimal Paragraph */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              At <strong className="text-white font-semibold">AeroPeak</strong>, we see software development not as an expense, but as a <strong className="text-amber-400 font-semibold">calculated investment</strong>. Led by our core team based in Coimbatore, our agile team specializes in blending <strong className="text-white font-semibold">creative engineering with analytical rigor</strong>.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase hover:text-amber-300 transition-colors group"
              >
                <span>EXPLORE DEDICATED ABOUT PAGE</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Focus Areas List & Author Badge */}
          <motion.div 
            className="lg:col-span-6 space-y-10 pt-2 lg:pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Focus Areas Sub-Header */}
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#d97706] font-semibold border-b border-stone-800 pb-3">
              {aboutData.focusAreasLabel}
            </div>

            {/* Numbered Minimal List */}
            <div className="space-y-0">
              {(aboutData.focusAreas || defaultFocusAreas).map((area: string, index: number) => (
                <div 
                  key={index}
                  className="py-4 border-b border-stone-800/80 flex items-center gap-6 group hover:border-amber-500/40 transition-colors"
                >
                  <span className="font-mono text-xs text-stone-500 group-hover:text-amber-400 transition-colors">
                    0{index + 1}
                  </span>
                  <span className="font-serif text-base md:text-lg text-stone-200 group-hover:text-white transition-colors">
                    {area}
                  </span>
                </div>
              ))}
            </div>

            {/* Founder & Team Signature Badge */}
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Star size={18} />
              </div>
              <div>
                <div className="font-serif text-sm font-semibold text-stone-100">
                  {aboutData.authorName}
                </div>
                <div className="text-xs text-stone-400 font-mono">
                  {aboutData.authorRole}
                </div>
              </div>
            </div>

          </motion.div>
        </div>


        {/* ================= SECTION 2: OUR VISION ================= */}
        <motion.div 
          className="pt-12 border-t border-stone-800/80 space-y-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Header Title Block */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[rgba(200,149,107,0.3)] bg-[rgba(200,149,107,0.06)] text-[#d97706] font-mono text-[11px] uppercase tracking-[0.2em] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                {aboutData.visionBadge}
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-100 leading-tight">
              {aboutData.visionTitle?.split(",")[0]},{" "}
              <span className="italic font-serif bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                {aboutData.visionTitle?.split(",")[1] || "sustainable growth"}
              </span>
            </h3>

            <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              {aboutData.description2}
            </p>
          </div>

          {/* Grid Vision Cards */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Card: Benchmark for Digital Growth */}
            <div className="lg:col-span-6 p-8 rounded-2xl border border-stone-800 bg-stone-950/40 space-y-4 backdrop-blur-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d97706] font-medium">
                  • OUR MISSION
                </div>
                <h4 className="font-serif text-2xl md:text-3xl text-stone-100 font-normal">
                  The Benchmark for Digital Engineering
                </h4>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                  To be the benchmark for strategic digital software engineering in the business ecosystem, recognized for transforming ambitious ideas into measurable, sustainable market leadership.
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono text-stone-400">
                <span>Coimbatore • India</span>
                <span className="text-amber-400 font-semibold">Global Delivery</span>
              </div>
            </div>

            {/* Right Card: Quote Box with Left Border Accent */}
            <div className="lg:col-span-6 p-8 rounded-2xl border border-stone-800 bg-stone-950/40 backdrop-blur-sm flex flex-col justify-between relative overflow-hidden">
              <div className="pl-6 border-l-2 border-amber-500/80 space-y-4">
                <p className="font-serif text-lg sm:text-xl md:text-2xl italic text-stone-200 leading-relaxed font-light">
                  &quot;{aboutData.visionQuote}&quot;
                </p>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  — AEROPEAK DIGITAL AGENCY
                </div>
              </div>

              <div className="pt-6 flex items-center justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-all hover:scale-105"
                >
                  <span>START A PROJECT</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
