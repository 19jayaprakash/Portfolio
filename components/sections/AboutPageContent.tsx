"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Users, Code2, Palette, Zap, Globe, Github, Linkedin, 
  Sparkles, CheckCircle2, Award, Calendar, ChevronRight, ArrowUpRight, Cpu
} from "lucide-react";
import Image from "next/image";
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
    <div className="relative overflow-hidden text-neutral-100 py-12 md:py-20">
      {/* Background Decorative Glows */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", filter: "blur(120px)" }}
      />
      <div 
        className="absolute bottom-1/3 right-0 w-[600px] h-[600px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)", filter: "blur(140px)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 md:space-y-32">
        
        {/* 1. HERO BANNER */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase"
          >
            <Sparkles size={14} />
            <span>{page.heroBadge || "About AeroPeak Digital Agency"}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            {page.heroTitle || "Architecting Next-Generation"}{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent italic">
              Digital Software
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed max-w-3xl mx-auto"
          >
            {page.heroSubtitle || "We are a collective of software engineers, product designers, and technology consultants dedicated to building exceptional web & mobile experiences."}
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
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md text-center hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 2. COMPANY STORY & TRANSFORMATION */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Cpu size={14} />
              <span>Company Evolution</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              {page.storyTitle || "Our Journey & Growth"}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
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
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-neutral-200">
                  <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative p-8 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-neutral-400 ml-2">aeropeak-core-spec.ts</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  v2.5 PRODUCTION
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs text-neutral-300">
                <div>
                  <span className="text-amber-400">const</span> company = &#123;
                </div>
                <div className="pl-4 space-y-1 text-neutral-400">
                  <div>name: <span className="text-emerald-400">&quot;AeroPeak Digital Agency&quot;</span>,</div>
                  <div>team: <span className="text-emerald-400">&quot;Engineers, Designers &amp; Architects&quot;</span>,</div>
                  <div>location: <span className="text-emerald-400">&quot;Coimbatore, Tamil Nadu&quot;</span>,</div>
                  <div>stack: [<span className="text-amber-300">&quot;Next.js&quot;</span>, <span className="text-amber-300">&quot;React Native&quot;</span>, <span className="text-amber-300">&quot;Supabase&quot;</span>, <span className="text-amber-300">&quot;Figma&quot;</span>],</div>
                  <div>mission: <span className="text-emerald-400">&quot;Empower businesses with production-grade digital products.&quot;</span></div>
                </div>
                <div>&#125;;</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LEADERSHIP & ENGINEERING TEAM */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Users size={14} />
              <span>Leadership & Experts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Meet Our Core Team
            </h2>
            <p className="text-sm text-neutral-400">
              The driving force behind AeroPeak&apos;s software architecture, design aesthetics, and client execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {page.team?.map((member: any) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-amber-500/40 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Avatar / Photo Container */}
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                    <Image
                      src={member.image || "/images/photo_pose1.png"}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-xs font-mono text-amber-400 font-bold bg-neutral-950/80 px-2.5 py-1 rounded-full backdrop-blur-md inline-block border border-amber-500/20">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed mt-2">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Skills pills */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills?.map((skill: string) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-3">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-amber-500/40 transition-all"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-amber-500/40 transition-all"
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. CORE VALUES & PHILOSOPHY */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Award size={14} />
              <span>Core Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              What Drives AeroPeak
            </h2>
            <p className="text-sm text-neutral-400">
              The fundamental principles behind every line of code we write and interface we design.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {page.values?.map((val: any) => (
              <div
                key={val.id}
                className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-4 hover:border-amber-500/40 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {val.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. COMPANY GROWTH MILESTONES */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Calendar size={14} />
              <span>Growth Timeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Company Milestones
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative pl-6 border-l border-amber-500/30 space-y-8">
            {page.milestones?.map((ms: any) => (
              <div key={ms.id} className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-amber-500 bg-neutral-950 group-hover:bg-amber-500 transition-colors" />
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-2 hover:border-amber-500/30 transition-all">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {ms.year}
                  </span>
                  <h3 className="text-lg font-bold text-white pt-1">{ms.title}</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">{ms.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CALL TO ACTION BANNER */}
        <section className="p-10 md:p-14 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-neutral-900/80 to-amber-500/5 backdrop-blur-xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
              Ready to build something extraordinary with AeroPeak?
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Whether you need a custom web application, cross-platform mobile app, or design consultation — our team is ready to deliver.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold font-mono transition-all duration-300 bg-amber-500 text-neutral-950 hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/20"
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
