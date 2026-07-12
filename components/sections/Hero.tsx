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

const R = 120;

// Concentric circle paths for the 3D maze sphere
const MAZE_PATHS: { p1: { lat: number; lon: number }; p2: { lat: number; lon: number } }[] = [];

// Let's generate a reproducible maze pattern
for (let lat = -65; lat <= 65; lat += 13) {
  const latRad = (lat * Math.PI) / 180;
  const step = 15; // degrees
  for (let lon = 0; lon < 360; lon += step) {
    // Draw horizontal segment
    if (Math.sin(lat * 3 + lon * 2) > -0.2) {
      MAZE_PATHS.push({
        p1: { lat, lon },
        p2: { lat, lon: lon + step * 0.85 }
      });
    }
    // Draw vertical segment connecting to next latitude
    if (lat < 65 && Math.sin(lat * 2 + lon * 5) > 0.15) {
      MAZE_PATHS.push({
        p1: { lat, lon },
        p2: { lat: lat + 13, lon }
      });
    }
  }
}

// Pre-generate 3D wireframe rings
const RING_POINTS_1: { x: number; y: number; z: number }[] = [];
const RING_POINTS_2: { x: number; y: number; z: number }[] = [];
const ringRadius = R * 1.35;
for (let theta = 0; theta < 360; theta += 6) {
  const rad = (theta * Math.PI) / 180;
  // Ring 1 (tilted on Z)
  const p1 = { x: ringRadius * Math.cos(rad), y: 0, z: ringRadius * Math.sin(rad) };
  const tilt1 = (22 * Math.PI) / 180;
  RING_POINTS_1.push({
    x: p1.x * Math.cos(tilt1) - p1.y * Math.sin(tilt1),
    y: p1.x * Math.sin(tilt1) + p1.y * Math.cos(tilt1),
    z: p1.z
  });
  // Ring 2 (tilted other way)
  const p2 = { x: ringRadius * Math.cos(rad), y: 0, z: ringRadius * Math.sin(rad) };
  const tilt2 = (-38 * Math.PI) / 180;
  RING_POINTS_2.push({
    x: p2.x * Math.cos(tilt2) - p2.y * Math.sin(tilt2),
    y: p2.x * Math.sin(tilt2) + p2.y * Math.cos(tilt2),
    z: p2.z
  });
}

function latLonTo3D(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = lon * (Math.PI / 180);
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta)
  };
}

function rotatePoint(p: { x: number; y: number; z: number }, rx: number, ry: number) {
  let { x, y, z } = p;
  const y2 = y * Math.cos(rx) - z * Math.sin(rx);
  const z2 = y * Math.sin(rx) + z * Math.cos(rx);
  const x2 = x * Math.cos(ry) + z2 * Math.sin(ry);
  const z3 = -x * Math.sin(ry) + z2 * Math.cos(ry);
  return { x: x2, y: y2, z: z3 };
}

// ─── Interactive 3D Maze Sphere Canvas component ──────────────────────────────
function FuturisticSphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef({ rotY: 0, rotX: 0.15, velX: 0, velY: 0, drag: false, lastX: 0, lastY: 0 });
  const rafRef    = useRef<number>(0);
  const W = 460, H = 480;
  
  // Bubble particles
  const bubbles = useRef<Array<{ x: number; y: number; z: number; r: number; speed: number; phase: number }>>([]);
  if (bubbles.current.length === 0) {
    for (let i = 0; i < 15; i++) {
      bubbles.current.push({
        x: (Math.random() - 0.5) * 160,
        y: Math.random() * 260 - 130,
        z: (Math.random() - 0.5) * 160,
        r: 2.5 + Math.random() * 5,
        speed: 0.4 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { rotX, rotY } = stateRef.current;

    ctx.clearRect(0, 0, W, H);
    
    const baseX = W / 2;
    const baseY = H - 55;
    const radX = 120;
    const radY = 28;
    const thickness = 16;

    // Draw bottom cylinder pedestal
    ctx.beginPath();
    ctx.ellipse(baseX, baseY + thickness, radX, radY, 0, 0, Math.PI);
    ctx.lineTo(baseX - radX, baseY);
    ctx.ellipse(baseX, baseY, radX, radY, 0, Math.PI, 0);
    ctx.lineTo(baseX + radX, baseY + thickness);
    ctx.fillStyle = "rgba(220, 220, 220, 0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw pedestal top ellipse
    ctx.beginPath();
    ctx.ellipse(baseX, baseY, radX, radY, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Draw glowing emitter core
    ctx.beginPath();
    ctx.ellipse(baseX, baseY, radX * 0.7, radY * 0.7, 0, 0, Math.PI * 2);
    const coreGrad = ctx.createRadialGradient(baseX, baseY, 0, baseX, baseY, radX * 0.7);
    coreGrad.addColorStop(0, "rgba(200, 149, 107, 0.95)"); // deep orange
    coreGrad.addColorStop(0.4, "rgba(200, 149, 107, 0.3)");
    coreGrad.addColorStop(1, "rgba(200, 149, 107, 0)");
    ctx.fillStyle = coreGrad;
    ctx.fill();

    // Draw upward light cone
    const coneHeight = 280;
    const coneGrad = ctx.createLinearGradient(baseX, baseY, baseX, baseY - coneHeight);
    coneGrad.addColorStop(0, "rgba(200, 149, 107, 0.18)");
    coneGrad.addColorStop(1, "rgba(200, 149, 107, 0)");
    ctx.beginPath();
    ctx.moveTo(baseX - radX * 0.8, baseY);
    ctx.lineTo(baseX - radX * 0.4, baseY - coneHeight);
    ctx.lineTo(baseX + radX * 0.4, baseY - coneHeight);
    ctx.lineTo(baseX + radX * 0.8, baseY);
    ctx.closePath();
    ctx.fillStyle = coneGrad;
    ctx.fill();

    const sphereX = W / 2;
    const sphereY = H / 2 - 20;

    // Update and draw floating bubbles (ordered back-to-front by projected Z)
    const mappedBubbles = bubbles.current.map((b) => {
      b.y -= b.speed;
      b.phase += 0.015;
      const wiggleX = b.x + Math.sin(b.phase) * 16;
      if (b.y < -200) {
        b.y = 130;
        b.x = (Math.random() - 0.5) * 160;
      }
      const p3 = { x: wiggleX, y: b.y, z: b.z };
      const rot = rotatePoint(p3, rotX, rotY);
      return { rot, r: b.r };
    }).sort((a, b) => a.rot.z - b.rot.z);

    mappedBubbles.forEach((b) => {
      const px = sphereX + b.rot.x;
      const py = sphereY - b.rot.y;
      const scale = 1.0 + b.rot.z / R;
      const br = Math.max(1, b.r * scale);
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, br, 0, Math.PI * 2);
      
      const bGrad = ctx.createRadialGradient(px - br/3, py - br/3, br/10, px, py, br);
      bGrad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      bGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.2)");
      bGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      
      ctx.fillStyle = bGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();
    });

    // Render 3D Wireframe Rings (draw back segments, z < 0)
    const drawRingSegments = (points: { x: number; y: number; z: number }[], drawFront: boolean) => {
      ctx.save();
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        const r1 = rotatePoint(p1, rotX, rotY);
        const r2 = rotatePoint(p2, rotX, rotY);
        const avgZ = (r1.z + r2.z) / 2;

        const isFrontSegment = avgZ >= 0;
        if (isFrontSegment !== drawFront) continue;

        const px1 = sphereX + r1.x;
        const py1 = sphereY - r1.y;
        const px2 = sphereX + r2.x;
        const py2 = sphereY - r2.y;

        const opacity = 0.05 + ((avgZ + ringRadius) / (2 * ringRadius)) * 0.35;
        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      ctx.restore();
    };

    // Draw back of rings
    drawRingSegments(RING_POINTS_1, false);
    drawRingSegments(RING_POINTS_2, false);

    // Render 3D Maze Sphere (sort and project paths)
    const mappedPaths = MAZE_PATHS.map((p) => {
      const pt1_3d = latLonTo3D(p.p1.lat, p.p1.lon, R);
      const pt2_3d = latLonTo3D(p.p2.lat, p.p2.lon, R);
      const r1 = rotatePoint(pt1_3d, rotX, rotY);
      const r2 = rotatePoint(pt2_3d, rotX, rotY);
      return { r1, r2, avgZ: (r1.z + r2.z) / 2 };
    }).sort((a, b) => a.avgZ - b.avgZ);

    mappedPaths.forEach((path) => {
      const px1 = sphereX + path.r1.x;
      const py1 = sphereY - path.r1.y;
      const px2 = sphereX + path.r2.x;
      const py2 = sphereY - path.r2.y;

      const opacity = 0.03 + ((path.avgZ + R) / (2 * R)) * 0.92;
      const lw = 0.5 + ((path.avgZ + R) / (2 * R)) * 1.5;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px2, py2);

      // Highlight colors: pure white for front, soft white for sides
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = lw;
      
      if (path.avgZ > R * 0.5) {
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
      }

      ctx.stroke();
      ctx.restore();
    });

    // Draw front of rings (overlaying the sphere)
    drawRingSegments(RING_POINTS_1, true);
    drawRingSegments(RING_POINTS_2, true);

  }, [W, H]);

  useEffect(() => {
    const loop = () => {
      const s = stateRef.current;
      if (!s.drag) {
        s.rotY += 0.0035 + s.velX * 0.015;
        s.rotX += s.velY * 0.015;
        s.velX *= 0.94;
        s.velY *= 0.94;
        s.rotX  = Math.max(-0.4, Math.min(0.4, s.rotX));
      }
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  // Handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;

    const onDown = (e: MouseEvent) => { s.drag = true; s.lastX = e.clientX; s.lastY = e.clientY; s.velX = 0; s.velY = 0; };
    const onMove = (e: MouseEvent) => {
      if (!s.drag) return;
      s.velX = (e.clientX - s.lastX) * 0.35;
      s.velY = (e.clientY - s.lastY) * 0.35;
      s.rotY += (e.clientX - s.lastX) * 0.005;
      s.rotX += (e.clientY - s.lastY) * 0.005;
      s.rotX  = Math.max(-0.4, Math.min(0.4, s.rotX));
      s.lastX = e.clientX;
      s.lastY = e.clientY;
    };
    const onUp = () => { s.drag = false; };

    const onTouchStart = (e: TouchEvent) => { s.drag = true; s.lastX = e.touches[0].clientX; s.lastY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      if (!s.drag) return;
      s.rotY += (e.touches[0].clientX - s.lastX) * 0.005;
      s.rotX += (e.touches[0].clientY - s.lastY) * 0.005;
      s.rotX  = Math.max(-0.4, Math.min(0.4, s.rotX));
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
      style={{ cursor: "grab", width: "100%", maxWidth: W, height: "auto" }}
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
      className="relative min-h-screen overflow-hidden flex items-center bg-[#0B0A0A]"
    >
      {/* Grid bg parallax */}
      <motion.div className="absolute inset-0 grid-bg pointer-events-none opacity-20" style={{ y: bgY }} />

      {/* Split background: dark vertical banner on right */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[47%] bg-[#121212] border-l border-white/5 hidden lg:block z-0" />

      {/* Large vertical poster text "PEAK" */}
      <div 
        className="absolute right-12 top-1/2 -translate-y-1/2 select-none pointer-events-none font-bold uppercase text-[15vw] leading-none text-white/[0.015] z-0 hidden lg:block"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          writingMode: "vertical-rl",
          letterSpacing: "0.1em",
        }}
      >
        PEAK
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12"
      >
        <div className="grid lg:grid-cols-[53%_47%] gap-8 md:gap-12 items-center min-h-[85vh]">

          {/* ── LEFT: Text ── */}
          <motion.div style={{ y: textY }} className="flex flex-col justify-center relative z-10">

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
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" style={{ boxShadow: "0 0 8px #22C55E" }} />
              <span className="text-xs font-mono text-[var(--text-muted)]">Now Accepting Client Projects</span>
            </motion.div>

            {/* Big title */}
            <div className="mb-5">
              {titleWords.map((word, i) => (
                <div key={word} style={{ overflow: "hidden", display: "block" }}>
                  <motion.span
                    className="block font-display font-bold"
                    style={{
                      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
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
              <div className="w-8 h-px bg-[var(--accent)]" />
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
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">Follow</span>
              <div className="w-8 h-px bg-[var(--border)]" />
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

          {/* ── RIGHT: Interactive 3D Maze Sphere Panel ── */}
          <motion.div
            style={{ y: imageY }}
            className="flex items-center justify-center relative w-full lg:w-auto z-10"
          >
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
              className="relative flex flex-col items-center w-full"
            >
              {/* Pedestal & Sphere Canvas */}
              <FuturisticSphereCanvas />

              {/* Chart glass overlay card */}
              <motion.div
                className="absolute top-10 right-4 p-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg w-44 pointer-events-none"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-[10px] font-mono text-neutral-400 mb-2">Analyzing Signal...</div>
                <svg className="w-full h-12 overflow-visible" viewBox="0 0 100 40">
                  <path
                    d="M0,30 Q15,10 30,25 T60,15 T90,5"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                  <circle cx="90" cy="5" r="3" fill="var(--accent)" />
                </svg>
              </motion.div>

              {/* Telemetry log glass overlay card */}
              <motion.div
                className="absolute bottom-10 left-4 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg w-48 font-mono text-[9px] text-neutral-400 pointer-events-none"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="flex justify-between border-b border-white/5 pb-1 mb-1 text-[8px] text-amber-500 font-bold">
                  <span>SYSTEM STATUS</span>
                  <span>ONLINE</span>
                </div>
                <div className="space-y-0.5">
                  <div>&gt; CORE SPEED: OPTIMAL</div>
                  <div>&gt; SECURE LAYER: ENABLED</div>
                  <div>&gt; OPTIMIZATION: 99.9%</div>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        </div>

      </motion.div>

      {/* Services down-indicator */}
      <div className="absolute left-6 md:left-12 bottom-6 z-20 flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest pointer-events-auto">
        <a href="#services" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 font-mono">
          Services <ArrowDown size={12} className="animate-bounce" />
        </a>
      </div>

      {/* Vertical sidebar label */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-10"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-500 opacity-60">
          Aeropeak · 2026
        </span>
        <div className="w-px h-16 bg-neutral-700" />
      </div>
    </section>
  );
}