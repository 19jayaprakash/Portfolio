"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProjectsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          setData(result.data);
        }
        loading && setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects page data:", err);
        setLoading(false);
      });
  }, [loading]);

  const getProjectsList = useCallback(() => {
    if (!data) return [];
    
    // Normalize Featured Projects
    const featuredList = (data.projects?.items || data.projects || []).map((p: any) => ({
      id: String(p.id),
      title: p.title || "Untitled Project",
      desc: p.description || p.desc || "",
      category: p.category || "Web App",
      tags: p.tags || [],
      color: p.color || "#C8956B",
      year: p.year || "2024",
      image: p.image || "",
      github: p.github || "",
      live: p.live || "",
      duration: p.duration || "",
      featured: !!p.featured,
      type: "Featured"
    }));

    // Normalize Freelance Projects
    const freelanceList = (data.freelance?.projects || data.freelance?.items || []).map((p: any) => ({
      id: String(p.id),
      title: p.title || "Untitled Freelance",
      desc: p.desc || p.description || "",
      category: p.category || "Freelance",
      tags: p.tags || [],
      color: p.color || "#6366F1",
      year: p.year || "2024",
      image: p.image || "",
      github: p.github || "",
      live: p.live || "",
      duration: p.duration || "",
      client: p.client || "",
      featured: false,
      type: "Freelance"
    }));

    return [...featuredList, ...freelanceList];
  }, [data]);

  const allProjects = getProjectsList();
  
  // Dynamic categories list
  const categories = ["All", "Featured", "Freelance", "Web App", "Mobile", "Design", "E-Commerce"];

  // Filter projects by active tab and search query
  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeCategory === "All") return matchesSearch;
    if (activeCategory === "Featured") return p.featured && matchesSearch;
    if (activeCategory === "Freelance") return p.type === "Freelance" && matchesSearch;
    return p.category.toLowerCase() === activeCategory.toLowerCase() && matchesSearch;
  });

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: "var(--bg)" }}>
      <Navbar />

      <main className="pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="mb-10 md:mb-16 space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase block" style={{ color: "var(--accent)" }}>
            Showcase
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-none" style={{ color: "var(--text-primary)" }}>
            All <em style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontStyle: "italic" }}>Projects</em>
          </h1>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            A comprehensive archive of design works, mobile apps, e-commerce storefronts, and full-stack software interfaces.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div 
          className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 p-3 rounded-2xl border backdrop-blur-md transition-colors"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {/* Categories Tab Swiper */}
          <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all"
                style={{
                  background: activeCategory === cat ? "var(--accent)" : "transparent",
                  color: activeCategory === cat ? "var(--bg)" : "var(--text-secondary)",
                  border: activeCategory === cat ? "1px solid var(--accent)" : "1px solid transparent"
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search project keys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all duration-300 border"
              style={{ 
                background: "var(--surface-elevated)", 
                color: "var(--text-primary)", 
                borderColor: "var(--border)" 
              }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: "var(--border)" }} />
            <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Loading Archive...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div 
            className="py-24 text-center border rounded-3xl space-y-2"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <SlidersHorizontal size={24} className="mx-auto mb-2" style={{ color: "var(--text-muted)" }} />
            <h3 className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>No Projects Discovered</h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Try modifying your filter categories or query term.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Normalized project card linking to dynamic route
function ProjectCard({ project, index }: { project: any; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-colors duration-300"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      onClick={() => {
        window.location.href = `/project/${project.id}`;
      }}
    >
      <div>
        {/* Color stripe */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />

        {/* Visual Mock / Thumbnail */}
        <div
          className="h-44 flex items-center justify-center relative overflow-hidden"
          style={{ background: `${project.color}08` }}
        >
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <motion.div
              className="font-display font-bold opacity-[0.04]"
              style={{ fontSize: "6rem", color: project.color, lineHeight: 1 }}
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.4 }}
            >
              {project.title[0]}
            </motion.div>
          )}

          <div className="absolute top-4 left-4 flex gap-1.5">
            <span 
              className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded border"
              style={{ background: "var(--surface)", color: "var(--text-primary)", borderColor: "var(--border)" }}
            >
              {project.type}
            </span>
          </div>

          {/* Hover Arrow Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: `rgba(0,0,0,0.25)`, backdropFilter: "blur(3px)" }}
          >
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold shadow-xl transition-colors"
              style={{ background: "var(--text-primary)", color: "var(--bg)" }}
            >
              <span>View Case Study</span>
              <ArrowUpRight size={12} strokeWidth={2.5} />
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-6">
          <span className="font-mono text-[10px] uppercase tracking-wider font-bold" style={{ color: project.color }}>
            {project.category} · {project.year}
          </span>
          <h3 className="font-display font-bold text-lg mt-1 group-hover:text-amber-500 transition-colors" style={{ color: "var(--text-primary)" }}>
            {project.title}
          </h3>
          <p className="text-xs mt-2 line-clamp-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.desc}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full font-mono border"
              style={{ 
                background: "var(--surface-elevated)", 
                color: "var(--text-muted)", 
                borderColor: "var(--border)" 
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
