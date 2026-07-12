"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useDataRefresh } from "@/lib/useDataRefresh";

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const defaultTestimonials = [
    { id: 1, name: "Sarah Chen", role: "CTO", company: "TechStart Inc", project: "SaaS Dashboard", text: "Aeropeak delivered exceptional work on our dashboard. Their attention to detail and problem-solving skills are outstanding.", avatar: "SC", avatarColor: "#EC4899", rating: 5 },
    { id: 2, name: "Michael Park", role: "Product Manager", company: "InnovateCo", project: "Mobile App", text: "Working with the Aeropeak team was a great experience. They understood our vision and brought it to life perfectly.", avatar: "MP", avatarColor: "#6366F1", rating: 5 },
    { id: 3, name: "Emily Rodriguez", role: "Founder", company: "DesignHub", project: "E-Commerce Platform", text: "Incredible development agency with a keen eye for design. Our e-commerce platform exceeded all expectations.", avatar: "ER", avatarColor: "#14B8A6", rating: 5 }
  ];

  const [testimonials, setTestimonials] = useState<any[]>(defaultTestimonials);

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.testimonials) {
          setTestimonials(result.data.testimonials);
        }
      })
      .catch(err => {
        console.error("Error loading testimonials:", err);
        // Keep default testimonials on error
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh when admin updates data
  useDataRefresh(fetchData);

  const paginate = (dir: number) => {
    if (testimonials.length === 0) return;
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.96,
    }),
  };

  const t = testimonials[current] || { text: "", name: "", role: "", company: "", project: "", avatar: "", avatarColor: "#C8956B", rating: 5 };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-32 md:py-48 px-6 md:px-12 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: "var(--accent)" }}>
            07 — Testimonials
          </span>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.95, color: "var(--text-primary)" }}
          >
            What clients<br />
            <em style={{ color: "var(--accent)" }}>say</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Left: client list */}
          <motion.div
            className="hidden md:block space-y-3"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.id}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300"
                style={{
                  background: current === i ? "var(--surface)" : "transparent",
                  border: `1px solid ${current === i ? "var(--border-accent)" : "transparent"}`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: testimonial.avatarColor, color: "#fff" }}
                >
                  {testimonial.avatar}
                </div>
                <div className="min-w-0">
                  <div
                    className="text-sm font-medium truncate"
                    style={{ color: current === i ? "var(--text-primary)" : "var(--text-muted)" }}
                  >
                    {testimonial.name}
                  </div>
                  <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                    {testimonial.company}
                  </div>
                </div>
                {current === i && (
                  <div
                    className="w-1 h-6 rounded-full ml-auto flex-shrink-0"
                    style={{ background: testimonial.avatarColor }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Center: main testimonial */}
          <div className="md:col-span-2">
            <div
              className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {/* Large quote mark */}
              <div
                className="absolute top-6 right-8 opacity-10"
                style={{ color: "var(--accent)" }}
              >
                <Quote size={80} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--accent)" style={{ color: "var(--accent)" }} />
                ))}
              </div>

              {/* Quote */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <blockquote
                    className="font-display text-2xl md:text-3xl leading-relaxed mb-8"
                    style={{ color: "var(--text-primary)", fontStyle: "italic", fontWeight: 300 }}
                  >
                    "{t.text}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                      style={{ background: t.avatarColor, color: "#fff" }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                        {t.name}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {t.role} at {t.company}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--accent)" }}>
                        Project: {t.project}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: current === i ? "24px" : "8px",
                        height: "8px",
                        background: current === i ? "var(--accent)" : "var(--border)",
                      }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => paginate(-1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: "var(--surface-elevated)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
