"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Code2, Palette, Zap, Globe, Users, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDataRefresh } from "@/lib/useDataRefresh";

const defaultSkills = [
  { category: "Frontend & Web", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Mobile Apps", items: ["React Native", "iOS / Android", "Expo", "Push Notifications"] },
  { category: "Backend & Cloud", items: ["Node.js", "Express", "PostgreSQL", "Supabase", "REST & GraphQL"] },
  { category: "Design & UX", items: ["Figma", "UI/UX Strategy", "Prototyping", "Design Systems"] },
];

const defaultTraits = [
  { icon: Users, label: "Specialized Team", desc: "Engineers, designers & product strategists" },
  { icon: Code2, label: "Scalable Architecture", desc: "Production-ready, maintainable codebases" },
  { icon: Palette, label: "Pixel Precision UI", desc: "Modern visual aesthetics & smooth UX" },
  { icon: ShieldCheck, label: "Enterprise Security", desc: "Data protection & cloud best practices" },
];

const photos = [
  "/images/photo_pose1.png",
  "/images/photo_pose2.png",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeTab, setActiveTab] = useState<"vision" | "team" | "capabilities">("vision");
  
  const [aboutData, setAboutData] = useState<any>({
    title: "Turning ideas into",
    titleEmphasis: "digital reality",
    description1: "Led by our core team of engineers, designers, and system architects, AeroPeak has transformed from an ambitious dev initiative into a full-scale digital agency. We bridge creative design with production-grade engineering — delivering web apps, mobile solutions, and enterprise systems that scale.",
    description2: "Based in Coimbatore, Tamil Nadu — we partner with ambitious founders, growing startups, and enterprises worldwide to design, build, and optimize software that drives measurable business growth.",
    teamEvolutionNote: "Engineered by a specialized team of full-stack developers, mobile engineers, UI/UX designers, and DevOps specialists focused on crafting world-class digital experiences.",
    companyHighlights: [
      { label: "Engineering Team", value: "Multi-disciplinary", desc: "Full-stack devs, UI/UX designers & cloud architects" },
      { label: "Client Satisfaction", value: "99.4%", desc: "On-time delivery & transparent communication" },
      { label: "Global Reach", value: "25+ Apps", desc: "Deployed across web, iOS, Android & cloud" }
    ]
  });

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.about) {
          setAboutData({
            title: result.data.about.title || "Turning ideas into",
            titleEmphasis: result.data.about.titleEmphasis || "digital reality",
            description1: result.data.about.description1 || "Led by our core team of engineers, designers, and system architects, AeroPeak has transformed from an ambitious dev initiative into a full-scale digital agency.",
            description2: result.data.about.description2 || "Based in Coimbatore, Tamil Nadu — we partner with ambitious founders, growing startups, and enterprises worldwide to design, build, and optimize software.",
            teamEvolutionNote: result.data.about.teamEvolutionNote || "Engineered by a specialized team of full-stack developers, mobile engineers, UI/UX designers, and DevOps specialists.",
            companyHighlights: result.data.about.companyHighlights || [
              { label: "Engineering Team", value: "Multi-disciplinary", desc: "Full-stack devs, UI/UX designers & cloud architects" },
              { label: "Client Satisfaction", value: "99.4%", desc: "On-time delivery & transparent communication" },
              { label: "Global Reach", value: "25+ Apps", desc: "Deployed across web, iOS, Android & cloud" }
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background glow effects */}
      <div
        className="absolute left-0 top-1/3 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        className="absolute right-0 bottom-1/4 w-[500px] h-[500px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)", filter: "blur(100px)" }}
      />

      {/* Section label */}
      <motion.div
        className="flex items-center gap-4 mb-16 max-w-7xl mx-auto"
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
          01 — About AeroPeak & Team
        </span>
        <div className="flex-1 max-w-xs h-px" style={{ background: "var(--border-accent)" }} />
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Image Frame & Interactive Floating Badges (5 cols) */}
        <motion.div style={{ y: imageY }} className="lg:col-span-5 relative">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Main photo container with glowing border */}
            <div
              className="relative w-full max-w-[360px] mx-auto rounded-3xl overflow-hidden border-2 border-[var(--accent)]/30"
              style={{
                aspectRatio: "4/5",
                boxShadow: "0 30px 70px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {photos.map((src, i) => (
                <motion.div
                  key={src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: i === activePhoto ? 1 : 0, 
                    scale: i === activePhoto ? 1.03 : 0.95,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <Image
                    src={src}
                    alt={`AeroPeak Team Lead ${i + 1}`}
                    fill
                    className="object-cover object-top"
                  />
                </motion.div>
              ))}
              
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}
              />

              {/* Photo Indicator Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === activePhoto ? "32px" : "8px",
                      height: "8px",
                      background: i === activePhoto ? "var(--accent)" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Team Evolution Badge */}
            <motion.div
              className="absolute -bottom-6 -right-2 md:right-4 p-4 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl max-w-[260px] hidden sm:flex items-center gap-3"
              style={{ background: "rgba(15, 13, 10, 0.85)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                <Users size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Expanded Team</div>
                <div className="text-[11px] text-neutral-400 leading-tight">Engineers, UI/UX & Cloud Strategists</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Text & Interactive Content Tabs (7 cols) */}
        <motion.div style={{ y: textY }} className="lg:col-span-7 space-y-8">
          
          {/* Header Title */}
          <div>
            <motion.h2
              className="font-display mb-4"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 4rem)",
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
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent italic">
                  {aboutData.titleEmphasis}
                </span>
              )}
            </motion.h2>

            <motion.p
              className="text-base leading-relaxed text-neutral-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {aboutData.description1}
            </motion.p>
          </div>

          {/* Company & Team Transition Highlight Box */}
          <motion.div
            className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 mt-0.5 flex-shrink-0">
                <Cpu size={18} />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Company & Engineering Team
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {aboutData.teamEvolutionNote}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Navigation Tabs */}
          <div className="flex gap-2 border-b border-white/10 pb-3">
            {[
              { id: "vision", label: "Company Vision" },
              { id: "team", label: "Team Pillars" },
              { id: "capabilities", label: "Tech Stack" },
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
            {activeTab === "vision" && (
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
                    <div key={idx} className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
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
                {defaultTraits.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3 hover:border-amber-500/30 transition-all duration-300"
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
                className="grid grid-cols-2 gap-4"
              >
                {defaultSkills.map((group) => (
                  <div key={group.category} className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                      {group.category}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-neutral-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-mono transition-all duration-300 bg-amber-500 text-neutral-950 hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/10"
            >
              <span>EXPLORE FULL COMPANY PROFILE</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold transition-all duration-300 border border-white/10 text-white hover:bg-white/5 hover:border-white/20"
            >
              <span>PARTNER WITH US</span>
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
