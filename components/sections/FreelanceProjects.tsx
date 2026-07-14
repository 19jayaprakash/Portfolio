"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock, DollarSign, Star, CheckCircle, ExternalLink, Github } from "lucide-react";
import { useDataRefresh } from "@/lib/useDataRefresh";

export default function FreelanceProjects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const defaultFreelanceProjects = [
    { id: 1, client: "TechStart Inc", title: "SaaS Dashboard", desc: "Built a comprehensive analytics dashboard with real-time data visualization.", category: "Web App", tags: ["React", "Node.js", "Charts"], color: "#C8956B", rating: 5, duration: "3 months", budget: "₹ 15,000", status: "Completed" },
    { id: 2, client: "DesignHub", title: "E-Commerce Platform", desc: "Developed a full-featured online store with payment integration.", category: "E-Commerce", tags: ["Next.js", "Stripe", "Tailwind"], color: "#6366F1", rating: 5, duration: "2 months", budget: "₹ 12,000", status: "Completed" }
  ];

  const [freelanceProjects, setFreelanceProjects] = useState<any[]>(defaultFreelanceProjects);
  const [stats, setStats] = useState({ clients: "2+", revenue: "₹ 20,000 +", rating: "5.0" });

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.freelance) {
          setFreelanceProjects(result.data.freelance.projects || []);
          setStats(result.data.freelance.stats || stats);
        }
      })
      .catch(err => {
        console.error("Error loading freelance projects:", err);
        // Keep default freelance projects on error
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh when admin updates data
  useDataRefresh(fetchData);

  return (
    <section
      id="freelance"
      ref={ref}
      className="py-32 md:py-48 px-6 md:px-12"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.span
              className="font-mono text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              06 — Freelance
            </motion.span>
            <motion.h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.95, color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Freelance<br />
              <em style={{ color: "var(--accent)" }}>Projects</em>
            </motion.h2>
          </div>

          {/* Summary stats */}
          <motion.div
            className="flex gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center">
              <div
                className="font-display font-bold text-3xl"
                style={{ color: "var(--accent)" }}
              >
                {stats.clients}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Companies Served</div>
            </div>
            <div
              className="w-px h-12 self-center"
              style={{ background: "var(--border)" }}
            />
            <div className="text-center">
              <div
                className="font-display font-bold text-3xl"
                style={{ color: "var(--accent)" }}
              >
               {stats.revenue}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Revenue Generated</div>
            </div>
            <div
              className="w-px h-12 self-center"
              style={{ background: "var(--border)" }}
            />
            <div className="text-center">
              <div
                className="font-display font-bold text-3xl"
                style={{ color: "var(--accent)" }}
              >
                {stats.rating}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Avg. Rating</div>
            </div>
          </motion.div>
        </div>

        {/* Projects list */}
        <div className="space-y-4">
          {freelanceProjects.map((project, i) => (
            <motion.div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-400"
              style={{
                background: hoveredId === project.id ? "var(--surface)" : "var(--surface)",
                border: `1px solid ${hoveredId === project.id ? "var(--border-accent)" : "var(--border)"}`,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              {/* Accent left bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: project.color }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hoveredId === project.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                {/* Number + color indicator */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold"
                  style={{ background: `${project.color}20`, color: project.color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                      {project.client}
                    </span>
                    <span
                      className="hidden md:block text-xs"
                      style={{ color: "var(--border)" }}
                    >
                      /
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${project.color}20`, color: project.color }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <h3
                    className="font-display font-bold text-xl mb-2 transition-colors duration-300"
                    style={{ color: hoveredId === project.id ? project.color : "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-3 max-w-xl"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--surface-elevated)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {(project.live || project.github) && (
                    <div className="flex items-center gap-4 mt-4 relative z-20">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                          style={{ color: "var(--text-muted)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = project.color)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={13} />
                          <span>Live Site</span>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                          style={{ color: "var(--text-muted)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = project.color)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={13} />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    {[...Array(project.rating)].map((_, i) => (
                      <Star key={i} size={12} fill={project.color} style={{ color: project.color }} />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Clock size={12} />
                    {project.duration}
                  </div>
                  <div
                    className="flex items-center gap-1 text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.budget}
                  </div>
                  <div className="flex items-center gap-1 text-xs" style={{ color: "#22C55E" }}>
                    <CheckCircle size={12} />
                    {project.status}
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  className="hidden md:flex w-10 h-10 rounded-full items-center justify-center flex-shrink-0"
                  style={{
                    background: hoveredId === project.id ? project.color : "var(--surface-elevated)",
                    color: hoveredId === project.id ? "#fff" : "var(--text-muted)",
                  }}
                  animate={{ rotate: hoveredId === project.id ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight size={16} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Looking for a dedicated freelance developer for your next project?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Start a Project Together
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
