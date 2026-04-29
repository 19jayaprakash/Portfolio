"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Shri Ram",
    role: "CEO",
    company: "Pixel Cognitix",
    avatar: "SR",
    avatarColor: "#22C55E",
    rating: 5,
    text: "The website redesign and development project was executed flawlessly. The new site is not only visually stunning but also incredibly fast and user-friendly. We've received countless compliments from clients and partners. The team's attention to detail and commitment to quality truly set them apart.",
    project: "Website Redesign & Development",
  },
  {
    id: 2,
    name: "Amal Denver",
    role: "Manager",
    company: "Square Yards",
    avatar: "AD",
    avatarColor: "#F59E0B",
    rating: 5,
    text: "The social media campaign they managed for us was nothing short of phenomenal. From content creation to analytics, every aspect was handled with professionalism and creativity. We saw a significant boost in engagement and brand awareness within weeks. Truly a pleasure to work with!",
    project: "Social Media Campaign",
  },
  // {
  //   id: 3,
  //   name: "Dr. Kavitha Rajan",
  //   role: "CTO",
  //   company: "HealthTech Startup",
  //   avatar: "KR",
  //   avatarColor: "#EC4899",
  //   rating: 5,
  //   text: "Building a HIPAA-compliant platform is incredibly complex, but the execution was flawless. The video consultation system handles thousands of daily sessions without a hiccup. A rare combination of technical depth and product thinking.",
  //   project: "Patient Management Portal",
  // },
  // {
  //   id: 4,
  //   name: "Rahul Verma",
  //   role: "Product Manager",
  //   company: "EdTech Platform",
  //   avatar: "RV",
  //   avatarColor: "#8B5CF6",
  //   rating: 5,
  //   text: "The LMS has transformed how our 5,000 students learn. The gamification features increased daily active users by 60%. The developer's ability to translate complex educational UX requirements into smooth, intuitive interfaces is truly remarkable.",
  //   project: "Interactive Learning App",
  // },
  // {
  //   id: 5,
  //   name: "Sanjay Krishnan",
  //   role: "Marketing Director",
  //   company: "Luxury Fashion Brand",
  //   avatar: "SK",
  //   avatarColor: "#C8956B",
  //   rating: 5,
  //   text: "The website perfectly captures our brand's luxury essence. The animations are so smooth and the editorial layout has drawn compliments from our international partners. The design system they created has kept our team consistent for months.",
  //   project: "Brand Website & Design System",
  // },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
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

  const t = testimonials[current];

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
