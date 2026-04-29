"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, BookOpen, ExternalLink } from "lucide-react";

const education = [
   {
    type: "degree",
    icon: GraduationCap,
    institution: "Global Knowledge Technologies",
    degree: "Software Engineer",
    period: "2024 - 2025",
    location: "Bengaluru, Karnataka",
    grade: "Rating 4.5/5 based on Performance",
    highlights: ["Full-Stack Development", "Mobile Development", "UI/UX Design", "Software Engineering"],
  },
  {
    type: "degree",
    icon: GraduationCap,
    institution: "Dr.N.G.P. Institute of Technology",
    degree: "B.Tech - Information Technology",
    period: "2020 – 2024",
    location: "Coimbatore, Tamil Nadu",
    grade: "CGPA: 7.8 / 10",
    highlights: ["Full-Stack Development", "Data Structures & Algorithms", "Database Management", "Software Engineering"],
  },
   {
    type: "degree",
    icon: GraduationCap,
    institution: "Higher Secondary School",
    degree: "Class XII — Computer Science",
    period: "2019 – 2020",
    location: "Coimbatore",
    grade: "Percentage: 68%",
    highlights: ["Computer Science", "Mathematics", "Physics"],
  },
];

const certifications = [
  {
    icon: Award,
    name: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    year: "2022",
    color: "#0084FF",
  },
  {
    icon: BookOpen,
    name: "Next.js & React — The Complete Guide",
    issuer: "Udemy",
    year: "2021",
    color: "#A435F0",
  },
  {
    icon: BookOpen,
    name: "Node.js, Express & MongoDB",
    issuer: "Udemy — Jonas Schmedtmann",
    year: "2021",
    color: "#A435F0",
  },
  {
    icon: BookOpen,
    name: "Advanced CSS",
    issuer: "Udemy",
    year: "2020",
    color: "#A435F0",
  },
];

export default function Studies() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="studies"
      ref={ref}
      className="py-32 md:py-48 px-6 md:px-12"
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
            04 — Studies
          </span>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.95, color: "var(--text-primary)" }}
          >
            Education, Experience &<br />
            <em style={{ color: "var(--accent)" }}>Certifications</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Education timeline */}
          <div>
            <motion.h3
              className="font-mono text-sm uppercase tracking-widest mb-8"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Formal Education and Experience
            </motion.h3>
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-5 top-5 bottom-5 w-px"
                style={{ background: "var(--border)" }}
              />
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.institution}
                    className="flex gap-6 relative"
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  >
                    {/* Dot */}
                    <div
                      className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--accent)", color: "#fff" }}
                    >
                      <edu.icon size={16} />
                    </div>
                    {/* Content */}
                    <div
                      className="flex-1 p-5 rounded-2xl"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                          {edu.institution}
                        </h4>
                        <span
                          className="font-mono text-xs whitespace-nowrap"
                          style={{ color: "var(--accent)" }}
                        >
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>{edu.degree}</p>
                      <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{edu.location} · {edu.grade}</p>
                      <div className="flex flex-wrap gap-1">
                        {edu.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: "var(--surface-elevated)", color: "var(--text-muted)" }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.h3
              className="font-mono text-sm uppercase tracking-widest mb-8"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Certifications & Courses
            </motion.h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${cert.color}20`, color: cert.color }}
                  >
                    <cert.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                      {cert.name}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{cert.issuer} · {cert.year}</div>
                  </div>
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    style={{ color: "var(--accent)" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
