"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../../public/Logo.png";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-500 flex items-center justify-between"
        style={{
          paddingTop: scrolled ? "12px" : "24px",
          paddingBottom: scrolled ? "12px" : "24px",
          background: scrolled ? "color-mix(in srgb, var(--bg) 70%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.04)" : "none",
        }}
      >
        {/* Logo */}
        <Link href="/" className="font-display text-3xl font-bold block" style={{ color: "var(--text-primary)" }}>
          <Image src={logo.src} alt="Logo" width={180} height={47} className="inline-block mr-2 object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <motion.div className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full transition-all duration-500"
          style={{
            background: scrolled 
              ? "color-mix(in srgb, var(--surface) 20%, transparent)" 
              : "color-mix(in srgb, var(--surface) 45%, transparent)",
            border: scrolled
              ? "1px solid color-mix(in srgb, var(--border) 30%, transparent)"
              : "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
            backdropFilter: scrolled ? "none" : "blur(12px)",
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="line-animate text-sm font-medium pb-1 transition-colors duration-300"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* Right actions */}
        <div className="flex items-center gap-4">

          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
            }}
          >
            Hire Me
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--text-primary)" }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8"
            style={{ background: "var(--bg)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  className="font-display text-4xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
