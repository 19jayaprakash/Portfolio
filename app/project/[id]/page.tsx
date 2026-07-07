"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft, ArrowRight, Calendar, Clock, Monitor, Globe, ShieldAlert, Cpu, Sparkles, AlertCircle, Play, Eye } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          setData(result.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading project details:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0B0A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-xs font-mono tracking-widest text-neutral-500 uppercase">Loading Case Study...</p>
        </div>
      </div>
    );
  }

  // Gather and find the project by ID from both arrays
  const featuredList = data ? (data.projects?.items || data.projects || []) : [];
  const freelanceList = data ? (data.freelance?.projects || []) : [];
  const allProjects = [
    ...featuredList.map((p: any) => ({ ...p, type: "Featured" })),
    ...freelanceList.map((p: any) => ({ ...p, type: "Freelance" }))
  ];

  const project = allProjects.find((p: any) => String(p.id) === id);

  if (!project) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg)" }}>
        <Navbar />
        <div className="max-w-md mx-auto pt-48 pb-24 text-center space-y-6 px-6">
          <ShieldAlert size={48} className="mx-auto text-amber-500" />
          <h1 className="text-2xl font-display font-bold text-white">Project Not Found</h1>
          <p className="text-xs text-neutral-400">
            The project Case Study you are looking for does not exist or has been archived.
          </p>
          <button
            onClick={() => router.push("/projects")}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold bg-white text-black hover:scale-105 transition-transform"
          >
            <ArrowLeft size={14} /> Back to Projects
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const projectColor = project.color || "#C8956B";

  // Static/dynamic case study specs
  const highlights = [
    { title: "Performance Tuning", desc: "Core Web Vitals optimized, sub-second TTFB, fully compressed assets.", value: "98% Speed" },
    { title: "Premium UI/UX", desc: "Crafted transitions with Framer Motion, clean typography, responsive layout styling.", value: "Custom Figma" },
    { title: "Integration Stack", desc: "Secured database queries, dynamic API endpoints, and Stripe checkout systems.", value: "Supabase DB" }
  ];

  const timelineSteps = [
    { phase: "Phase 01", title: "Scoping & Figma UX", status: "Completed" },
    { phase: "Phase 02", title: "Next.js Frontend Build", status: "Completed" },
    { phase: "Phase 03", title: "Supabase API bindings", status: "Completed" },
    { phase: "Phase 04", title: "QA Testing & Deploy", status: "Completed" }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: "var(--bg)" }}>
      <Navbar />

      {/* Pulse Ripple Style */}
      <style jsx global>{`
        @keyframes pulse-ripple {
          0% {
            box-shadow: 0 0 0 0 rgba(200, 149, 107, 0.4), 0 0 0 10px rgba(200, 149, 107, 0.2), 0 0 0 25px rgba(200, 149, 107, 0.1);
          }
          100% {
            box-shadow: 0 0 0 15px rgba(200, 149, 107, 0), 0 0 0 25px rgba(200, 149, 107, 0), 0 0 0 40px rgba(200, 149, 107, 0);
          }
        }
        .pulse-btn {
          animation: pulse-ripple 2.2s infinite;
        }
      `}</style>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        
        {/* Navigation & Title */}
        <div className="space-y-6">
          <button
            onClick={() => router.push("/projects")}
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Archive
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: projectColor }}>
                {project.category} · {project.year || project.duration || "Case Study"}
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-none" style={{ color: "var(--text-primary)" }}>
                {project.title}
              </h1>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 hover:scale-105"
                  style={{ background: projectColor, color: "var(--bg)" }}
                >
                  <Globe size={14} /> Live Site <ExternalLink size={12} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold border transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: "var(--surface-elevated)", 
                    color: "var(--text-primary)", 
                    borderColor: "var(--border)" 
                  }}
                >
                  <Github size={14} /> View Code <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Website Preview Frame */}
        {project.live ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs px-2 font-mono" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1.5"><Monitor size={14} /> Interactive Live Sandbox</span>
              <span>{showIframe ? "Embedded App View" : "Safe View Mode"}</span>
            </div>

            {/* Browser frame mock */}
            <div 
              className="rounded-2xl border overflow-hidden flex flex-col transition-all"
              style={{ 
                background: "var(--surface)", 
                borderColor: "var(--border)",
                boxShadow: `0 20px 40px -20px ${projectColor}15` 
              }}
            >
              {/* Window Controls & Address Bar */}
              <div 
                className="px-4 py-3 border-b flex items-center justify-between gap-4 transition-colors"
                style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
              >
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div 
                  className="flex-1 max-w-xl mx-auto rounded-lg border py-1 px-4 text-center text-[10px] font-mono select-all overflow-hidden truncate"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                  {project.live}
                </div>
                <div className="w-16 flex justify-end">
                  {showIframe && (
                    <button
                      onClick={() => setShowIframe(false)}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md border transition-all"
                      style={{ 
                        background: "var(--bg)", 
                        color: "var(--text-secondary)", 
                        borderColor: "var(--border)" 
                      }}
                    >
                      Hide
                    </button>
                  )}
                </div>
              </div>

              {/* Viewport Content */}
              <div 
                className="relative h-[480px] md:h-[600px] w-full overflow-hidden flex items-center justify-center"
                style={{ background: "var(--bg)" }}
              >
                {showIframe ? (
                  <iframe
                    src={project.live}
                    title={project.title}
                    className="w-full h-full border-none"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                ) : (
                  /* Animated glassmorphic poster frame */
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6"
                    style={{ background: "var(--surface-elevated)" }}
                  >
                    {/* Background visual art */}
                    <div 
                      className="absolute inset-0 opacity-[0.03]" 
                      style={{ backgroundImage: "radial-gradient(var(--text-muted) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                    />
                    
                    <div className="relative z-10 max-w-md space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mx-auto mb-2 animate-bounce">
                        <Sparkles size={20} />
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-display font-bold" style={{ color: "var(--text-primary)" }}>
                        Live Project Interface
                      </h3>
                      
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        For security and layout compatibility, we recommend launching the live site directly in a new window.
                      </p>

                      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
                        {/* Pulse animation button */}
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pulse-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold transition-all transform hover:scale-105 active:scale-95"
                          style={{ background: projectColor, color: "var(--bg)" }}
                        >
                          <Play size={12} fill="currentColor" /> Launch Application ↗
                        </a>

                        <button
                          onClick={() => setShowIframe(true)}
                          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-mono font-bold border transition-all hover:scale-105 active:scale-95"
                          style={{ 
                            background: "var(--surface)", 
                            color: "var(--text-secondary)", 
                            borderColor: "var(--border)" 
                          }}
                        >
                          <Eye size={12} /> Embed In-App
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Embed Alert note */}
            <p className="text-[10px] leading-normal text-center flex items-center justify-center gap-1" style={{ color: "var(--text-muted)" }}>
              <AlertCircle size={12} />
              <span>Some sites restrict framing (X-Frame SAMEORIGIN). Click "Launch Application" to open in a new tab if embedding shows blank.</span>
            </p>
          </div>
        ) : (
          /* Image Banner fallback */
          <div 
            className="rounded-3xl h-64 md:h-[400px] flex items-center justify-center relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${projectColor}15 0%, rgba(0,0,0,0) 100%)`,
              border: "1px solid var(--border)"
            }}
          >
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60" />
            ) : (
              <div className="text-center space-y-4">
                <Cpu size={48} className="mx-auto" style={{ color: projectColor }} />
                <div className="font-display font-bold opacity-[0.04] text-8xl md:text-9xl tracking-tighter" style={{ color: "var(--text-muted)" }}>
                  {project.title[0]}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detailed Specs Split Layout */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Left: Description & Rich Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Project Overview */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold border-b pb-3" style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}>Project Summary</h3>
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ color: "var(--text-secondary)" }}>
                {project.desc || "No comprehensive description provided for this case study."}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold border-b pb-3" style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}>Key Technical Highlights</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {highlights.map((h, i) => (
                  <div 
                    key={i} 
                    className="p-5 rounded-2xl border" 
                    style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                  >
                    <span className="text-[10px] font-mono font-bold tracking-wider" style={{ color: projectColor }}>
                      {h.value}
                    </span>
                    <h4 className="text-sm font-bold font-display mt-1" style={{ color: "var(--text-primary)" }}>{h.title}</h4>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold border-b pb-3" style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}>Challenges & Engineering Solutions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Challenge */}
                <div 
                  className="p-6 rounded-2xl border space-y-3"
                  style={{ background: "rgba(239, 68, 68, 0.03)", borderColor: "rgba(239, 68, 68, 0.15)" }}
                >
                  <h4 className="text-sm font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(239, 68, 68)" }}>The Challenge</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Scaling network endpoints to support concurrent requests without latency bottlenecks, and guaranteeing sub-second layout loading speeds across legacy mobile device webviews.
                  </p>
                </div>
                {/* Solution */}
                <div 
                  className="p-6 rounded-2xl border space-y-3"
                  style={{ background: "rgba(16, 185, 129, 0.03)", borderColor: "rgba(16, 185, 129, 0.15)" }}
                >
                  <h4 className="text-sm font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(16, 185, 129)" }}>The Solution</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Leveraged Next.js Edge Routing and Serverless APIs. Optimized image loading with static layout checks and integrated lazy loading file chunk streams to keep frames fluid.
                  </p>
                </div>
              </div>
            </div>

            {/* Development timeline checklist */}
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold border-b pb-3" style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}>Development Milestones</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {timelineSteps.map((step, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-xl border flex flex-col justify-between h-24"
                    style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                  >
                    <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{step.phase}</span>
                    <div className="space-y-1">
                      <div className="text-xs font-bold leading-tight" style={{ color: "var(--text-primary)" }}>{step.title}</div>
                      <div className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {step.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Technical specifications and Tags */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div 
              className="p-6 rounded-2xl border space-y-6"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <h4 className="font-display text-lg font-bold border-b pb-3" style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}>Specifications</h4>
              
              <div className="space-y-4 divide-y" style={{ borderColor: "var(--border)" }}>
                {/* Type */}
                <div className="pt-3 flex justify-between text-xs">
                  <span style={{ color: "var(--text-secondary)" }}>Classification</span>
                  <span className="font-mono font-bold" style={{ color: "var(--text-primary)" }}>{project.type} Project</span>
                </div>

                {/* Client */}
                {project.client && (
                  <div className="pt-3 flex justify-between text-xs" style={{ borderColor: "var(--border)" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Client / Org</span>
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{project.client}</span>
                  </div>
                )}

                {/* Date */}
                {project.year && (
                  <div className="pt-3 flex justify-between text-xs" style={{ borderColor: "var(--border)" }}>
                    <span style={{ color: "var(--text-secondary)" }}><Calendar size={12} className="inline mr-1" /> Period</span>
                    <span className="font-mono" style={{ color: "var(--text-primary)" }}>{project.year}</span>
                  </div>
                )}

                {/* Duration */}
                {project.duration && (
                  <div className="pt-3 flex justify-between text-xs" style={{ borderColor: "var(--border)" }}>
                    <span style={{ color: "var(--text-secondary)" }}><Clock size={12} className="inline mr-1" /> Project Length</span>
                    <span className="font-mono" style={{ color: "var(--text-primary)" }}>{project.duration}</span>
                  </div>
                )}

                {/* Tech stack */}
                <div className="pt-3 space-y-2" style={{ borderColor: "var(--border)" }}>
                  <span className="text-xs block" style={{ color: "var(--text-secondary)" }}>Technology Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2.5 py-1 rounded border"
                        style={{ 
                          background: "var(--surface-elevated)", 
                          color: "var(--text-secondary)", 
                          borderColor: "var(--border)" 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action panel */}
            <div 
              className="p-6 rounded-2xl border text-center space-y-4"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <h4 className="text-sm font-display font-bold" style={{ color: "var(--text-primary)" }}>Have a similar project?</h4>
              <p className="text-xs leading-normal" style={{ color: "var(--text-secondary)" }}>
                Let's scope your ideas and build a custom application tailored for your business.
              </p>
              <a 
                href="/contact" 
                className="w-full py-2.5 rounded-full inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold transition-all"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
                onMouseEnter={(e) => e.currentTarget.style.filter = "brightness(1.1)"}
                onMouseLeave={(e) => e.currentTarget.style.filter = "none"}
              >
                Start Scoping Proposal <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
