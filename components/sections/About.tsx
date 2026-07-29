"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Code2, ArrowRight, Sparkles, CheckCircle2, ChevronRight, Target, Compass } from "lucide-react";
import Link from "next/link";
import { useDataRefresh } from "@/lib/useDataRefresh";

const defaultFocusAreas = [
  "Custom Web Platforms (Next.js/React)",
  "Cross-Platform Mobile Apps (React Native)",
  "UI/UX Design Systems & Micro-Interactions",
  "Scalable Cloud Architecture & APIs",
  "KPI-Aligned Performance & SEO Optimization"
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  
  const [aboutData, setAboutData] = useState<any>({
    badgeText: "OUR APPROACH",
    title: "We engineer your",
    titleEmphasis: "digital growth engine.",
    description1: "At AeroPeak, we see software engineering not as an expense, but as a calculated digital investment. Led by our core team based in Coimbatore, our agile team specializes in blending creative design with production-grade technical rigor.",
    description2: "Rooted in South India, built to global standards — we transform potential into measurable, sustainable market leadership.",
    focusAreasLabel: "PERFORMANCE FOCUS AREAS",
    focusAreas: defaultFocusAreas,
    authorName: "R. Jayaprakash & Engineering Team",
    authorRole: "Founder & Core Team, AeroPeak",
    visionBadge: "OUR VISION",
    visionTitle: "Driving measurable, sustainable growth",
    visionQuote: "Ambitious, regional, and outcome-driven — establishing AeroPeak as your serious, long-term digital growth partner."
  });

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.about) {
          const ab = result.data.about;
          
          let desc1 = ab.description1 || "";
          if (desc1.includes("Led by Founder & CEO Jayaprakash") || desc1.includes("Led by our core team of engineers, designers")) {
            desc1 = "At AeroPeak, we see software engineering not as an expense, but as a calculated digital investment. Led by our core team based in Coimbatore, our agile team specializes in blending creative design with production-grade technical rigor.";
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
            visionQuote: ab.visionQuote || "Ambitious, regional, and outcome-driven — establishing AeroPeak as your serious, long-term digital growth partner."
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
        className="absolute bottom-10 right-0 select-none pointer-events-none font-serif text-[120px] sm:text-[180px] md:text-[260px] font-normal leading-none opacity-[0.03] text-[#C8956B] tracking-tight"
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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(200,149,107,0.3)] bg-[rgba(200,149,107,0.06)] text-[#C8956B] font-mono text-[11px] uppercase tracking-[0.2em] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8956B]" />
                {aboutData.badgeText}
              </span>
            </div>

            {/* Main Headline (Editorial Serif + Italic Gradient) */}
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.15] text-stone-100 tracking-tight">
              {aboutData.title}{" "}
              <span 
                className="block italic font-serif text-[#C8956B] pt-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {aboutData.titleEmphasis}
              </span>
            </h2>

            {/* Subtle Divider */}
            <div className="w-full max-w-md h-px bg-gradient-to-r from-[#C8956B]/40 to-transparent" />

            {/* Minimal Paragraph */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              At <strong className="text-white font-semibold">AeroPeak</strong>, we see software development not as an expense, but as a <strong className="text-[#C8956B] font-semibold">calculated digital investment</strong>. Led by our core team based in Coimbatore, our agile team specializes in blending <strong className="text-white font-semibold">creative engineering with analytical rigor</strong>.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C8956B] uppercase hover:text-amber-300 transition-colors group font-semibold"
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
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8956B] font-semibold border-b border-stone-800 pb-3">
              {aboutData.focusAreasLabel}
            </div>

            {/* Numbered Minimal List */}
            <div className="space-y-0">
              {(aboutData.focusAreas || defaultFocusAreas).map((area: string, index: number) => (
                <div 
                  key={index}
                  className="py-4 border-b border-stone-800/80 flex items-center gap-6 group hover:border-[rgba(200,149,107,0.5)] transition-colors"
                >
                  <span className="font-mono text-xs text-stone-500 group-hover:text-[#C8956B] transition-colors">
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
              <div className="w-12 h-12 rounded-full border border-[rgba(200,149,107,0.3)] bg-[rgba(200,149,107,0.08)] flex items-center justify-center text-[#C8956B] flex-shrink-0">
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


        {/* ================= SECTION 2: OUR VISION & MISSION ================= */}
        <motion.div 
          className="pt-12 border-t border-stone-800/80 space-y-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Header Title Block */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[rgba(200,149,107,0.3)] bg-[rgba(200,149,107,0.06)] text-[#C8956B] font-mono text-[11px] uppercase tracking-[0.2em] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8956B]" />
                {aboutData.visionBadge}
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-100 leading-tight">
              Driving measurable,{" "}
              <span 
                className="italic font-serif text-[#C8956B]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                sustainable growth
              </span>
            </h3>

            <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              {aboutData.description2}
            </p>
          </div>

          {/* Grid Vision & Mission Cards */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Card: OUR MISSION */}
            <div className="lg:col-span-6 p-8 rounded-2xl border border-stone-800 bg-stone-950/40 space-y-4 backdrop-blur-sm flex flex-col justify-between hover:border-[rgba(200,149,107,0.4)] transition-all">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8956B] font-medium">
                  <Target size={14} />
                  <span>OUR MISSION</span>
                </div>
                <h4 className="font-serif text-2xl md:text-3xl text-stone-100 font-normal">
                  Production-Grade Digital Software
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                  To empower ambitious companies by building production-grade web platforms, cross-platform mobile apps, and scalable cloud systems with uncompromised technical rigor and visual excellence.
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono text-stone-400">
                <span>Coimbatore • Tamil Nadu</span>
                <span className="text-[#C8956B] font-semibold">Global Engineering</span>
              </div>
            </div>

            {/* Right Card: OUR VISION & QUOTE */}
            <div className="lg:col-span-6 p-8 rounded-2xl border border-stone-800 bg-stone-950/40 backdrop-blur-sm flex flex-col justify-between relative overflow-hidden hover:border-[rgba(200,149,107,0.4)] transition-all">
              <div className="pl-6 border-l-2 border-[#C8956B] space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8956B] font-semibold">
                  <Compass size={14} />
                  <span>VISION STATEMENT</span>
                </div>
                <p className="font-serif text-lg sm:text-xl md:text-2xl italic text-stone-200 leading-relaxed font-light">
                  &quot;{aboutData.visionQuote}&quot;
                </p>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8956B] font-semibold">
                  — AEROPEAK DIGITAL AGENCY
                </div>
              </div>

              <div className="pt-6 flex items-center justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold bg-[#C8956B] text-stone-950 hover:bg-amber-400 transition-all hover:scale-105 shadow-lg shadow-[rgba(200,149,107,0.2)]"
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
