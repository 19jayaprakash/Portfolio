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

// ─── Globe canvas component ──────────────────────────────────────────────────
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef({ rotY: 0, rotX: 0.25, velX: 0, velY: 0, drag: false, lastX: 0, lastY: 0 });
  const rafRef    = useRef<number>(0);
  const W = 260, H = 260, R = 108;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { rotX, rotY } = stateRef.current;

    ctx.clearRect(0, 0, W, H);

    // Sphere glow
    const grd = ctx.createRadialGradient(W / 2 - 25, H / 2 - 25, 10, W / 2, H / 2, R);
    grd.addColorStop(0,   "rgba(200,149,107,0.07)");
    grd.addColorStop(0.5, "rgba(99,102,241,0.04)");
    grd.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, R, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.strokeStyle = "rgba(200,149,107,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Latitude dots
    DOTS.forEach((d) => {
      const p3 = latLonTo3D(d.lat, d.lon, R);
      const r  = rotatePoint(p3, rotX, rotY);
      if (r.z < -20) return;
      const px    = W / 2 + r.x;
      const py    = H / 2 - r.y;
      const alpha = 0.12 + ((r.z + R) / (2 * R)) * 0.5;
      const sz    = 0.7  + ((r.z + R) / (2 * R)) * 1.3;
      ctx.beginPath();
      ctx.arc(px, py, sz, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,149,107,${alpha})`;
      ctx.fill();
    });

    // Meridian lines (faint)
    for (let lon = 0; lon < 360; lon += 60) {
      ctx.beginPath();
      let first = true;
      for (let lat = -80; lat <= 80; lat += 5) {
        const p3 = latLonTo3D(lat, lon, R);
        const r  = rotatePoint(p3, rotX, rotY);
        if (r.z < 0) { first = true; continue; }
        const px = W / 2 + r.x;
        const py = H / 2 - r.y;
        if (first) { ctx.moveTo(px, py); first = false; } else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth   = 0.5;
      ctx.stroke();
    }

    // Tech nodes — sort back-to-front
    const mapped = TECH_NODES.map((t) => {
      const p3 = latLonTo3D(t.lat, t.lon, R);
      const rp = rotatePoint(p3, rotX, rotY);
      return { ...t, rp, px: W / 2 + rp.x, py: H / 2 - rp.y };
    }).sort((a, b) => a.rp.z - b.rp.z);

    mapped.forEach((t) => {
      if (t.rp.z < -10) return;
      const alpha = 0.35 + ((t.rp.z + R) / (2 * R)) * 0.65;
      const scale = 0.65 + ((t.rp.z + R) / (2 * R)) * 0.5;
      const nr    = 13 * scale;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Ring
      ctx.beginPath();
      ctx.arc(t.px, t.py, nr, 0, Math.PI * 2);
      ctx.fillStyle   = t.color + "1A";
      ctx.fill();
      ctx.strokeStyle = t.color + "99";
      ctx.lineWidth   = 0.8;
      ctx.stroke();

      // Centre dot
      ctx.beginPath();
      ctx.arc(t.px, t.py, 2.5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = t.color;
      ctx.fill();

      // Label
      const fs = Math.round(8.5 * scale);
      ctx.font      = `${fs}px monospace`;
      ctx.fillStyle = t.color;
      ctx.textAlign = "center";
      ctx.fillText(t.label, t.px, t.py + nr + 9 * scale);

      ctx.restore();
    });
  }, []);

  useEffect(() => {
    const loop = () => {
      const s = stateRef.current;
      if (!s.drag) {
        s.rotY += 0.004 + s.velX * 0.018;
        s.rotX += s.velY * 0.018;
        s.velX *= 0.93;
        s.velY *= 0.93;
        s.rotX  = Math.max(-0.6, Math.min(0.6, s.rotX));
      }
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  // Mouse / touch handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;

    const onDown = (e: MouseEvent) => { s.drag = true; s.lastX = e.clientX; s.lastY = e.clientY; s.velX = 0; s.velY = 0; };
    const onMove = (e: MouseEvent) => {
      if (!s.drag) return;
      s.velX = (e.clientX - s.lastX) * 0.45;
      s.velY = (e.clientY - s.lastY) * 0.45;
      s.rotY += (e.clientX - s.lastX) * 0.005;
      s.rotX += (e.clientY - s.lastY) * 0.005;
      s.rotX  = Math.max(-0.6, Math.min(0.6, s.rotX));
      s.lastX = e.clientX;
      s.lastY = e.clientY;
    };
    const onUp = () => { s.drag = false; };

    const onTouchStart = (e: TouchEvent) => { s.drag = true; s.lastX = e.touches[0].clientX; s.lastY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      if (!s.drag) return;
      s.rotY += (e.touches[0].clientX - s.lastX) * 0.006;
      s.rotX += (e.touches[0].clientY - s.lastY) * 0.006;
      s.rotX  = Math.max(-0.6, Math.min(0.6, s.rotX));
      s.lastX = e.touches[0].clientX;
      s.lastY = e.touches[0].clientY;
    };

    canvas.addEventListener("mousedown",   onDown);
    window.addEventListener("mousemove",   onMove);
    window.addEventListener("mouseup",     onUp);
    canvas.addEventListener("touchstart",  onTouchStart, { passive: true });
    canvas.addEventListener("touchmove",   onTouchMove,  { passive: true });
    canvas.addEventListener("touchend",    onUp);

    return () => {
      canvas.removeEventListener("mousedown",   onDown);
      window.removeEventListener("mousemove",   onMove);
      window.removeEventListener("mouseup",     onUp);
      canvas.removeEventListener("touchstart",  onTouchStart);
      canvas.removeEventListener("touchmove",   onTouchMove);
      canvas.removeEventListener("touchend",    onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="rounded-full z-10"
      style={{ cursor: "grab" }}
    />
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

          {/* ── RIGHT: 3D Interactive Globe Panel ── */}
          <motion.div
            style={{ y: imageY }}
            className="flex items-center justify-center relative"
          >
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
              className="relative flex flex-col items-center"
            >
              {/* Globe container with rings */}
              <div className="relative flex items-center justify-center" style={{ width: 340, height: 340 }}>

                {/* Animated rings */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(200,149,107,0.22)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute rounded-full"
                  style={{ inset: "-14px", border: "1px dashed rgba(99,102,241,0.18)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute rounded-full"
                  style={{ inset: "-28px", border: "1px solid rgba(99,102,241,0.09)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />

                {/* Outer glow */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: "-8px",
                    background: "radial-gradient(circle, rgba(200,149,107,0.10) 0%, transparent 70%)",
                    filter: "blur(16px)",
                  }}
                />

                {/* Canvas globe */}
                <GlobeCanvas />

                {/* ── Floating chips ── */}

                {/* Top — stack */}
                <motion.div
                  className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono z-20"
                  style={{
                    top: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(99,102,241,0.13)",
                    border: "1px solid rgba(99,102,241,0.38)",
                    color: "#a5b4fc",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 20px rgba(99,102,241,0.12)",
                    whiteSpace: "nowrap",
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Code2 size={11} style={{ color: "#a5b4fc", flexShrink: 0 }} />
                  Web, Mobile & Cloud Systems
                </motion.div>

                {/* Left — years */}
                <motion.div
                  className="absolute flex flex-col items-center rounded-2xl z-20"
                  style={{
                    left: "-56px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: "10px 14px",
                    background: "rgba(200,149,107,0.13)",
                    border: "1px solid rgba(200,149,107,0.42)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 4px 24px rgba(200,149,107,0.10)",
                    textAlign: "center",
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  whileHover={{ scale: 1.06 }}
                >
                  <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: "#c8956b" }}>5+</span>
                  <span style={{ fontSize: 10, color: "rgba(212,149,106,0.65)", marginTop: 3 }}>Yrs Delivery</span>
                </motion.div>

                {/* Right — projects */}
                <motion.div
                  className="absolute flex flex-col items-center rounded-2xl z-20"
                  style={{
                    right: "-56px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: "10px 14px",
                    background: "rgba(20,184,166,0.10)",
                    border: "1px solid rgba(20,184,166,0.32)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 4px 24px rgba(20,184,166,0.08)",
                    textAlign: "center",
                  }}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.06 }}
                >
                  <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: "#5eead4" }}>30+</span>
                  <span style={{ fontSize: 10, color: "rgba(94,234,212,0.65)", marginTop: 3 }}>Deployments</span>
                </motion.div>

                {/* Bottom — status */}
                <motion.div
                  className="absolute flex items-center gap-2 rounded-full text-xs font-mono z-20"
                  style={{
                    bottom: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "6px 12px",
                    background: "rgba(34,197,94,0.10)",
                    border: "1px solid rgba(34,197,94,0.30)",
                    color: "#86efac",
                    backdropFilter: "blur(12px)",
                    whiteSpace: "nowrap",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <motion.span
                    className="rounded-full"
                    style={{ width: 7, height: 7, background: "#22C55E", boxShadow: "0 0 6px #22C55E", flexShrink: 0, display: "inline-block" }}
                    animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  Available for Partnerships · 2026
                </motion.div>

                {/* Animated orbit dots on right edge */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 5, height: 5,
                      background: "var(--accent)",
                      right: "-2.1rem",
                      top: `${15 + i * 16}%`,
                    }}
                    animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
                  />
                ))}
              </div>

              {/* ── Skill tags ── */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 mt-12"
                style={{ maxWidth: 320 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {SKILL_TAGS.map((s, i) => (
                  <motion.span
                    key={s.label}
                    className="px-3 py-1 rounded-full text-[11px] font-medium"
                    style={{
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      color: s.text,
                    }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + i * 0.06 }}
                    whileHover={{ y: -2, scale: 1.04 }}
                  >
                    {s.label}
                  </motion.span>
                ))}
              </motion.div>

              {/* ── Stat cards ── */}
              <motion.div
                className="flex gap-3 mt-4 w-full"
                style={{ maxWidth: 320 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1 }}
              >
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.lbl}
                    className="flex-1 rounded-xl text-center"
                    style={{
                      padding: "10px 8px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 + i * 0.1 }}
                    whileHover={{ scale: 1.04 }}
                  >
                    <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1, color: "#c8956b" }}>{s.val}</div>
                    <div style={{ fontSize: 10, marginTop: 4, fontFamily: "monospace", letterSpacing: "0.04em", color: "rgba(255,255,255,0.38)" }}>
                      {s.lbl}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
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