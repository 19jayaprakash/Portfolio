"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Users, Code2, Palette, Zap, Globe, Github, Linkedin, 
  Sparkles, CheckCircle2, Award, Calendar, ChevronRight, ArrowUpRight, Cpu, Layers, Terminal, Server, ShieldCheck, Activity
} from "lucide-react";
import Link from "next/link";
import { useDataRefresh } from "@/lib/useDataRefresh";
import { defaultPortfolioData } from "@/lib/portfolio-data";

export default function AboutPageContent() {
  const [pageData, setPageData] = useState<any>(defaultPortfolioData.about);

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.data && result.data.about) {
          setPageData({
            ...defaultPortfolioData.about,
            ...result.data.about,
            page: {
              ...defaultPortfolioData.about.page,
              ...(result.data.about.page || {}),
            },
          });
        }
      })
      .catch((err) => console.error("Error fetching about page data:", err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useDataRefresh(fetchData);

  const page = pageData?.page || defaultPortfolioData.about.page!;

  return (
    <div className="relative overflow-hidden text-stone-100 py-12 md:py-20" style={{ background: "#0c0a09" }}>
      {/* Background Decorative Warm Glows */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #C8956B 0%, transparent 70%)", filter: "blur(140px)" }}
      />
      <div 
        className="absolute bottom-1/3 right-0 w-[600px] h-[600px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)", filter: "blur(160px)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 md:space-y-32">
        
        {/* 1. HERO BANNER */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(200,149,107,0.3)] bg-[rgba(200,149,107,0.06)] text-[#C8956B] text-xs font-mono font-semibold tracking-widest uppercase"
          >
            <Sparkles size={14} />
            <span>{page.heroBadge || "About AeroPeak Digital Agency"}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-stone-100 leading-tight"
          >
            {page.heroTitle || "Architecting Next-Generation"}{" "}
            <span 
              className="italic font-serif text-[#C8956B] block sm:inline"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Digital Software
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-stone-300 leading-relaxed max-w-3xl mx-auto font-light"
          >
            {page.heroSubtitle || "We are a collective of passionate software engineers, UI/UX designers, and technology consultants dedicated to building exceptional digital products."}
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto"
          >
            {[
              { label: "Engineering Team", value: "Multi-Disciplinary" },
              { label: "Client Apps Delivered", value: "25+ Products" },
              { label: "Code Quality Rating", value: "100% Production" },
              { label: "HQ Location", value: "Coimbatore, TN" },
            ].map((stat, i) => (
              <div 
                key={i}
                className="p-4 rounded-2xl border border-stone-800 bg-stone-950/40 backdrop-blur-md text-center hover:border-[rgba(200,149,107,0.4)] transition-all duration-300"
              >
                <div className="text-xs font-mono uppercase tracking-widest text-[#C8956B] font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-stone-400 font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 2. COMPANY STORY & TECH SPECIFICATION */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8956B]">
              <Cpu size={14} />
              <span>Company Evolution</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-100">
              {page.storyTitle || "Our Journey & Growth"}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              <p>
                {page.storyParagraph1 || "AeroPeak began with a singular vision: to eliminate the gap between complex enterprise software engineering and modern visual elegance."}
              </p>
              <p>
                {page.storyParagraph2 || "Today, operating from Coimbatore, Tamil Nadu, AeroPeak delivers end-to-end web platforms, mobile applications, and custom cloud software for clients across India and globally."}
              </p>
            </div>

            {/* Pillar checklist */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                "Full-Stack Web & Mobile Apps",
                "UI/UX Design Systems",
                "Scalable Database Architecture",
                "Direct Developer Support"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-stone-300">
                  <CheckCircle2 size={15} className="text-[#C8956B] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative p-8 rounded-3xl border border-stone-800 bg-stone-950/80 backdrop-blur-xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#C8956B]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#d97706]/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="text-xs font-mono text-stone-400 ml-2">aeropeak-agency-spec.ts</span>
                </div>
                <span className="text-[10px] font-mono text-[#C8956B] bg-[rgba(200,149,107,0.1)] px-2.5 py-0.5 rounded-md border border-[rgba(200,149,107,0.25)]">
                  v2.5 PRODUCTION
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs text-stone-300">
                <div>
                  <span className="text-[#C8956B]">const</span> agency = &#123;
                </div>
                <div className="pl-4 space-y-1 text-stone-400">
                  <div>name: <span className="text-[#C8956B]">&quot;AeroPeak Digital Agency&quot;</span>,</div>
                  <div>team: <span className="text-[#C8956B]">&quot;Engineers, Designers &amp; Architects&quot;</span>,</div>
                  <div>location: <span className="text-[#C8956B]">&quot;Coimbatore, Tamil Nadu&quot;</span>,</div>
                  <div>stack: [<span className="text-amber-400">&quot;Next.js&quot;</span>, <span className="text-amber-400">&quot;React Native&quot;</span>, <span className="text-amber-400">&quot;Supabase&quot;</span>],</div>
                  <div>mission: <span className="text-[#C8956B]">&quot;Empower businesses with production-grade software.&quot;</span></div>
                </div>
                <div>&#125;;</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CORE ENGINEERING DIVISIONS — PREMIUM GRAPHIC CARDS */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8956B]">
              <Users size={14} />
              <span>Agency Divisions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-100">
              Core Engineering <span className="italic font-serif text-[#C8956B]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Divisions</span>
            </h2>
            <p className="text-sm text-stone-400 font-light">
              The multi-disciplinary structure behind AeroPeak&apos;s software architecture, design systems, and client delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD 1: Full-Stack Architecture Team */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="p-7 rounded-3xl border border-stone-800 bg-stone-950/60 backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-[rgba(200,149,107,0.5)] transition-all duration-300 group shadow-xl"
            >
              <div className="space-y-5">
                {/* Visual Graphic Header — Terminal Code Widget */}
                <div className="p-5 rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-black space-y-3 relative overflow-hidden group-hover:border-[rgba(200,149,107,0.4)] transition-all">
                  <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-[#C8956B]" />
                      <span className="text-[10px] font-mono text-stone-400">fullstack-core.ts</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  
                  <div className="font-mono text-[10px] leading-relaxed text-stone-400 space-y-0.5">
                    <div><span className="text-[#C8956B]">const</span> stack = [<span className="text-amber-300">&quot;Next.js&quot;</span>, <span className="text-amber-300">&quot;React Native&quot;</span>];</div>
                    <div><span className="text-[#C8956B]">const</span> build = <span className="text-amber-300">&quot;Production Ready&quot;</span>;</div>
                    <div className="text-stone-500">// Scalable Cloud Architecture</div>
                  </div>

                  <div className="pt-1 flex justify-center">
                    <div className="text-[10px] font-mono text-[#C8956B] font-bold bg-[rgba(200,149,107,0.1)] px-3 py-1 rounded-full border border-[rgba(200,149,107,0.25)]">
                      Lead Systems &amp; Cloud Architect
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-normal text-stone-100 group-hover:text-[#C8956B] transition-colors">
                    Full-Stack Architecture Team
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed mt-2 font-light">
                    Engineered by R. Jayaprakash &amp; core architects specializing in Next.js, React Native, cloud infrastructure, and production-grade API systems.
                  </p>
                </div>
              </div>

              {/* Skills pills */}
              <div className="space-y-4 pt-4 border-t border-stone-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js", "React Native", "TypeScript", "Node.js", "System Architecture"].map((skill: string) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-stone-800 bg-stone-900/60 text-stone-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/19jayaprakash"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-[#C8956B] hover:border-[rgba(200,149,107,0.4)] transition-all"
                  >
                    <Github size={14} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jayaprakash-r-218968310/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-[#C8956B] hover:border-[rgba(200,149,107,0.4)] transition-all"
                  >
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: UI/UX & Design Engineering */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="p-7 rounded-3xl border border-stone-800 bg-stone-950/60 backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-[rgba(200,149,107,0.5)] transition-all duration-300 group shadow-xl"
            >
              <div className="space-y-5">
                {/* Visual Graphic Header — Design Tokens & UI Layout Widget */}
                <div className="p-5 rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-black space-y-3 relative overflow-hidden group-hover:border-[rgba(200,149,107,0.4)] transition-all">
                  <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <Palette size={14} className="text-[#C8956B]" />
                      <span className="text-[10px] font-mono text-stone-400">ui-design-tokens.fig</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#C8956B]">FIGMA • UI/UX</span>
                  </div>
                  
                  {/* Swatch & Grid layout preview */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#0c0a09] border border-stone-700" />
                      <div className="w-5 h-5 rounded-full bg-[#C8956B]" />
                      <div className="w-5 h-5 rounded-full bg-[#d97706]" />
                    </div>
                    <div className="text-[10px] font-serif italic text-amber-200">
                      Playfair + Inter
                    </div>
                  </div>

                  <div className="pt-1 flex justify-center">
                    <div className="text-[10px] font-mono text-[#C8956B] font-bold bg-[rgba(200,149,107,0.1)] px-3 py-1 rounded-full border border-[rgba(200,149,107,0.25)]">
                      UI/UX &amp; Frontend Specialists
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-normal text-stone-100 group-hover:text-[#C8956B] transition-colors">
                    UI/UX &amp; Design Engineering
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed mt-2 font-light">
                    Focused on crafting fluid motion animations, interactive micro-interactions, responsive design systems, and modern glassmorphic aesthetics.
                  </p>
                </div>
              </div>

              {/* Skills pills */}
              <div className="space-y-4 pt-4 border-t border-stone-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {["Figma", "Tailwind CSS", "Framer Motion", "UI Design", "User Research"].map((skill: string) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-stone-800 bg-stone-900/60 text-stone-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-[#C8956B] hover:border-[rgba(200,149,107,0.4)] transition-all"
                  >
                    <Github size={14} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-[#C8956B] hover:border-[rgba(200,149,107,0.4)] transition-all"
                  >
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CARD 3: Backend & Cloud Operations */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="p-7 rounded-3xl border border-stone-800 bg-stone-950/60 backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-[rgba(200,149,107,0.5)] transition-all duration-300 group shadow-xl"
            >
              <div className="space-y-5">
                {/* Visual Graphic Header — Cloud & Database Metrics Widget */}
                <div className="p-5 rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-black space-y-3 relative overflow-hidden group-hover:border-[rgba(200,149,107,0.4)] transition-all">
                  <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <Server size={14} className="text-[#C8956B]" />
                      <span className="text-[10px] font-mono text-stone-400">cloud-ops-metrics.sh</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Activity size={12} className="text-emerald-400" />
                      <span className="text-[9px] font-mono text-emerald-400">99.9% Uptime</span>
                    </div>
                  </div>
                  
                  <div className="font-mono text-[10px] text-stone-400 space-y-1">
                    <div className="flex justify-between">
                      <span>PostgreSQL DB:</span>
                      <span className="text-emerald-400">Synchronized</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Supabase RLS:</span>
                      <span className="text-[#C8956B]">Enforced</span>
                    </div>
                  </div>

                  <div className="pt-1 flex justify-center">
                    <div className="text-[10px] font-mono text-[#C8956B] font-bold bg-[rgba(200,149,107,0.1)] px-3 py-1 rounded-full border border-[rgba(200,149,107,0.25)]">
                      Backend &amp; Database Infrastructure
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-normal text-stone-100 group-hover:text-[#C8956B] transition-colors">
                    Backend &amp; Cloud Operations
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed mt-2 font-light">
                    Dedicated to PostgreSQL database optimization, Supabase security, API integrations, real-time sync systems, and Vercel cloud pipelines.
                  </p>
                </div>
              </div>

              {/* Skills pills */}
              <div className="space-y-4 pt-4 border-t border-stone-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {["PostgreSQL", "Supabase", "REST & GraphQL", "Docker", "AWS/Vercel"].map((skill: string) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-stone-800 bg-stone-900/60 text-stone-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-[#C8956B] hover:border-[rgba(200,149,107,0.4)] transition-all"
                  >
                    <Github size={14} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-[#C8956B] hover:border-[rgba(200,149,107,0.4)] transition-all"
                  >
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. CORE VALUES & PHILOSOPHY */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8956B]">
              <Award size={14} />
              <span>Core Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-100">
              What Drives <span className="italic font-serif text-[#C8956B]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>AeroPeak</span>
            </h2>
            <p className="text-sm text-stone-400 font-light">
              The fundamental principles behind every line of code we write and interface we design.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {page.values?.map((val: any) => (
              <div
                key={val.id}
                className="p-6 rounded-3xl border border-stone-800 bg-stone-950/40 backdrop-blur-md space-y-4 hover:border-[rgba(200,149,107,0.4)] hover:bg-stone-900/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-[rgba(200,149,107,0.1)] border border-[rgba(200,149,107,0.25)] text-[#C8956B] flex items-center justify-center font-bold">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-lg font-serif font-normal text-stone-100">
                  {val.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. COMPANY GROWTH MILESTONES */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8956B]">
              <Calendar size={14} />
              <span>Growth Timeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-100">
              Company <span className="italic font-serif text-[#C8956B]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Milestones</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative pl-6 border-l border-[rgba(200,149,107,0.3)] space-y-8">
            {page.milestones?.map((ms: any) => (
              <div key={ms.id} className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-[#C8956B] bg-stone-950 group-hover:bg-[#C8956B] transition-colors" />
                <div className="p-6 rounded-2xl border border-stone-800 bg-stone-950/40 backdrop-blur-md space-y-2 hover:border-[rgba(200,149,107,0.3)] transition-all">
                  <span className="text-xs font-mono font-bold text-[#C8956B] bg-[rgba(200,149,107,0.1)] px-2.5 py-0.5 rounded-full border border-[rgba(200,149,107,0.25)]">
                    {ms.year}
                  </span>
                  <h3 className="text-lg font-serif font-normal text-stone-100 pt-1">{ms.title}</h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-light">{ms.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CALL TO ACTION BANNER */}
        <section className="p-10 md:p-14 rounded-3xl border border-[rgba(200,149,107,0.3)] bg-gradient-to-r from-[rgba(200,149,107,0.1)] via-stone-950/90 to-[rgba(200,149,107,0.05)] backdrop-blur-xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-stone-100">
              Ready to build something extraordinary with <span className="italic font-serif text-[#C8956B]">AeroPeak</span>?
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              Whether you need a custom web application, cross-platform mobile app, or design consultation — our engineering team is ready to deliver.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono font-bold transition-all duration-300 bg-[#C8956B] text-stone-950 hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-xl shadow-[rgba(200,149,107,0.2)]"
              >
                <span>GET IN TOUCH WITH OUR TEAM</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
