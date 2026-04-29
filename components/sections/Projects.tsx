"use client";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const categories = ["All", "Web App", "Mobile", "Design", "E-Commerce"];

const projects = [
  {
    id: 1,
    title: "Gk Cloud ",
    category: "Web App",
    desc: "Optimized landing pages, course modules, and admin dashboards to improve UI consistency,responsiveness, and loading performance.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "node.js", "razorpay"],
    color: "#22C55E",
    year: "2024",
    featured: true,
  },
  {
    id: 2,
    title: "MetaCognitive AI",
    category: "Web App",
    desc: "Built a modern EdTech platform with reusable UI components, animations, and mobile-first layouts.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "razorpay"],
    color: "#F59E0B",
    year: "2024",
    featured: true,
  },
  {
    id: 3,
    title: "VivaahAI Mobile",
    category: "Mobile",
    desc: "Developed a cross-platform mobile app for matchmaking with AI-driven compatibility scores, chat, and video features.",
    tags: ["React Native", "Expo", "Firebase", "Redux"],
    color: "#8B5CF6",
    year: "2024",
    featured: false,
  },
  {
    id: 4,
    title: "PHC - Medico Healthcare",
    category: "Product",
    desc: "Developed a healthcare web app with AI-assisted features such as smart appointment suggestions,automated record insights, and predictive reminders, along with patient and provider management tools.",
    tags: ["Next.js", "Node.js", "WebRTC", "MongoDB"],
    color: "#EC4899",
    year: "2025",
    featured: false,
  },
  {
    id: 5,
    title: "STU – AI-Powered Educational Assistant",
    category: "Design",
    desc: "Built AI-driven chatbots using NLP models to deliver personalized answers, automated doubt-clearing,study recommendations, and interactive learning assistance for students.",
    tags: ["Figma", "Illustrator", "Brand Strategy"],
    color: "#C8956B",
    year: "2023",
    featured: false,
  },
  {
    id: 6,
    title: "AI Marketing Agent – Growth Automation Tool",
    category: "Web App",
    desc: "Developed an AI-based automation platform for B2B lead generation (Apollo.io), campaign scheduling,workflow automation, and client management dashboards.",
    tags: ["Next.js", "AWS S3", "FFmpeg", "Stripe"],
    color: "#14B8A6",
    year: "2022",
    featured: false,
  },
];

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        gridColumn: project.featured && index < 2 ? "span 1" : "span 1",
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
    >
      {/* Color band */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      {/* Preview area */}
      <div
        className="h-48 flex items-center justify-center relative overflow-hidden"
        style={{ background: `${project.color}10` }}
      >
        <motion.div
          className="font-display font-bold opacity-10"
          style={{ fontSize: "8rem", color: project.color, lineHeight: 1 }}
          animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 3 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {project.title[0]}
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: `${project.color}20`, backdropFilter: "blur(4px)" }}
        >
          <a
            href="#"
            className="p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{ background: "var(--surface)", color: "var(--text-primary)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
          </a>
          <a
            href="#"
            className="p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{ background: "var(--surface)", color: "var(--text-primary)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={16} />
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="font-mono text-xs" style={{ color: project.color }}>
              {project.category} · {project.year}
            </span>
            <h3
              className="font-display font-bold text-xl mt-1"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0, color: hovered ? project.color : "var(--text-muted)" }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={20} style={{ color: "inherit" }} />
          </motion.div>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "var(--surface-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-32 md:py-48 px-6 md:px-12"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <motion.span
              className="font-mono text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              05 — Projects
            </motion.span>
            <motion.h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.95, color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Featured<br />
              <em style={{ color: "var(--accent)" }}>Work</em>
            </motion.h2>
          </div>

          {/* Category filter */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                style={{
                  background: activeCategory === cat ? "var(--accent)" : "var(--surface)",
                  color: activeCategory === cat ? "#fff" : "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            }}
          >
            View All Projects
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
