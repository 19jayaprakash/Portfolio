"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Heart } from "lucide-react";
import Image from "next/image";
import logo from "../../public/Logo.png";
import Link from "next/link";

const footerLinks = {
  Sections: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/projects" },
    { label: "Studies", href: "/about" },
    { label: "Freelance", href: "/projects" },
    { label: "Testimonials", href: "/#testimonials" },
  ],
  Services: [
    { label: "Full-Stack Dev", href: "/#services" },
    { label: "UI/UX Design", href: "/#services" },
    { label: "Mobile Apps", href: "/#services" },
    { label: "E-Commerce", href: "/#services" },
    { label: "Consulting", href: "/contact" },
  ],
};

const socials = [
  { icon: Github, href: "https://github.com/19jayaprakash", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:jayaprakash.r024@gmail.com", label: "Email" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative pt-24 pb-8 px-6 md:px-12 overflow-hidden"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Background big text */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center pointer-events-none select-none overflow-hidden"
        style={{
          fontSize: "clamp(5rem, 20vw, 20rem)",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          color: "var(--text-primary)",
          opacity: 0.03,
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
        }}
      >
        PORTFOLIO
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top row */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="font-display text-3xl font-bold mb-4 block" style={{ color: "var(--text-primary)" }}>
            <Image src={logo.src} alt="Logo" width={200} height={52} className="inline-block mr-2 object-contain" />
            </a>
            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Full-stack developer & creative technologist based in Coimbatore, Tamil Nadu.
              Building digital experiences that matter.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "var(--surface)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="font-mono text-xs uppercase tracking-widest mb-5"
                style={{ color: "var(--accent)" }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "var(--accent)",
            backgroundImage: "linear-gradient(135deg, var(--accent) 0%, #A0704A 100%)",
          }}
        >
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-1">
              Ready to start a project?
            </h3>
            <p className="text-sm text-white opacity-80">
              Let's build something amazing together.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap flex-shrink-0"
            style={{ background: "#fff", color: "var(--accent)" }}
          >
            Get In Touch
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 All rights reserved.
          </p>
        
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 text-sm"
            style={{
              background: "var(--surface)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--surface)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
