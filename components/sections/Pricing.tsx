"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles, Star, ArrowRight, Shield, TrendingUp, Cpu, ChevronRight, AlertCircle } from "lucide-react";
import { useDataRefresh } from "@/lib/useDataRefresh";

const defaultPlans = [
  {
    name: "Starter",
    price: "₹9,999",
    desc: "Perfect for personal branding, simple landing pages, and single-product launches.",
    features: [
      "1 Custom Responsive Page",
      "Modern Glassmorphic Design",
      "Basic SEO Optimization",
      "Social Media Integrations",
      "Contact Form Setup",
      "Free Deployment Support",
    ],
    cta: "Start Project",
    popular: false,
  },
  {
    name: "Business",
    price: "₹24,999",
    desc: "The ultimate package for startups and local businesses looking to establish a strong presence.",
    features: [
      "Up to 5 Pages (Static/Dynamic)",
      "Next.js High-Performance Setup",
      "1 Year Free Maintenance (Offer!)",
      "Free Basic SEO & Analytics Setup",
      "Advanced Lead Capture & Forms",
      "Domain & Hosting Configuration",
      "Custom UI/UX (Zero Templates)",
    ],
    cta: "Scale Your Business",
    popular: true,
  },
  {
    name: "Professional",
    price: "₹49,999",
    desc: "For businesses needing e-commerce solutions, payment systems, and custom content management.",
    features: [
      "Up to 10 Pages / Catalog Store",
      "E-Commerce & Checkout Systems",
      "Payment Gateway Integration",
      "CMS / Admin Dashboard Panel",
      "Dynamic Database Integration",
      "Advanced SEO & Speed Optimization",
      "Priority Maintenance & Support",
    ],
    cta: "Launch Store",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Let's Talk",
    desc: "Custom iOS/Android mobile apps, highly scalable enterprise solutions, and complex software systems.",
    features: [
      "Custom Mobile App (React Native)",
      "Enterprise Custom Software",
      "Custom API & Server Integrations",
      "Advanced Authentication & Security",
      "Unlimited Scalability Architecture",
      "Direct Slack/WhatsApp Developer Support",
    ],
    cta: "Schedule Consultation",
    popular: false,
  },
];

const defaultStartingPrices = [
  { service: "Website Development", price: "Starting from ₹9,999", color: "#C8956B" },
  { service: "Mobile App Development", price: "Starting from ₹39,999", color: "#6366F1" },
  { service: "E-commerce Solutions", price: "Starting from ₹39,999", color: "#14B8A6" },
  { service: "Custom Software", price: "Contact Us", color: "#EC4899" },
];

const defaultLaunchOffer = {
  title: "Startup Launch Offer",
  discount: "20% OFF",
  description: "Helping early-stage startups and small businesses kickstart their digital presence with zero compromise on engineering and visual quality.",
  perks: [
    { title: "1 Year Maintenance", desc: "Security and content support" },
    { title: "Free Basic SEO", desc: "Rank higher on Google" },
    { title: "Free Deployment Support", desc: "Domain, Vercel, Supabase" },
  ]
};

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [beforeAfterActive, setBeforeAfterActive] = useState<"before" | "after">("after");

  const [title, setTitle] = useState("Pricing");
  const [description, setDescription] = useState("Startup-friendly rates designed to deliver maximum quality without surprise invoices. Choose a plan or request a custom quotation based on your exact specifications.");
  const [plans, setPlans] = useState<any[]>(defaultPlans);
  const [startingPrices, setStartingPrices] = useState<any[]>(defaultStartingPrices);
  const [launchOffer, setLaunchOffer] = useState<any>(defaultLaunchOffer);

  const fetchData = useCallback(() => {
    fetch(`/api/portfolio?t=${Date.now()}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.data && result.data.pricing) {
          const pData = result.data.pricing;
          if (pData.title) setTitle(pData.title);
          if (pData.description) setDescription(pData.description);
          if (pData.plans && Array.isArray(pData.plans)) setPlans(pData.plans);
          if (pData.startingEstimates && Array.isArray(pData.startingEstimates)) setStartingPrices(pData.startingEstimates);
          if (pData.offerTitle || pData.offerDiscount) {
            setLaunchOffer({
              title: pData.offerTitle || defaultLaunchOffer.title,
              discount: pData.offerDiscount || defaultLaunchOffer.discount,
              description: pData.offerDescription || defaultLaunchOffer.description,
              perks: pData.offerPerks || defaultLaunchOffer.perks,
            });
          }
        }
      })
      .catch((err) => {
        console.error("Error loading pricing data:", err);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh when admin updates data
  useDataRefresh(fetchData);

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background glowing effects */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 pointer-events-none opacity-20 animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(200,149,107,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] pointer-events-none opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.span
              className="font-mono text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              08 — Investment
            </motion.span>
            <motion.h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.95, color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Transparent<br />
              <em style={{ color: "var(--accent)" }}>{title}</em>
            </motion.h2>
          </div>
          <motion.p
            className="max-w-md text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Startup Launch Offer Banner */}
        {launchOffer && (
          <motion.div
            className="mb-16 relative p-8 md:p-12 rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-r from-amber-950/20 via-neutral-900/30 to-amber-950/20 backdrop-blur-md"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {/* Subtle animated light line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent animate-pulse" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center lg:text-left">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Sparkles size={12} className="animate-pulse" />
                  {launchOffer.title}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                  Up to <span className="text-amber-400">{launchOffer.discount}</span> on your first website or mobile app!
                </h3>
                <p className="text-sm max-w-xl text-neutral-400">
                  {launchOffer.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
                {launchOffer.perks?.map((perk: any, i: number) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white font-mono">{perk.title}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{perk.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-24">
          {plans.map((plan, i) => {
            const isPopular = plan.popular;
            return (
              <motion.div
                key={plan.name}
                className="relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 overflow-hidden group cursor-default"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  border: `1px solid ${hoveredCard === i ? "var(--accent)" : "rgba(255,255,255,0.1)"}`,
                  boxShadow: hoveredCard === i && isPopular ? "0 10px 40px -10px var(--accent-glow)" : "none",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
              >
                {/* Popular Card Glowing Accent */}
                {isPopular && (
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none rounded-3xl"
                    style={{
                      background: "radial-gradient(circle at 50% 0%, var(--accent) 0%, transparent 60%)"
                    }}
                  />
                )}

                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute top-5 right-5 flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Star size={10} fill="currentColor" />
                    Best Value
                  </div>
                )}

                {/* Header */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    {plan.name}
                  </h4>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl md:text-4xl font-bold font-display text-white">
                      {plan.price}
                    </span>
                    {plan.price !== "Let's Talk" && (
                      <span className="text-xs text-neutral-400 font-mono">/est</span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mb-6 leading-relaxed min-h-[48px]">
                    {plan.desc}
                  </p>

                  <div className="w-full h-px bg-white/5 mb-6" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features?.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-tight">
                        <span 
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: isPopular ? "rgba(200, 149, 107, 0.15)" : "rgba(255,255,255,0.05)",
                            color: isPopular ? "var(--accent)" : "#10B981"
                          }}
                        >
                          <Check size={10} strokeWidth={3} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <a
                  href="#contact"
                  className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold font-mono transition-all duration-300 text-center"
                  style={{
                    background: isPopular ? "var(--accent)" : "rgba(255,255,255,0.05)",
                    color: isPopular ? "#000" : "var(--text-primary)",
                    border: isPopular ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isPopular) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.borderColor = "var(--accent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isPopular) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }
                  }}
                >
                  {plan.cta}
                  <ChevronRight size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Starting prices and Scope Philosophy */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
          {/* Starting Rates List */}
          <motion.div
            className="rounded-3xl p-8 border border-white/5 bg-white/[0.01] backdrop-blur-md animate-pulse-slow"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-display text-2xl font-bold mb-2 text-white">
              Starting Estimates
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              A quick reference guide to baseline rates. Final quotes depend on scope complexity and client-specific demands.
            </p>

            <div className="space-y-4">
              {startingPrices.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-semibold text-white">{item.service}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-300 bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/5">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy Note */}
          <motion.div
            className="h-full flex flex-col justify-between rounded-3xl p-8 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4 text-amber-500">
                <AlertCircle size={20} />
                <h3 className="font-display text-2xl font-bold text-white">
                  Why no itemized checklist pricing?
                </h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Many agencies charge you <strong className="text-white">₹5,000</strong> for a login screen, <strong className="text-white">₹10,000</strong> for a payment gateway, and so on. We don't nickel-and-dime. 
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                Most clients care about the <strong className="text-neutral-300">total project viability</strong> and final launch. We ask about your goals first, map the actual technical complexity, and present a single, all-inclusive custom quotation.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-amber-500/10 bg-amber-500/5 text-xs text-amber-400/90 leading-normal flex items-start gap-2.5">
              <Shield size={18} className="flex-shrink-0 mt-0.5 text-amber-500" />
              <span>
                <strong>All-inclusive scoping:</strong> Every quotation includes design, mobile performance setup, custom code, testing, deployment, and launching support out-of-the-box.
              </span>
            </div>
          </motion.div>
        </div>

        {/* Credibility Builder: Before & After & Trust Pillars */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-display text-3xl font-bold text-white">
              Why Invest in Quality?
            </h3>
            <p className="text-xs text-neutral-400 mt-2">
              Cheap sites cost businesses thousands in lost leads, bad SEO, and template bugs. Here is why choosing professional development yields massive ROI.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Before vs After interactive card */}
            <motion.div
              className="lg:col-span-2 rounded-3xl p-8 border border-white/5 bg-white/[0.01] flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold font-display text-white">The Quality Transformation</h4>
                  
                  {/* Switcher tabs */}
                  <div className="flex p-1 rounded-xl bg-white/5 border border-white/5">
                    <button
                      onClick={() => setBeforeAfterActive("before")}
                      className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg transition-all ${
                        beforeAfterActive === "before" 
                          ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                          : "text-neutral-400"
                      }`}
                    >
                      Cheap Template
                    </button>
                    <button
                      onClick={() => setBeforeAfterActive("after")}
                      className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg transition-all ${
                        beforeAfterActive === "after" 
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                          : "text-neutral-400"
                      }`}
                    >
                      Our Custom Build
                    </button>
                  </div>
                </div>

                {beforeAfterActive === "before" ? (
                  <div className="space-y-4 py-4 min-h-[180px]">
                    <div className="flex items-center gap-2.5 text-xs text-red-400 font-mono">
                      <span>❌ Slow load speed (4.5s+) - high user dropouts</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                      <span>⚠️ Generic, bloated code templates and builders (WordPress, Elementor)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                      <span>⚠️ Poor mobile layout rendering and layout shifts (CLS)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                      <span>❌ Invisible to Google due to lack of custom metadata and SEO</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                      <span>❌ Insecure setup vulnerable to spam and security exploits</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 py-4 min-h-[180px]">
                    <div className="flex items-center gap-2.5 text-xs text-emerald-400 font-mono">
                      <span>⚡ Blazing-fast performance (sub 1.0s loading) - 100% Score</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-white">
                      <span>✅ Structured semantic layout custom built in React/Next.js</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-white">
                      <span>✅ Pure premium UX tailored directly for client conversion</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-white">
                      <span>✅ Built-in automated SEO structures, metadata & JSON-LD schema</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-white">
                      <span>✅ Zero server setup or maintenance headaches - fully optimized</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                <span>*A custom site boosts conversions by up to 200% compared to standard templates.</span>
                <span className="font-mono text-emerald-400 font-bold">100% ROI focused</span>
              </div>
            </motion.div>

            {/* Credibility pointers card */}
            <motion.div
              className="rounded-3xl p-8 border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div>
                <h4 className="text-lg font-bold font-display text-white mb-6">Our Credibility Pillars</h4>
                <div className="space-y-5">
                  <a 
                    href="#projects" 
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp size={16} className="text-amber-500" />
                      <div className="text-xs font-semibold text-white">25+ Completed Works</div>
                    </div>
                    <ChevronRight size={14} className="text-neutral-500 group-hover:text-amber-400 transition-colors" />
                  </a>

                  <a 
                    href="#testimonials" 
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Star size={16} className="text-amber-500" />
                      <div className="text-xs font-semibold text-white">100% Five-Star Reviews</div>
                    </div>
                    <ChevronRight size={14} className="text-neutral-500 group-hover:text-amber-400 transition-colors" />
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <Cpu size={16} className="text-amber-500" />
                    <div className="text-xs font-semibold text-white">Modern Next.js Stack</div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono font-bold transition-colors"
                >
                  Schedule an Intro Call <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
