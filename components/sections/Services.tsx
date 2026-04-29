"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Palette, Smartphone, Globe, ShoppingCart, BarChart2, Layers, Shield } from "lucide-react";
import { useDataRefresh } from "@/lib/useDataRefresh";

const iconMap: any = {
  Code2,
  Palette,
  Smartphone,
  Globe,
  ShoppingCart,
  BarChart2,
  Layers,
  Shield
};

function ServiceCard({ service, index, inView }: { service: any; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const glow = service.accent + "20";

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        gridColumn: service.featured ? "span 2" : "span 1",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
    >
      {/* Glass background */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)`
            : `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
          backdropFilter: "blur(20px)",
          border: `1px solid ${hovered ? service.accent + "50" : "rgba(255,255,255,0.08)"}`,
        }}
      />

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${service.glow} 0%, transparent 60%)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
        animate={{ scaleX: hovered ? 1 : 0, originX: 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className={`relative z-10 p-7 ${service.featured ? "md:flex md:gap-10 md:items-start" : ""}`}>
        {/* Icon + number */}
        <div className={service.featured ? "md:flex-shrink-0" : ""}>
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: `${service.accent}18`,
                border: `1px solid ${service.accent}35`,
                color: service.accent,
              }}
              animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const IconComponent = iconMap[service.icon];
                return IconComponent ? <IconComponent size={22} /> : null;
              })()}
            </motion.div>
            <span
              className="font-mono text-xs opacity-30"
              style={{ color: "var(--text-primary)" }}
            >
              {service.number}
            </span>
          </div>

          <h3
            className="font-display font-bold mb-3 transition-colors duration-300"
            style={{
              fontSize: service.featured ? "clamp(1.5rem, 3vw, 2rem)" : "1.2rem",
              color: hovered ? service.accent : "var(--text-primary)",
              lineHeight: 1.1,
            }}
          >
            {service.title}
          </h3>
        </div>

        <div>
          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: "var(--text-secondary)" }}
          >
            {service.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full font-mono transition-all duration-300"
                style={{
                  background: hovered ? `${service.accent}15` : "rgba(255,255,255,0.05)",
                  color: hovered ? service.accent : "var(--text-muted)",
                  border: `1px solid ${hovered ? service.accent + "40" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow */}
      <motion.div
        className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-sm"
        style={{ background: `${service.accent}20`, color: service.accent }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
        transition={{ duration: 0.3 }}
      >
        →
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const defaultServices = [
    { icon: "Code2", number: "01", title: "Full-Stack Development", desc: "End-to-end web applications with modern stacks.", tags: ["React", "Next.js", "Node.js"], accent: "#C8956B", glow: "rgba(200,149,107,0.25)", featured: true },
    { icon: "Palette", number: "02", title: "UI/UX Design", desc: "Beautiful, intuitive interfaces crafted in Figma.", tags: ["Figma", "Prototyping"], accent: "#EC4899", glow: "rgba(236,72,153,0.2)", featured: false },
    { icon: "Smartphone", number: "03", title: "Mobile Development", desc: "Cross-platform mobile apps with React Native.", tags: ["React Native", "Expo"], accent: "#6366F1", glow: "rgba(99,102,241,0.2)", featured: false },
    { icon: "Globe", number: "04", title: "Web Performance", desc: "Optimize for Core Web Vitals and SEO.", tags: ["SEO", "Performance"], accent: "#14B8A6", glow: "rgba(20,184,166,0.2)", featured: false },
    { icon: "ShoppingCart", number: "05", title: "E-Commerce Solutions", desc: "Full-featured stores with Shopify or custom.", tags: ["Shopify", "Stripe"], accent: "#F59E0B", glow: "rgba(245,158,11,0.2)", featured: false },
    { icon: "Layers", number: "06", title: "Design Systems", desc: "Scalable component libraries.", tags: ["Storybook", "Tailwind"], accent: "#A78BFA", glow: "rgba(167,139,250,0.2)", featured: false },
    { icon: "Shield", number: "07", title: "Security & Auth", desc: "Authentication and security audits.", tags: ["OAuth", "JWT"], accent: "#F87171", glow: "rgba(248,113,113,0.2)", featured: false }
  ];

  const [services, setServices] = useState<any[]>(defaultServices);

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.services) {
          setServices(result.data.services);
        }
      })
      .catch(err => {
        console.error("Error loading services:", err);
        // Keep default services on error
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh when admin updates data
  useDataRefresh(fetchData);

  return (
    <section
      id="services"
      ref={ref}
      className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* BG decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(200,149,107,0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span
              className="font-mono text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            >
              02 — Services
            </motion.span>
            <motion.h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.9, color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            >
              What I{" "}
              <em style={{ color: "var(--accent)" }}>offer</em>
            </motion.h2>
          </div>
          <motion.p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          >
            Comprehensive digital services from concept to launch. Products that users love and businesses rely on.
          </motion.p>
        </div>

        {/* Glass grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
