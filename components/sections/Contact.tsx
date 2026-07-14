"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle, Github, Linkedin } from "lucide-react";
import { useDataRefresh } from "@/lib/useDataRefresh";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState<any>({
    email: "contact.aeropeak@gmail.com",
    location: "Coimbatore, Tamil Nadu, India",
    availability: "Mon-Fri, 9AM-6PM IST",
    title1: "Lets build",
    title2: "something great",
    description: "Have a project in mind or want to discuss opportunities? We are always open to new challenges and interesting work. Let's connect!",
    services: ["Full-Stack Web App", "UI/UX Design", "Mobile App", "E-Commerce", "Design System"]
  });

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.contact) {
          setContactData(result.data.contact);
        }
      })
      .catch(err => {
        console.error("Error loading contact data:", err);
        // Keep default contact data on error
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh when admin updates data
  useDataRefresh(fetchData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the WhatsApp message text
    const formattedMessage = `*New Portfolio Contact Message* 🚀\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*WhatsApp:* ${form.phone}\n` +
      `*Service:* ${selectedService || "Not specified"}\n\n` +
      `*Message:*\n${form.message}`;

    // Target your WhatsApp number 8300074144
    const whatsappUrl = `https://wa.me/918300074144?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Show success feedback on website
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      setSelectedService("");
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* BG decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: "var(--accent)" }}>
            08 — Contact
          </span>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.95, color: "var(--text-primary)" }}
          >
            {contactData.title1}<br />
            <em style={{ color: "var(--accent)" }}>{contactData.title2}</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--text-secondary)", maxWidth: "38ch" }}
            >
              {contactData.description}
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-10">
              {[
                { icon: Mail, label: "Email", value: contactData.email, href: `mailto:${contactData.email}` },
                { icon: MapPin, label: "Location", value: contactData.location, href: null },
                { icon: Clock, label: "Availability", value: contactData.availability, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--accent)" }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium transition-colors duration-200 line-animate pb-0.5"
                        style={{ color: "var(--text-primary)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm" style={{ color: "var(--text-primary)" }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3 mb-10">
              {[
                { icon: Github, href: "https://github.com/19jayaprakash", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/jayaprakash-r-218968310/", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: "var(--surface)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>

            {/* Quick availability card */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border-accent)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  Available for new projects
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Currently accepting freelance and full-time opportunities.
                Response time: within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center py-20 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: "#22C55E20", color: "#22C55E" }}>
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-display font-bold text-3xl mb-3" style={{ color: "var(--text-primary)" }}>
                  Message Sent!
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                    I need help with
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {contactData.services.map((s: string) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedService(s === selectedService ? "" : s)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
                        style={{
                          background: selectedService === s ? "var(--accent)" : "var(--surface)",
                          color: selectedService === s ? "#fff" : "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "name", label: "Your Name", placeholder: "Agilan", type: "text" },
                    { id: "email", label: "Email Address", placeholder: "agilan@example.com", type: "email" },
                  ].map(({ id, label, placeholder, type }) => (
                    <div key={id}>
                      <label
                        htmlFor={id}
                        className="block text-xs font-mono uppercase tracking-widest mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {label}
                      </label>
                      <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        required
                        value={form[id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                        style={{
                          background: "var(--surface)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                    </div>
                  ))}
                </div>

                {/* Contact Number (WhatsApp) */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-mono uppercase tracking-widest mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Contact Number (WhatsApp)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 83000 74144"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                    style={{
                      background: "var(--surface)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-widest mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Tell me about your project
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Hi! I'm looking to build a web app that..."
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none"
                    style={{
                      background: "var(--surface)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  <Send size={16} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
