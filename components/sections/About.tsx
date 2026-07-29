"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Code2, Palette, Zap, Globe, Users, ArrowRight, ShieldCheck, Cpu, Sparkles, Layers, Terminal, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDataRefresh } from "@/lib/useDataRefresh";

const teamDivisions = [
  {
    id: "architects",
    title: "Full-Stack Architecture",
    badge: "Core Engineering",
    desc: "Next.js, TypeScript, PostgreSQL, Supabase & REST/GraphQL API systems built for extreme scalability.",
    icon: Code2,
    color: "#F59E0B",
    stats: "15+ Tech Stacks",
    teamRole: "Full-Stack & Cloud Architects"
  },
  {
    id: "designers",
    title: "UI/UX & Design Systems",
    badge: "Creative Engineering",
    desc: "Pixel-perfect interfaces, fluid motion animations, interactive prototypes, and modern glassmorphic design.",
    icon: Palette,
    color: "#EC4899",
    stats: "100% Custom UI",
    teamRole: "UI/UX & Frontend Designers"
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    badge: "Cross-Platform",
    desc: "High-performance React Native iOS and Android mobile solutions with offline sync & push notifications.",
    icon: Cpu,
    color: "#6366F1",
    stats: "iOS & Android",
    teamRole: "Mobile Engineers"
  }
];

const companyPillars = [
  { icon: Users, label: "Multi-Disciplinary Team", desc: "Engineers, designers & tech strategists" },
  { icon: Code2, label: "Scalable Architecture", desc: "Production-ready, maintainable codebases" },
  { icon: Palette, label: "Pixel Precision UI", desc: "Modern visual aesthetics & micro-interactions" },
  { icon: ShieldCheck, label: "Enterprise Security", desc: "Data protection & cloud best practices" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeDivision, setActiveDivision] = useState(0);
  const [activeTab, setActiveTab] = useState<"story" | "team" | "capabilities">("story");
  
  const [aboutData, setAboutData] = useState<any>({
    title: "Turning ideas into",
    titleEmphasis: "digital reality",
    description1: "Led by our core team of software engineers, UI/UX designers, and cloud architects, AeroPeak has evolved from an ambitious initiative into a full-service digital agency. We combine creative design with production-grade engineering to deliver high-impact web and mobile products.",
    description2: "Headquartered in Coimbatore, Tamil Nadu — we partner with startups, growing businesses, and enterprise clients worldwide to design, develop, and deploy software built for speed and long-term scale.",
    teamEvolutionNote: "Our company has expanded into a multi-disciplinary software engineering team specializing in Next.js, React Native, Supabase, and custom UI/UX design systems.",
    companyHighlights: [
      { label: "Engineering Team", value: "Multi-Disciplinary", desc: "Developers, designers & architects" },
      { label: "Client Satisfaction", value: "99.4%", desc: "On-time delivery & transparent updates" },
      { label: "Global Reach", value: "25+ Products", desc: "Web, iOS, Android & cloud solutions" }
    ]
  });

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.about) {
          let desc1 = result.data.about.description1 || "";
          // Upgrade legacy single-founder description if present
          if (desc1.includes("Led by Founder & CEO Jayaprakash") || desc1.includes("Led by our founders")) {
            desc1 = "Led by our core team of software engineers, UI/UX designers, and cloud architects, AeroPeak has evolved into a full-scale digital agency. We bridge creative design with production-grade engineering to deliver high-impact web, mobile, and cloud software.";
          }

          setAboutData({
            title: result.data.about.title || "Turning ideas into",
            titleEmphasis: result.data.about.titleEmphasis || "digital reality",
            description1: desc1,
            description2: result.data.about.description2 || "Headquartered in Coimbatore, Tamil Nadu — we partner with startups, growing businesses, and enterprise clients worldwide to design, develop, and deploy software built for speed and scale.",
            teamEvolutionNote: result.data.about.teamEvolutionNote || "Engineered by a specialized team of full-stack developers, mobile engineers, UI/UX designers, and DevOps specialists.",
            companyHighlights: result.data.about.companyHighlights || [
              { label: "Engineering Team", value: "Multi-Disciplinary", desc: "Developers, designers & architects" },
              { label: "Client Satisfaction", value: "99.4%", desc: "On-time delivery & transparent updates" },
              { label: "Global Reach", value: "25+ Products", desc: "Web, iOS, Android & cloud solutions" }
            ]
          });
        }
      })
      .catch(err => console.error("Error fetching about data:", err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useDataRefresh(fetchData);

  // Auto rotate team division highlight
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDivision((prev) => (prev + 1) % teamDivisions.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const leftColY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const rightColY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  const currentDiv = teamDivisions[activeDivision];
  const DivIcon = currentDiv.icon;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Dynamic Background Glows */}
      <div
        className="absolute left-0 top-1/4 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", filter: "blur(100px)" }}
      />
      <div
        className="absolute right-0 bottom-1/4 w-[600px] h-[600px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)", filter: "blur(120px)" }}
      />

      {/* Section Label */}
      <motion.div
        className="flex items-center gap-4 mb-16 max-w-7xl mx-auto"
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono text-xs tracking-[0.3em] uppercase flex items-center gap-2" style={{ color: "var(--accent)" }}>
          <Sparkles size={14} />
          01 — ABOUT AEROPEAK &amp; TEAM EVOLUTION
        </span>
        <div className="flex-1 max-w-xs h-px" style={{ background: "var(--border-accent)" }} />
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Modern Multi-Card Interactive Team Hub (5 cols) */}
        <motion.div style={{ y: leftColY }} className="lg:col-span-5 relative space-y-6">
          
          {/* Main Division Spotlight Glass Card */}
          <div className="relative p-7 rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/90 via-neutral-900/60 to-neutral-950/90 backdrop-blur-2xl shadow-2xl space-y-6 overflow-hidden">
            
            {/* Top Bar with Status */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300 font-semibold">
                  AeroPeak Software Agency
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-bold">
                {currentDiv.badge}
              </span>
            </div>

            {/* Division Animated Body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDiv.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="p-3 rounded-2xl border" 
                    style={{ background: `${currentDiv.color}15`, borderColor: `${currentDiv.color}40`, color: currentDiv.color }}
                  >
                    <DivIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">{currentDiv.title}</h3>
                    <div className="text-xs text-amber-400 font-mono font-semibold">{currentDiv.teamRole}</div>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {currentDiv.desc}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono">Specialization Status:</span>
                  <span className="font-mono font-bold text-amber-400">{currentDiv.stats}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Division Switcher Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
              {teamDivisions.map((div, index) => {
                const Icon = div.icon;
                const isActive = activeDivision === index;
                return (
                  <button
                    key={div.id}
                    onClick={() => setActiveDivision(index)}
                    className={`p-2.5 rounded-xl border text-left transition-all duration-300 flex flex-col items-center text-center gap-1.5 ${
                      isActive 
                        ? "border-amber-500/60 bg-amber-500/10 text-white shadow-lg" 
                        : "border-white/5 bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-amber-400" : "text-neutral-400"} />
                    <span className="text-[10px] font-mono font-semibold truncate w-full">
                      {div.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Floating Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="p-5 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <Users size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Full Software Engineering Team</div>
                <div className="text-[11px] text-neutral-400">Frontend, Mobile, Backend &amp; Design</div>
              </div>
            </div>
            <div className="text-right font-mono text-xs text-amber-400 font-bold">
              Coimbatore, TN
            </div>
          </motion.div>

        </motion.div>

        {/* RIGHT COLUMN: Text & Interactive Overview (7 cols) */}
        <motion.div style={{ y: rightColY }} className="lg:col-span-7 space-y-8">
          
          {/* Header Title */}
          <div>
            <motion.h2
              className="font-display mb-4"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "var(--text-primary)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {aboutData.title}{" "}
              {aboutData.titleEmphasis && (
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent italic">
                  {aboutData.titleEmphasis}
                </span>
              )}
            </motion.h2>

            <motion.p
              className="text-base leading-relaxed text-neutral-200"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {aboutData.description1}
            </motion.p>
          </div>

          {/* Company & Team Evolution Highlight Box */}
          <motion.div
            className="p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-neutral-900/60 to-transparent backdrop-blur-md relative overflow-hidden space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <Cpu size={16} />
              <span>Company Growth &amp; Team Transition</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {aboutData.teamEvolutionNote}
            </p>
          </motion.div>

          {/* Interactive Navigation Tabs */}
          <div className="flex gap-2 border-b border-white/10 pb-3">
            {[
              { id: "story", label: "01 Company Story" },
              { id: "team", label: "02 Team Pillars" },
              { id: "capabilities", label: "03 Core Highlights" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-neutral-950 shadow-md font-bold"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[160px]">
            {activeTab === "story" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {aboutData.description2}
                </p>

                {/* Company Highlights metrics */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {aboutData.companyHighlights?.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className="text-xs font-bold text-amber-400 font-display">{item.value}</div>
                      <div className="text-[11px] font-semibold text-white mt-0.5">{item.label}</div>
                      <div className="text-[10px] text-neutral-400 leading-tight mt-0.5 truncate">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "team" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 gap-3"
              >
                {companyPillars.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-3 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{label}</div>
                      <div className="text-[11px] text-neutral-400 leading-tight mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "capabilities" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid sm:grid-cols-2 gap-3"
              >
                {[
                  "Full-Stack Web Development (Next.js/React)",
                  "Cross-Platform Mobile Apps (React Native)",
                  "Custom UI/UX & Interactive Design Systems",
                  "Supabase & PostgreSQL Cloud Infrastructure"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                    <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
                    <span className="text-xs text-neutral-200 font-medium">{item}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold font-mono transition-all duration-300 bg-amber-500 text-neutral-950 hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
            >
              <span>EXPLORE DEDICATED ABOUT PAGE</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold transition-all duration-300 border border-white/10 text-white hover:bg-white/5 hover:border-white/20"
            >
              <span>CONTACT OUR TEAM</span>
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
