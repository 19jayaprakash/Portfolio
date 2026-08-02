"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useDataRefresh } from "@/lib/useDataRefresh";

function ServiceCard({ service, index }: { service: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accentColor = service.accent || "#C8956B";
  const badgeText = service.badge || (service.title ? service.title.toUpperCase() : "SERVICE");
  
  // Default fallback images matching the 4 core services
  const defaultImages = [
    "/images/service_fullstack.jpg",
    "/images/service_uiux.jpg",
    "/images/service_mobile.jpg",
    "/images/service_ecommerce.jpg"
  ];
  const imageUrl = service.image || defaultImages[index % defaultImages.length];
  const tagsList = service.tags || [];

  return (
    <div
      className="sticky mb-12 md:mb-20"
      style={{
        top: `calc(100px + ${index * 32}px)`,
        zIndex: index + 1,
      }}
    >
      <div
        className="group relative rounded-3xl md:rounded-[36px] overflow-hidden cursor-pointer flex flex-col justify-between min-h-[400px] sm:min-h-[460px] md:min-h-[500px] p-6 sm:p-10 md:p-14 shadow-2xl transition-all duration-500"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.12)",
          background: "#0c0b0a",
          boxShadow: `0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 40px -10px ${accentColor}25`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          if (service.linkUrl) {
            window.location.href = service.linkUrl;
          } else {
            window.location.href = "/projects";
          }
        }}
      >
        {/* Background UI preview image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={service.title}
            className={`w-full h-full object-cover object-center opacity-40 transition-transform duration-700 filter contrast-125 brightness-90 ${hovered ? 'scale-105' : 'scale-100'}`}
          />
          {/* Dark vignette overlay matching user screenshot */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(12,11,10,0.65) 0%, rgba(12,11,10,0.85) 45%, rgba(12,11,10,0.98) 100%)",
            }}
          />
          {/* Hover accent glow */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: `radial-gradient(circle at 80% 90%, ${accentColor}35 0%, transparent 65%)`,
            }}
          />
        </div>

        {/* Top bar with category badge & action link */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-8 md:mb-12">
          <span 
            className="text-[11px] md:text-xs font-mono font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-white/20 text-white backdrop-blur-md"
            style={{ background: "rgba(255, 255, 255, 0.12)" }}
          >
            {badgeText}
          </span>

          {service.linkText && (
            <span
              className="text-[11px] md:text-xs font-mono font-bold text-white flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md"
            >
              {service.linkText}
            </span>
          )}
        </div>

        {/* Main card body */}
        <div className="relative z-10 space-y-4 md:space-y-6 max-w-4xl">
          {/* Main Title */}
          <h3 
            className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[1.05] group-hover:text-amber-400 transition-colors"
          >
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed font-normal max-w-3xl">
            {service.desc || service.description}
          </p>

          {/* Bottom row: Tags and circular accent arrow button */}
          <div className="pt-4 flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {tagsList.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[11px] md:text-xs font-mono px-3.5 py-1 rounded-full border border-white/15 text-neutral-200 bg-white/10 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Floating accent circle button */}
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-2xl transition-transform duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}
              style={{ background: accentColor }}
            >
              <ArrowUpRight size={24} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const defaultServices = [
    {
      id: "1",
      number: "01",
      badge: "FULL-STACK DEV",
      title: "Full-Stack Development",
      desc: "End-to-end web applications built with modern stacks. From architecture to deployment, I handle everything with precision.",
      icon: "Code2",
      image: "/images/service_fullstack.jpg",
      tags: ["React", "Next.js", "Node.js", "Java", "MySQL"],
      accent: "#C8956B",
      glow: "rgba(200,149,107,0.3)",
      linkText: "",
      linkUrl: "/projects"
    },
    {
      id: "2",
      number: "02",
      badge: "UI/UX DESIGN",
      title: "UI/UX Design",
      desc: "Beautiful, intuitive interfaces crafted in Figma. Research, wireframing, and pixel-perfect prototypes.",
      icon: "Palette",
      image: "/images/service_uiux.jpg",
      tags: ["Figma", "Prototyping", "Design Systems"],
      accent: "#EC4899",
      glow: "rgba(236,72,153,0.3)",
      linkText: "",
      linkUrl: "/projects"
    },
    {
      id: "3",
      number: "03",
      badge: "MOBILE APP DEV",
      title: "Mobile App Development",
      desc: "Cross-platform mobile applications built with React Native and Expo for iOS and Android with native performance.",
      icon: "Smartphone",
      image: "/images/service_mobile.jpg",
      tags: ["React Native", "Expo", "iOS", "Android"],
      accent: "#6366F1",
      glow: "rgba(99,102,241,0.3)",
      linkText: "",
      linkUrl: "/projects"
    },
    {
      id: "4",
      number: "04",
      badge: "E-COMMERCE SOLUTIONS",
      title: "E-Commerce Solutions",
      desc: "A sleek, conversion-focused e-commerce application featuring intuitive product discovery, visual filter systems, instant checkout flow, wishlist management, and detailed product showcase layouts.",
      icon: "ShoppingCart",
      image: "/images/service_ecommerce.jpg",
      tags: ["Figma", "Next.js", "Stripe", "Prototyping"],
      accent: "#F59E0B",
      glow: "rgba(245,158,11,0.3)",
      linkText: "",
      linkUrl: "/projects"
    }
  ];

  const [services, setServices] = useState<any[]>(defaultServices);

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          const list = Array.isArray(result.data.services) 
            ? result.data.services 
            : (result.data.services?.items || []);
          if (list && list.length > 0) {
            setServices(list);
          }
        }
      })
      .catch(err => {
        console.error("Error loading services:", err);
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
      className="py-24 md:py-36 px-6 md:px-12 relative"
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
              Services
            </motion.span>
            <motion.h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.9, color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            >
              What We{" "}
              <em style={{ color: "var(--accent)" }}>offer</em>
            </motion.h2>
          </div>
          <motion.p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          >
            Comprehensive digital services from concept to launch. Production-grade software applications built to scale.
          </motion.p>
        </div>

        {/* Full-width Vertical Stack with Sticky Scroll Stacking Animation */}
        <div className="relative max-w-6xl mx-auto pb-24">
          {services.map((service, i) => (
            <ServiceCard key={service.id || service.number || i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}




