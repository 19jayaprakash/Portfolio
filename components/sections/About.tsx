"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Code2, Palette, Zap, Globe } from "lucide-react";
import Image from "next/image";
import { useDataRefresh } from "@/lib/useDataRefresh";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"] },
  { category: "Design", items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "UI/UX"] },
  { category: "DevOps", items: ["Docker", "AWS", "Vercel", "CI/CD", "Linux"] },
];

const traits = [
  { icon: Code2, label: "Clean Code", desc: "Scalable, maintainable architecture" },
  { icon: Palette, label: "Design Eye", desc: "Pixel-perfect attention to detail" },
  { icon: Zap, label: "Performance", desc: "Optimized for speed & UX" },
  { icon: Globe, label: "Global Ready", desc: "i18n & accessibility first" },
];

// Cycle between the 2 standing cut-out PNG photos
const photos = [
  "/images/photo_pose1.png",
  "/images/photo_pose2.png",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activePhoto, setActivePhoto] = useState(0);
  
  const [aboutData, setAboutData] = useState<any>({
    title: "Turning ideas into",
    titleEmphasis: "digital reality",
    description1: "Led by our founders, we are a digital agency of expert engineers, designers, and strategists. We bridge creative design and cutting-edge engineering — creating high-performance digital products that are beautiful, intuitive, and built to scale.",
    description2: "Based in Coimbatore, Tamil Nadu — we partner with startups, agencies, and enterprises worldwide to design, build, and optimize software that drives growth."
  });

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.about) {
          setAboutData({
            title: result.data.about.title || "Turning ideas into",
            titleEmphasis: result.data.about.titleEmphasis || "digital reality",
            description1: result.data.about.description1 || "Led by our founders, we are a digital agency of expert engineers, designers, and strategists. We bridge creative design and cutting-edge engineering — creating high-performance digital products that are beautiful, intuitive, and built to scale.",
            description2: result.data.about.description2 || "Based in Coimbatore, Tamil Nadu — we partner with startups, agencies, and enterprises worldwide to design, build, and optimize software that drives growth."
          });
        }
      })
      .catch(err => console.error("Error fetching about data:", err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh when admin updates data
  useDataRefresh(fetchData);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const renderTitle = () => {
    return (
      <>
        {aboutData.title}{" "}
        {aboutData.titleEmphasis && (
          <em style={{ color: "var(--accent)" }}>{aboutData.titleEmphasis}</em>
        )}
      </>
    );
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle bg glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      {/* Section label */}
      <motion.div
        className="flex items-center gap-4 mb-20"
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
          01 — About
        </span>
        <div className="flex-1 max-w-xs h-px" style={{ background: "var(--border-accent)" }} />
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* LEFT: Photo collage */}
        <motion.div style={{ y: imageY }} className="relative">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Main large photo */}
            <div
              className="relative w-full max-w-[480px] mx-auto rounded-3xl overflow-hidden border-2 border-[var(--accent)]/30"
              style={{
                aspectRatio: "3/4",
                boxShadow: "0 40px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              {photos.map((src, i) => (
                <motion.div
                  key={src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ 
                    opacity: i === activePhoto ? 1 : 0, 
                    scale: i === activePhoto ? 1.15 : 0.95,
                    y: i === activePhoto ? 0 : 15
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <Image
                    src={src}
                    alt={`Profile photo ${i + 1}`}
                    fill
                    className="object-contain object-bottom"
                  />
                </motion.div>
              ))}
              {/* Bottom overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }}
              />
            </div>

            {/* Photo selector thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {photos.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className="transition-all duration-300 rounded-full overflow-hidden"
                  style={{
                    width: i === activePhoto ? "40px" : "8px",
                    height: "8px",
                    background: i === activePhoto ? "var(--accent)" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>

            {/* Dot grid decoration */}
            <div
              className="absolute -bottom-10 -left-10 w-28 h-28 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle, var(--accent) 1.5px, transparent 1.5px)`,
                backgroundSize: "12px 12px",
              }}
            />
          </motion.div>
        </motion.div>

        {/* RIGHT: Text content */}
        <motion.div style={{ y: textY }}>
          <motion.h2
            className="font-display mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1,
              color: "var(--text-primary)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {renderTitle()}
          </motion.h2>

          <motion.p
            className="text-base leading-relaxed mb-5"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {aboutData.description1}
          </motion.p>

          <motion.p
            className="text-base leading-relaxed mb-10"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            {aboutData.description2}
          </motion.p>

          {/* Traits — glass style */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {traits.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 group cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(10px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ background: "rgba(200,149,107,0.06)", borderColor: "rgba(200,149,107,0.25)" }}
              >
                <div className="p-2 rounded-lg mt-0.5" style={{ background: "var(--accent)", color: "#fff" }}>
                  <Icon size={13} />
                </div>
                <div>
                  <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{label}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills — glass tags */}
          <div className="grid grid-cols-2 gap-5">
            {skills.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + gi * 0.08 }}
              >
                <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 rounded-full transition-all duration-200 cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        color: "var(--text-secondary)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
