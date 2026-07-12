"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Code2 } from "lucide-react";

const roles = [
  "Custom Software Development",
  "Enterprise Web Applications",
  "High-Performance Cloud Architecture",
  "Digital Product Strategy"
];

// ─── Globe config ───────────────────────────────────────────────────────────
const TECH_NODES = [
  { label: "React",      lat:  30,  lon:   0,  color: "#61DAFB" },
  { label: "Node",       lat: -20,  lon:  60,  color: "#68BC00" },
  { label: "TS",         lat:  50,  lon: 130,  color: "#3178C6" },
  { label: "Next",       lat: -40,  lon: -60,  color: "#FFFFFF" },
  { label: "Go",         lat:  20,  lon: -120, color: "#00ADD8" },
  { label: "Python",     lat:  60,  lon: -30,  color: "#FFD43B" },
  { label: "AWS",        lat: -55,  lon: 150,  color: "#FF9900" },
  { label: "Docker",     lat:  10,  lon:  80,  color: "#1EB9F4" },
  { label: "SQL",        lat: -30,  lon: -150, color: "#E38C00" },
  { label: "Redis",      lat:  40,  lon: -80,  color: "#FF4438" },
  { label: "Vue",        lat:  70,  lon:  70,  color: "#42B883" },
  { label: "K8s",        lat: -10,  lon: -30,  color: "#326CE5" },
];

const SKILL_TAGS = [
  { label: "React",      bg: "rgba(97,218,251,0.12)",  border: "rgba(97,218,251,0.35)",  text: "#93e4f8" },
  { label: "Node.js",    bg: "rgba(68,189,50,0.12)",   border: "rgba(68,189,50,0.35)",   text: "#86efac" },
  { label: "TypeScript", bg: "rgba(49,120,198,0.15)",  border: "rgba(49,120,198,0.4)",   text: "#93c5fd" },
  { label: "Prisma",     bg: "rgba(200,149,107,0.12)", border: "rgba(200,149,107,0.35)", text: "#d4956a" },
  { label: "PostgreSQL", bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.35)",  text: "#c4b5fd" },
  { label: "GraphQL",    bg: "rgba(225,0,152,0.10)",   border: "rgba(225,0,152,0.30)",   text: "#f9a8d4" },
  { label: "Docker",     bg: "rgba(30,160,230,0.12)",  border: "rgba(30,160,230,0.35)",  text: "#7dd3fc" },
  { label: "Figma",      bg: "rgba(255,120,80,0.12)",  border: "rgba(255,120,80,0.30)",  text: "#fca5a5" },
];

const STATS = [
  { val: "99%",    lbl: "Uptime SLA"   },
  { val: "<100ms", lbl: "Avg Response" },
  { val: "4.9★",   lbl: "Client Score" },
];

// ─── Globe helpers ───────────────────────────────────────────────────────────
function latLonTo3D(lat: number, lon: number, r: number) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = lon          * (Math.PI / 180);
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}

function rotatePoint(p: { x: number; y: number; z: number }, rx: number, ry: number) {
  let { x, y, z } = p;
  const y2 =  y * Math.cos(rx) - z * Math.sin(rx);
  const z2 =  y * Math.sin(rx) + z * Math.cos(rx);
  const x2 =  x * Math.cos(ry) + z2 * Math.sin(ry);
  const z3 = -x * Math.sin(ry) + z2 * Math.cos(ry);
  return { x: x2, y: y2, z: z3 };
}

// Pre-build dot grid
const DOTS: { lat: number; lon: number }[] = [];
for (let la = -80; la <= 80; la += 18) {
  const r   = Math.cos((la * Math.PI) / 180);
  const cnt = Math.max(1, Math.round(r * 20));
  for (let i = 0; i < cnt; i++) {
    DOTS.push({ lat: la, lon: (360 / cnt) * i });
  }
}

// ─── Interactive Dashboard Mockup component ──────────────────────────────────
function DashboardMockup() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [revenue, setRevenue] = useState(12840);
  const [chartPeriod, setChartPeriod] = useState("7d");

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 15) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[320px] xs:w-[380px] sm:w-[450px] md:w-[480px] h-[340px] rounded-2xl border border-white/10 bg-neutral-950/70 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col font-sans text-xs text-neutral-300 select-none">
      {/* Window Header */}
      <div className="h-10 border-b border-white/5 px-4 flex items-center justify-between bg-neutral-900/40">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <div className="text-[10px] text-neutral-500 font-mono tracking-wider truncate mx-2">Aeropeak Console v1.0.2</div>
        <div className="flex gap-2 flex-shrink-0">
          <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-[var(--accent)] font-mono">Live</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-14 border-r border-white/5 flex flex-col items-center py-4 gap-4 bg-neutral-950/20">
          {["home", "analytics", "users", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                activeTab === tab ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {tab === "home" && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
              {tab === "analytics" && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>}
              {tab === "users" && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              {tab === "settings" && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
            </button>
          ))}
        </div>

        {/* Content View */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 overflow-y-auto">
          {/* Header row */}
          <div className="flex justify-between items-center">
            <div>
              <div className="text-neutral-400 font-medium">Performance Console</div>
              <div className="text-[10px] text-neutral-600">Real-time telemetry and API statistics</div>
            </div>
            <div className="flex gap-1 bg-white/5 p-0.5 rounded-lg border border-white/5">
              {["7d", "30d"].map(p => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={`px-2 py-0.5 rounded-md text-[9px] ${chartPeriod === p ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "text-neutral-500"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3 flex flex-col gap-1">
              <span className="text-neutral-500 text-[9px] sm:text-[10px]">Monthly Revenue</span>
              <span className="text-neutral-200 font-bold font-mono text-[11px] sm:text-xs">₹{revenue.toLocaleString()}</span>
              <span className="text-[9px] text-emerald-500 flex items-center gap-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                12.4%
              </span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3 flex flex-col gap-1">
              <span className="text-neutral-500 text-[9px] sm:text-[10px]">Response Speed</span>
              <span className="text-neutral-200 font-bold font-mono text-[11px] sm:text-xs">92ms</span>
              <span className="text-[9px] text-emerald-500 flex items-center gap-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                4.8%
              </span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3 flex flex-col gap-1">
              <span className="text-neutral-500 text-[9px] sm:text-[10px]">Uptime Rate</span>
              <span className="text-neutral-200 font-bold font-mono text-[11px] sm:text-xs">99.98%</span>
              <span className="text-[9px] text-emerald-500 flex items-center gap-0.5">
                Optimal
              </span>
            </div>
          </div>

          {/* Chart area */}
          <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-3 relative overflow-hidden flex flex-col min-h-[90px]">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-neutral-500 text-[9px]">API Requests & Throughput</span>
              <span className="text-[9px] text-neutral-400 font-mono">Peak: 4.8k req/m</span>
            </div>
            
            {/* SVG Chart */}
            <div className="flex-1 relative flex items-end">
              <svg className="w-full h-14 overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Fill */}
                <path
                  d="M 0,40 L 0,35 Q 10,25 20,28 T 40,15 T 60,18 T 80,10 T 100,5 L 100,40 Z"
                  fill="url(#chartGlow)"
                />
                {/* Stroke */}
                <motion.path
                  d="M 0,35 Q 10,25 20,28 T 40,15 T 60,18 T 80,10 T 100,5"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                {/* Dots on line */}
                <circle cx="40" cy="15" r="1.5" fill="var(--accent)" />
                <circle cx="80" cy="10" r="1.5" fill="var(--accent)" />
                <circle cx="100" cy="5" r="1.5" fill="var(--accent)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [6, -6]);
  const rotateY = useTransform(springX, [-300, 300], [-6,  6]);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth  / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  const titleWords = ["Engineering", "Digital", "Excellence"];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: "var(--bg)" }}
    >
      {/* Grid bg parallax */}
      <motion.div className="absolute inset-0 grid-bg pointer-events-none" style={{ y: bgY, opacity: 0.6 }} />

      {/* Glowing orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600, top: "-10%", left: "-10%",
            background: "radial-gradient(circle, rgba(200,149,107,0.18) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500, bottom: "0%", right: "-5%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">

          {/* ── LEFT: Text ── */}
          <motion.div style={{ y: textY }} className="flex flex-col justify-center">

            {/* Status pill */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit mb-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(200,149,107,0.4)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Now Accepting Client Projects</span>
            </motion.div>

            {/* Big title */}
            <div className="mb-5">
              {titleWords.map((word, i) => (
                <div key={word} style={{ overflow: "hidden", display: "block" }}>
                  <motion.span
                    className="block font-display font-bold"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 7rem)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      color: i === 1 ? "transparent" : "var(--text-primary)",
                      WebkitTextStroke: i === 1 ? "1.5px var(--accent)" : "none",
                      fontStyle: i === 2 ? "italic" : "normal",
                    }}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Animated role ticker */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            >
              <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
              <div className="h-7 overflow-hidden relative" style={{ minWidth: "280px" }}>
                {roles.map((role, i) => (
                  <motion.span
                    key={role}
                    className="absolute left-0 text-sm font-mono tracking-wide"
                    style={{ color: "var(--accent)" }}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{
                      y: i === roleIndex ? 0 : i < roleIndex ? -28 : 28,
                      opacity: i === roleIndex ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {role}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base leading-relaxed mb-10 max-w-md"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            >
              We engineer high-performance web applications, custom API systems, and mobile solutions with a sharp eye for design. From SaaS dashboards to enterprise platforms — we build scalable digital systems that businesses trust.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
            >
              <a
                href="#projects"
                className="group relative flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-sm overflow-hidden transition-transform duration-300 hover:scale-105"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                <span>Explore Projects</span>
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-accent)";
                  el.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text-primary)";
                }}
              >
                Request Proposal ↗
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            >
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Follow</span>
              <div className="w-8 h-px" style={{ background: "var(--border)" }} />
              {[
                { icon: Github,   href: "https://github.com/19jayaprakash"   },
                { icon: Linkedin, href: "https://linkedin.com/in/jayaprakash-r-218968310" },
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--accent)";
                    el.style.borderColor = "var(--border-accent)";
                    el.style.background = "rgba(200,149,107,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--text-muted)";
                    el.style.borderColor = "var(--border)";
                    el.style.background = "rgba(255,255,255,0.05)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Interactive Dashboard Mockup Panel ── */}
          <motion.div
            style={{ y: imageY }}
            className="flex items-center justify-center relative w-full lg:w-auto"
          >
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
              className="relative flex flex-col items-center w-full"
            >
              {/* Sleek dashboard mockup */}
              <DashboardMockup />
            </motion.div>
          </motion.div>
        </div>

     
      </motion.div>

      {/* Vertical sidebar label */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)", opacity: 0.35 }}>
          Portfolio · 2026
        </span>
        <div className="w-px h-16" style={{ background: "var(--border)" }} />
      </div>
    </section>
  );
}