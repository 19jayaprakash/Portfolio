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
  const featuresList = service.features || [];

  return (
    <div
      className="sticky mb-8 last:mb-0"
      style={{
        top: `calc(90px + ${index * 30}px)`,
        zIndex: index + 1,
      }}
    >
      <div
        className="group relative rounded-3xl md:rounded-[36px] overflow-hidden cursor-pointer flex flex-col justify-between min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] p-8 sm:p-12 md:p-16 transition-all duration-300"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.12)",
          background: "#0c0b0a",
          boxShadow: "none",
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
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={imageUrl}
            alt={service.title}
            className={`w-full h-full object-cover object-center opacity-30 transition-transform duration-700 filter contrast-125 brightness-90 ${hovered ? 'scale-105' : 'scale-100'}`}
          />
          {/* Dark vignette overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(12,11,10,0.7) 0%, rgba(12,11,10,0.88) 50%, rgba(12,11,10,0.98) 100%)",
            }}
          />
        </div>

        {/* Top bar with category badge & action link */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-4 md:mb-6">
          <span 
            className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/20 text-white backdrop-blur-md"
            style={{ background: "rgba(255, 255, 255, 0.12)" }}
          >
            {badgeText}
          </span>

          {service.linkText && (
            <span
              className="text-[11px] font-mono font-bold text-white flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md"
            >
              {service.linkText}
            </span>
          )}
        </div>

        {/* Main card body */}
        <div className="relative z-10 space-y-3 md:space-y-4 max-w-4xl">
          {/* Main Title */}
          <h3 
            className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight leading-[1.05] group-hover:text-amber-400 transition-colors"
          >
            {service.title}
          </h3>

          {/* Detailed Description */}
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal max-w-3xl">
            {service.desc || service.description}
          </p>

          {/* Key Capabilities / Features Bullets */}
          {featuresList.length > 0 && (
            <div className="pt-1 flex flex-wrap gap-2">
              {featuresList.map((feat: string, fIdx: number) => (
                <div key={fIdx} className="flex items-center gap-1.5 text-[11px] md:text-xs font-mono text-neutral-300 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
                  {feat}
                </div>
              ))}
            </div>
          )}

          {/* Bottom row: Tech Tags and circular accent arrow button */}
          <div className="pt-2 flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {tagsList.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] md:text-[11px] font-mono px-3 py-1 rounded-full border border-white/15 text-neutral-200 bg-white/10 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Floating accent circle button */}
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-md transition-transform duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}
              style={{ background: accentColor }}
            >
              <ArrowUpRight size={20} strokeWidth={2.5} />
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
      badge: "FULL-STACK DEVELOPMENT",
      title: "Full-Stack Web Development",
      desc: "End-to-end web applications built with modern architectures. From complex relational & document database modeling to high-speed serverless deployment, I engineer production-grade web platforms with seamless real-time data pipelines and robust security.",
      icon: "Code2",
      image: "/images/service_fullstack.jpg",
      features: [
        "Custom Web Applications",
        "RESTful & GraphQL APIs",
        "Database Architecture & Supabase",
        "Serverless Cloud Infrastructure",
        "Authentication & OAuth Security"
      ],
      tags: ["React", "Next.js", "Node.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
      accent: "#C8956B",
      glow: "rgba(200,149,107,0.3)",
      linkText: "",
      linkUrl: "/projects"
    },
    {
      id: "2",
      number: "02",
      badge: "UI/UX DESIGN",
      title: "UI/UX Design & Product Systems",
      desc: "Beautiful, conversion-oriented digital product design. Crafting intuitive user journeys, wireframes, interactive high-fidelity Figma prototypes, comprehensive design systems, color tokens, and micro-animations tailored for web & mobile apps.",
      icon: "Palette",
      image: "/images/service_uiux.jpg",
      features: [
        "Figma Design Systems & UI Kits",
        "Wireframing & High-Fidelity Prototypes",
        "User Research & Journey Mapping",
        "Micro-Interactions & Motion Specs",
        "WCAG Accessibility Standards"
      ],
      tags: ["Figma", "Prototyping", "Design Systems", "User Research", "Wireframing", "Micro-Interactions"],
      accent: "#EC4899",
      glow: "rgba(236,72,153,0.3)",
      linkText: "",
      linkUrl: "/projects"
    },
    {
      id: "3",
      number: "03",
      badge: "MOBILE APP DEVELOPMENT",
      title: "Cross-Platform Mobile App Development",
      desc: "Native-quality mobile applications for iOS and Android engineered with React Native and Expo. Seamless native device hardware integrations, offline-first storage pipelines, smooth 60fps animations, push notifications, and App Store / Google Play publishing.",
      icon: "Smartphone",
      image: "/images/service_mobile.jpg",
      features: [
        "Cross-Platform iOS & Android Apps",
        "React Native & Expo Ecosystem",
        "Offline-First & Local DB Caching",
        "Push Notifications & Camera/GPS",
        "App Store & Play Store Publishing"
      ],
      tags: ["React Native", "Expo", "iOS", "Android", "Redux Toolkit", "SQLite", "Push API"],
      accent: "#6366F1",
      glow: "rgba(99,102,241,0.3)",
      linkText: "",
      linkUrl: "/projects"
    },
    {
      id: "4",
      number: "04",
      badge: "E-COMMERCE SOLUTIONS",
      title: "E-Commerce & Digital Storefronts",
      desc: "High-performance e-commerce platforms engineered to maximize conversions. Featuring intuitive catalog browsing, instant multi-faceted filter search, multi-currency Stripe payment gateway integration, wishlist management, cart checkout optimization, and automated inventory sync.",
      icon: "ShoppingCart",
      image: "/images/service_ecommerce.jpg",
      features: [
        "Custom High-Speed Storefronts",
        "Stripe & Multi-Currency Payment Checkout",
        "Faceted Filtering & Product Search",
        "Cart & Wishlist Systems",
        "Order Management & Analytics"
      ],
      tags: ["Next.js", "Stripe", "Figma", "Prototyping", "Cart Checkout", "Shopify API"],
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
      className="py-16 md:py-24 px-6 md:px-12 relative"
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
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
        <div className="relative max-w-6xl mx-auto">
          {services.map((service, i) => (
            <ServiceCard key={service.id || service.number || i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}




