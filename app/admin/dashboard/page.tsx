"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, Save, CheckCircle, Sparkles, DollarSign,
  User, BarChart3, FolderOpen, BookOpen, MessageSquare,
  Briefcase, Grid, Mail, Plus, Trash2, Image as ImageIcon, Edit2, Check, AlertTriangle, Eye, GripVertical
} from "lucide-react";
import { defaultPortfolioData } from "@/lib/portfolio-data";

// Helper components declared outside the main component to prevent focus loss on re-render
function InputField({ label, value, onChange, multiline = false, type = "text", placeholder = "" }: any) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none bg-neutral-900/60 text-white border border-white/5 focus:border-amber-500/50 focus:bg-neutral-900 focus:ring-1 focus:ring-amber-500/20"
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 bg-neutral-900/60 text-white border border-white/5 focus:border-amber-500/50 focus:bg-neutral-900 focus:ring-1 focus:ring-amber-500/20"
        />
      )}
    </div>
  );
}

function CommaSeparatedInput({ label, value, onChange, placeholder = "" }: { label: string; value: string[]; onChange: (val: string[]) => void; placeholder?: string }) {
  const [localVal, setLocalVal] = useState(value ? value.join(", ") : "");
  
  // Sync with outer changes
  useEffect(() => {
    setLocalVal(value ? value.join(", ") : "");
  }, [value]);
  
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">
        {label}
      </label>
      <input
        type="text"
        value={localVal}
        onChange={(e) => setLocalVal(e.target.value)}
        onBlur={() => {
          const parsed = localVal.split(",")
            .map(s => s.trim())
            .filter(Boolean);
          onChange(parsed);
        }}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 bg-neutral-900/60 text-white border border-white/5 focus:border-amber-500/50 focus:bg-neutral-900 focus:ring-1 focus:ring-amber-500/20"
      />
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("hero");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggedProjectIndex, setDraggedProjectIndex] = useState<number | null>(null);
  const [draggedFreelanceIndex, setDraggedFreelanceIndex] = useState<number | null>(null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    fetch("/api/portfolio")
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          // Robust check to auto-inject pricing default template if missing
          const mergedData = {
            ...result.data,
            pricing: result.data.pricing || defaultPortfolioData.pricing
          };
          setData(mergedData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    router.push("/admin/login");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        // Notify other components/tabs to refresh data
        localStorage.setItem('portfolio-data-updated', Date.now().toString());
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  // Hero handlers
  const updateHero = (field: string, value: any) => {
    setData({ ...data, hero: { ...data.hero, [field]: value } });
  };

  // Stats handlers
  const updateStat = (index: number, field: string, value: any) => {
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setData({ ...data, stats: newStats });
  };

  // Services handlers
  const addService = () => {
    const newService = {
      icon: "Code2",
      number: String(data.services.length + 1).padStart(2, '0'),
      title: "New Service",
      desc: "Service description",
      tags: ["React", "Next.js"],
      accent: "#C8956B",
      featured: false
    };
    setData({ ...data, services: [...data.services, newService] });
  };

  const updateService = (index: number, field: string, value: any) => {
    const newServices = [...data.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setData({ ...data, services: newServices });
  };

  const deleteService = (index: number) => {
    setData({ ...data, services: data.services.filter((_: any, i: number) => i !== index) });
  };

  // Projects handlers
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: "New Project",
      category: "Web App",
      desc: "Project description",
      tags: ["Next.js", "React"],
      color: "#22C55E",
      year: "2024",
      featured: false,
      image: "",
      github: "",
      live: ""
    };
    setData({ ...data, projects: [...data.projects, newProject] });
  };

  const updateProject = (id: number, field: string, value: any) => {
    setData({
      ...data,
      projects: data.projects.map((p: any) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const deleteProject = (id: number) => {
    setData({
      ...data,
      projects: data.projects.filter((p: any) => p.id !== id),
    });
  };

  // Studies handlers
  const addEducation = () => {
    const newEdu = {
      type: "degree",
      icon: "GraduationCap",
      institution: "Institution Name",
      degree: "Degree Name",
      period: "2020 - 2024",
      location: "Location",
      grade: "Grade",
      highlights: ["Highlight 1"]
    };
    setData({
      ...data,
      studies: {
        ...data.studies,
        education: [...data.studies.education, newEdu],
      },
    });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const newEducation = [...data.studies.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setData({
      ...data,
      studies: { ...data.studies, education: newEducation },
    });
  };

  const deleteEducation = (index: number) => {
    setData({
      ...data,
      studies: {
        ...data.studies,
        education: data.studies.education.filter((_: any, i: number) => i !== index),
      },
    });
  };

  const addCertification = () => {
    const newCert = {
      icon: "Award",
      name: "Certification Name",
      issuer: "Issuer",
      year: "2024",
      color: "#0084FF"
    };
    setData({
      ...data,
      studies: {
        ...data.studies,
        certifications: [...data.studies.certifications, newCert],
      },
    });
  };

  const updateCertification = (index: number, field: string, value: any) => {
    const newCerts = [...data.studies.certifications];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setData({
      ...data,
      studies: { ...data.studies, certifications: newCerts },
    });
  };

  const deleteCertification = (index: number) => {
    setData({
      ...data,
      studies: {
        ...data.studies,
        certifications: data.studies.certifications.filter((_: any, i: number) => i !== index),
      },
    });
  };

  // Testimonials handlers
  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: "Client Name",
      role: "Position",
      company: "Company",
      avatar: "CN",
      avatarColor: "#22C55E",
      rating: 5,
      text: "Testimonial text",
      project: "Project Name"
    };
    setData({ ...data, testimonials: [...data.testimonials, newTestimonial] });
  };

  const updateTestimonial = (id: number, field: string, value: any) => {
    setData({
      ...data,
      testimonials: data.testimonials.map((t: any) =>
        t.id === id ? { ...t, [field]: value } : t
      ),
    });
  };

  const deleteTestimonial = (id: number) => {
    setData({
      ...data,
      testimonials: data.testimonials.filter((t: any) => t.id !== id),
    });
  };

  // Freelance handlers
  const addFreelance = () => {
    const newFreelance = {
      id: Date.now(),
      client: "Company Name",
      title: "Project Title",
      desc: "Project description",
      tags: ["React"],
      duration: "3 months",
      budget: "Rs 10,000",
      rating: 5,
      status: "Completed",
      color: "#22C55E",
      category: "Web App",
      live: "",
      github: ""
    };
    setData({
      ...data,
      freelance: {
        ...data.freelance,
        projects: [...data.freelance.projects, newFreelance],
      },
    });
  };

  const updateFreelance = (id: number, field: string, value: any) => {
    setData({
      ...data,
      freelance: {
        ...data.freelance,
        projects: data.freelance.projects.map((p: any) =>
          p.id === id ? { ...p, [field]: value } : p
        ),
      },
    });
  };

  const deleteFreelance = (id: number) => {
    setData({
      ...data,
      freelance: {
        ...data.freelance,
        projects: data.freelance.projects.filter((p: any) => p.id !== id),
      },
    });
  };

  // Pricing handlers
  const updatePricingField = (field: string, value: any) => {
    setData({
      ...data,
      pricing: {
        ...data.pricing,
        [field]: value
      }
    });
  };

  const updateOfferPerk = (index: number, field: string, value: any) => {
    const newPerks = [...data.pricing.offerPerks];
    newPerks[index] = { ...newPerks[index], [field]: value };
    setData({
      ...data,
      pricing: {
        ...data.pricing,
        offerPerks: newPerks
      }
    });
  };

  const updatePricingPlan = (index: number, field: string, value: any) => {
    const newPlans = [...data.pricing.plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setData({
      ...data,
      pricing: {
        ...data.pricing,
        plans: newPlans
      }
    });
  };

  const updateStartingEstimate = (index: number, field: string, value: any) => {
    const newEstimates = [...data.pricing.startingEstimates];
    newEstimates[index] = { ...newEstimates[index], [field]: value };
    setData({
      ...data,
      pricing: {
        ...data.pricing,
        startingEstimates: newEstimates
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070605] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-neutral-400 text-xs font-mono tracking-widest uppercase">Loading Systems...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#070605] flex items-center justify-center">
        <div className="max-w-md p-8 rounded-3xl border border-red-500/10 bg-red-500/5 text-center space-y-4">
          <AlertTriangle size={32} className="mx-auto text-red-500" />
          <h2 className="text-white text-lg font-display font-bold">No Data Pipeline Discovered</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Please run the SQL schemas setup in Supabase and ensure database environment variables are loaded.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "Hero", icon: User },
    { id: "stats", label: "Stats", icon: BarChart3 },
    { id: "services", label: "Services", icon: Grid },
    { id: "pricing", label: "Pricing & Offers", icon: DollarSign },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "studies", label: "Studies", icon: BookOpen },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "freelance", label: "Freelance", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "visibility", label: "Section Status", icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-[#070605] text-neutral-200">
      {/* Decorative background glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none opacity-10 bg-radial-gradient from-amber-500/20 to-transparent blur-[120px]" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-5 bg-radial-gradient from-indigo-500/20 to-transparent blur-[150px]" />

      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 border-b border-white/5 bg-[#070605]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold font-display tracking-tight text-white bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              JP PORTFOLIO
            </span>
            <div className="h-4 w-px bg-white/10" />
            <h1 className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400">
              Admin Core
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {saved && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-mono">
                <Check size={12} strokeWidth={3} />
                <span>SAVED DATA</span>
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-mono transition-all duration-300 bg-amber-500 hover:bg-amber-400 text-neutral-950 disabled:opacity-50 hover:scale-105 active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "SAVING..." : "SAVE CHANGES"}
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 text-neutral-400 hover:text-white transition-all hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main layout container */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-1.5 p-2 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md">
            <div className="px-4 py-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase border-b border-white/5 mb-2">
              Sections
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setEditingId(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                      isActive 
                        ? "bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/10" 
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 space-y-6">
          
          {/* Hero Tab */}
          {activeTab === "hero" && (
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-white">Hero Parameters</h2>
                <p className="text-xs text-neutral-400 mt-1">Configure layout, badges, role arrays, and external credentials.</p>
              </div>
              <div className="space-y-5">
                <InputField label="Status Badge Text" value={data.hero.status} onChange={(v: any) => updateHero("status", v)} />
                <CommaSeparatedInput label="Title Words (comma-separated)" value={data.hero.titleWords} onChange={(v) => updateHero("titleWords", v)} />
                <CommaSeparatedInput label="Roles (comma-separated)" value={data.hero.roles} onChange={(v) => updateHero("roles", v)} />
                <InputField label="Description paragraph" value={data.hero.description} onChange={(v: any) => updateHero("description", v)} multiline />
                <div className="grid md:grid-cols-3 gap-4">
                  <InputField label="Experience Label" value={data.hero.experience} onChange={(v: any) => updateHero("experience", v)} />
                  <InputField label="Projects Count Label" value={data.hero.projectsCount} onChange={(v: any) => updateHero("projectsCount", v)} />
                  <InputField label="Tech Stack Label" value={data.hero.techStack} onChange={(v: any) => updateHero("techStack", v)} />
                </div>
                <InputField label="GitHub Portfolio Link" value={data.hero.github} onChange={(v: any) => updateHero("github", v)} />
                <InputField label="LinkedIn Profile Link" value={data.hero.linkedin} onChange={(v: any) => updateHero("linkedin", v)} />
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === "stats" && (
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-white">Metrics & Stats</h2>
                <p className="text-xs text-neutral-400 mt-1">Edit key numbers displayed on the primary landing strip.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {data.stats.map((stat: any, index: number) => (
                  <div key={index} className="p-5 rounded-2xl border border-white/5 bg-neutral-900/40 space-y-4">
                    <div className="text-xs font-mono text-amber-500/80 font-bold">Metric Card #{index + 1}</div>
                    <InputField label="Value (Number)" value={stat.value} onChange={(v: any) => updateStat(index, "value", v)} />
                    <InputField label="Suffix (e.g. +, %)" value={stat.suffix} onChange={(v: any) => updateStat(index, "suffix", v)} />
                    <InputField label="Label / Description" value={stat.label} onChange={(v: any) => updateStat(index, "label", v)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Dynamic Services ({data.services.length})</h2>
                  <p className="text-xs text-neutral-400 mt-1">Manage core development offerings and skills cards.</p>
                </div>
                <button
                  onClick={addService}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold font-mono bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white transition-all duration-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  ADD SERVICE
                </button>
              </div>
              <div className="space-y-4">
                {data.services.map((service: any, index: number) => (
                  <div key={index} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm space-y-5">
                    <div className="flex items-start justify-between">
                      <div className="text-xs font-mono text-amber-500 font-bold">Offer #{index + 1}: {service.title}</div>
                      <button
                        onClick={() => deleteService(index)}
                        className="p-2 rounded-full border border-red-500/10 hover:border-red-500/20 text-neutral-400 hover:text-red-400 transition-colors bg-red-500/5 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField label="Service Title" value={service.title} onChange={(v: any) => updateService(index, "title", v)} />
                      <InputField label="Icon Name (Lucide)" value={service.icon} onChange={(v: any) => updateService(index, "icon", v)} />
                      <div className="md:col-span-2">
                        <InputField label="Description" value={service.desc} onChange={(v: any) => updateService(index, "desc", v)} multiline />
                      </div>
                      <CommaSeparatedInput label="Tags (comma-separated)" value={service.tags} onChange={(v) => updateService(index, "tags", v)} />
                      <InputField label="Accent Color Hex" value={service.accent} onChange={(v: any) => updateService(index, "accent", v)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing & Offers Tab */}
          {activeTab === "pricing" && data?.pricing && (
            <div className="space-y-8">
              {/* Section Headers config */}
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Pricing & Offer Config</h2>
                  <p className="text-xs text-neutral-400 mt-1">Configure pricing headers, launch offers, perks, and packages.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField label="Pricing Section Title" value={data.pricing.title || ""} onChange={(v: any) => updatePricingField("title", v)} />
                  <div className="md:col-span-2">
                    <InputField label="Pricing Section Subtext" value={data.pricing.description || ""} onChange={(v: any) => updatePricingField("description", v)} multiline />
                  </div>
                </div>
              </div>

              {/* Startup Launch Offer */}
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-6">
                <div>
                  <h3 className="text-base font-bold font-display text-white">Launch Promo & Perks</h3>
                  <p className="text-xs text-neutral-400 mt-1">Configure parameters for the startup launch deal block.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <InputField label="Offer Badge Title" value={data.pricing.offerTitle || ""} onChange={(v: any) => updatePricingField("offerTitle", v)} />
                  <InputField label="Discount highlight (e.g. 20% OFF)" value={data.pricing.offerDiscount || ""} onChange={(v: any) => updatePricingField("offerDiscount", v)} />
                  <div className="md:col-span-3">
                    <InputField label="Promo paragraph text" value={data.pricing.offerDescription || ""} onChange={(v: any) => updatePricingField("offerDescription", v)} multiline />
                  </div>
                </div>

                <div className="h-px bg-white/5 my-4" />
                <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">Promo Perks List (3 Perks)</h4>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {data.pricing.offerPerks?.map((perk: any, index: number) => (
                    <div key={index} className="p-4 rounded-2xl border border-white/5 bg-neutral-900/40 space-y-3">
                      <div className="text-[10px] font-mono text-amber-500 font-bold">Perk #{index + 1}</div>
                      <InputField label="Perk Title" value={perk.title || ""} onChange={(v: any) => updateOfferPerk(index, "title", v)} />
                      <InputField label="Perk Subtext" value={perk.desc || ""} onChange={(v: any) => updateOfferPerk(index, "desc", v)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Cards Configuration */}
              <div className="space-y-4">
                <h3 className="text-base font-bold font-display text-white px-2">Four Plans Config</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.pricing.plans?.map((plan: any, index: number) => (
                    <div key={index} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-500 font-bold uppercase">{plan.name} Plan</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={plan.popular || false}
                            onChange={(e) => updatePricingPlan(index, "popular", e.target.checked)}
                            className="w-3.5 h-3.5 rounded accent-amber-500"
                          />
                          <label className="text-[11px] font-mono text-neutral-400 uppercase">Popular Card</label>
                        </div>
                      </div>
                      <InputField label="Plan Name" value={plan.name || ""} onChange={(v: any) => updatePricingPlan(index, "name", v)} />
                      <InputField label="Price / Option text" value={plan.price || ""} onChange={(v: any) => updatePricingPlan(index, "price", v)} />
                      <InputField label="Plan Short description" value={plan.desc || ""} onChange={(v: any) => updatePricingPlan(index, "desc", v)} multiline />
                      <InputField label="Call-To-Action text" value={plan.cta || ""} onChange={(v: any) => updatePricingPlan(index, "cta", v)} />
                      <CommaSeparatedInput label="Plan Features list (comma-separated)" value={plan.features || []} onChange={(v) => updatePricingPlan(index, "features", v)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Starting Estimates Baseline */}
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-6">
                <div>
                  <h3 className="text-base font-bold font-display text-white">Starting Estimates rates</h3>
                  <p className="text-xs text-neutral-400 mt-1">Adjust baseline prices displayed for starting estimation blocks.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.pricing.startingEstimates?.map((item: any, index: number) => (
                    <div key={index} className="p-4 rounded-2xl border border-white/5 bg-neutral-900/40 grid grid-cols-2 gap-3 items-center">
                      <div className="col-span-2 text-[10px] font-mono text-amber-500 font-bold uppercase">{item.service}</div>
                      <InputField label="Service Name" value={item.service || ""} onChange={(v: any) => updateStartingEstimate(index, "service", v)} />
                      <InputField label="Estimate Price" value={item.price || ""} onChange={(v: any) => updateStartingEstimate(index, "price", v)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Featured Projects ({data.projects.length})</h2>
                  <p className="text-xs text-neutral-400 mt-1">Manage items displayed in your developer project showcase.</p>
                </div>
                <button
                  onClick={addProject}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold font-mono bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white transition-all duration-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  ADD PROJECT
                </button>
              </div>
              <div className="space-y-4">
                {data.projects.map((project: any, index: number) => (
                  <div
                    key={project.id}
                    draggable
                    onDragStart={(e) => {
                      setDraggedProjectIndex(index);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedProjectIndex === null || draggedProjectIndex === index) return;
                      const updatedProjects = [...data.projects];
                      const [removed] = updatedProjects.splice(draggedProjectIndex, 1);
                      updatedProjects.splice(index, 0, removed);
                      setData({ ...data, projects: updatedProjects });
                      setDraggedProjectIndex(null);
                    }}
                    onDragEnd={() => setDraggedProjectIndex(null)}
                    className="p-6 rounded-2xl border transition-all duration-300 bg-white/[0.01] space-y-4 cursor-move"
                    style={{ 
                      borderColor: editingId === project.id ? "var(--accent)" : "rgba(255,255,255,0.05)",
                      opacity: draggedProjectIndex === index ? 0.4 : 1
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-neutral-500 cursor-grab active:cursor-grabbing hover:text-white transition-colors">
                          <GripVertical className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-semibold text-white font-mono">{project.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingId(editingId === project.id ? null : project.id)}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            editingId === project.id 
                              ? "bg-amber-500 text-neutral-950" 
                              : "border border-white/5 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
                          }`}
                        >
                          {editingId === project.id ? <Check className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 rounded-full border border-red-500/10 hover:border-red-500/20 text-neutral-400 hover:text-red-400 transition-colors bg-red-500/5 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {editingId === project.id && (
                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/5 space-y-1">
                        <InputField label="Project Title" value={project.title} onChange={(v: any) => updateProject(project.id, "title", v)} />
                        <InputField label="Category / Type" value={project.category} onChange={(v: any) => updateProject(project.id, "category", v)} />
                        <div className="md:col-span-2">
                          <InputField label="Description Text" value={project.desc} onChange={(v: any) => updateProject(project.id, "desc", v)} multiline />
                        </div>
                        <div className="md:col-span-2">
                          <InputField label="Image URL link (optional)" value={project.image} onChange={(v: any) => updateProject(project.id, "image", v)} placeholder="https://example.com/mock.jpg" />
                        </div>
                        <InputField label="GitHub Repo URL" value={project.github} onChange={(v: any) => updateProject(project.id, "github", v)} />
                        <InputField label="Live Site URL" value={project.live} onChange={(v: any) => updateProject(project.id, "live", v)} />
                        <InputField label="Project Year" value={project.year} onChange={(v: any) => updateProject(project.id, "year", v)} />
                        <InputField label="Accent Color Hex code" value={project.color} onChange={(v: any) => updateProject(project.id, "color", v)} />
                        <div className="md:col-span-2">
                          <CommaSeparatedInput label="Project Tags (comma-separated)" value={project.tags} onChange={(v) => updateProject(project.id, "tags", v)} />
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            checked={project.featured}
                            onChange={(e) => updateProject(project.id, "featured", e.target.checked)}
                            className="w-3.5 h-3.5 rounded accent-amber-500"
                          />
                          <label className="text-xs text-neutral-400 font-mono uppercase">Featured Work</label>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Studies Tab */}
          {activeTab === "studies" && (
            <div className="space-y-8">
              {/* Education */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Education Timeline ({data.studies.education.length})</h2>
                    <p className="text-xs text-neutral-400 mt-1">Configure academic degrees and locations.</p>
                  </div>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold font-mono bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white transition-all duration-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    ADD EDUCATION
                  </button>
                </div>
                <div className="space-y-4">
                  {data.studies.education.map((edu: any, index: number) => (
                    <div key={index} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="text-xs font-mono text-amber-500 font-bold uppercase">{edu.degree || "New Education item"}</div>
                        <button
                          onClick={() => deleteEducation(index)}
                          className="p-2 rounded-full border border-red-500/10 hover:border-red-500/20 text-neutral-400 hover:text-red-400 transition-colors bg-red-500/5 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Degree / Field" value={edu.degree} onChange={(v: any) => updateEducation(index, "degree", v)} />
                        <InputField label="Institution / School" value={edu.institution} onChange={(v: any) => updateEducation(index, "institution", v)} />
                        <InputField label="Attendance Period" value={edu.period} onChange={(v: any) => updateEducation(index, "period", v)} />
                        <InputField label="Location / City" value={edu.location} onChange={(v: any) => updateEducation(index, "location", v)} />
                        <InputField label="Grade / Score" value={edu.grade} onChange={(v: any) => updateEducation(index, "grade", v)} />
                        <CommaSeparatedInput label="Highlights (comma-separated)" value={edu.highlights} onChange={(v) => {
                          const newEducation = [...data.studies.education];
                          newEducation[index].highlights = v;
                          setData({ ...data, studies: { ...data.studies, education: newEducation } });
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Certifications ({data.studies.certifications.length})</h2>
                    <p className="text-xs text-neutral-400 mt-1">Configure development courses and issuer credentials.</p>
                  </div>
                  <button
                    onClick={addCertification}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold font-mono bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white transition-all duration-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    ADD CERT
                  </button>
                </div>
                <div className="space-y-4">
                  {data.studies.certifications.map((cert: any, index: number) => (
                    <div key={index} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="text-xs font-mono text-amber-500 font-bold uppercase">{cert.name || "New Certification"}</div>
                        <button
                          onClick={() => deleteCertification(index)}
                          className="p-2 rounded-full border border-red-500/10 hover:border-red-500/20 text-neutral-400 hover:text-red-400 transition-colors bg-red-500/5 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <InputField label="Certificate Name" value={cert.name} onChange={(v: any) => updateCertification(index, "name", v)} />
                        <InputField label="Issuer Org" value={cert.issuer} onChange={(v: any) => updateCertification(index, "issuer", v)} />
                        <InputField label="Acquired Year" value={cert.year} onChange={(v: any) => updateCertification(index, "year", v)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Client Testimonials ({data.testimonials.length})</h2>
                  <p className="text-xs text-neutral-400 mt-1">Edit client statements and ratings displayed as social proof.</p>
                </div>
                <button
                  onClick={addTestimonial}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold font-mono bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white transition-all duration-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  ADD TESTIMONIAL
                </button>
              </div>
              <div className="space-y-4">
                {data.testimonials.map((testimonial: any) => (
                  <div key={testimonial.id} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="text-xs font-mono text-amber-500 font-bold uppercase">{testimonial.name}</div>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="p-2 rounded-full border border-red-500/10 hover:border-red-500/20 text-neutral-400 hover:text-red-400 transition-colors bg-red-500/5 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField label="Client Name" value={testimonial.name} onChange={(v: any) => updateTestimonial(testimonial.id, "name", v)} />
                      <InputField label="Client Role" value={testimonial.role} onChange={(v: any) => updateTestimonial(testimonial.id, "role", v)} />
                      <InputField label="Company Name" value={testimonial.company} onChange={(v: any) => updateTestimonial(testimonial.id, "company", v)} />
                      <InputField label="Avatar initials" value={testimonial.avatar} onChange={(v: any) => updateTestimonial(testimonial.id, "avatar", v)} />
                      <InputField label="Avatar Accent Color" value={testimonial.avatarColor} onChange={(v: any) => updateTestimonial(testimonial.id, "avatarColor", v)} />
                      <InputField label="Project Completed" value={testimonial.project} onChange={(v: any) => updateTestimonial(testimonial.id, "project", v)} />
                      <div className="md:col-span-2">
                        <InputField label="Rating Stars (1-5)" value={testimonial.rating} type="number" onChange={(v: any) => updateTestimonial(testimonial.id, "rating", parseInt(v) || 5)} />
                      </div>
                      <div className="md:col-span-2">
                        <InputField label="Testimonial Quote text" value={testimonial.text} onChange={(v: any) => updateTestimonial(testimonial.id, "text", v)} multiline />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Freelance Tab */}
          {activeTab === "freelance" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Freelance Works ({data.freelance.projects.length})</h2>
                  <p className="text-xs text-neutral-400 mt-1">Manage completed contract works and company records.</p>
                </div>
                <button
                  onClick={addFreelance}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold font-mono bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white transition-all duration-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  ADD FREELANCE
                </button>
              </div>
              <div className="space-y-4">
                {data.freelance.projects.map((project: any, index: number) => (
                  <div 
                    key={project.id} 
                    draggable
                    onDragStart={(e) => {
                      setDraggedFreelanceIndex(index);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedFreelanceIndex === null || draggedFreelanceIndex === index) return;
                      const updatedFreelance = [...data.freelance.projects];
                      const [removed] = updatedFreelance.splice(draggedFreelanceIndex, 1);
                      updatedFreelance.splice(index, 0, removed);
                      setData({
                        ...data,
                        freelance: {
                          ...data.freelance,
                          projects: updatedFreelance
                        }
                      });
                      setDraggedFreelanceIndex(null);
                    }}
                    onDragEnd={() => setDraggedFreelanceIndex(null)}
                    className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4 cursor-move"
                    style={{
                      opacity: draggedFreelanceIndex === index ? 0.4 : 1
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-neutral-500 cursor-grab active:cursor-grabbing hover:text-white transition-colors">
                          <GripVertical className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-mono text-amber-500 font-bold uppercase">{project.client} - {project.title}</div>
                      </div>
                      <button
                        onClick={() => deleteFreelance(project.id)}
                        className="p-2 rounded-full border border-red-500/10 hover:border-red-500/20 text-neutral-400 hover:text-red-400 transition-colors bg-red-500/5 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField label="Company Name" value={project.client} onChange={(v: any) => updateFreelance(project.id, "client", v)} />
                      <InputField label="Project Title" value={project.title} onChange={(v: any) => updateFreelance(project.id, "title", v)} />
                      <div className="md:col-span-2">
                        <InputField label="Description" value={project.desc} onChange={(v: any) => updateFreelance(project.id, "desc", v)} multiline />
                      </div>
                      <InputField label="Duration Label" value={project.duration} onChange={(v: any) => updateFreelance(project.id, "duration", v)} />
                      <InputField label="Budget Label" value={project.budget} onChange={(v: any) => updateFreelance(project.id, "budget", v)} />
                      <InputField label="Project Status" value={project.status} onChange={(v: any) => updateFreelance(project.id, "status", v)} />
                      <InputField label="Accent Color Hex" value={project.color} onChange={(v: any) => updateFreelance(project.id, "color", v)} />
                      <InputField label="Project Category" value={project.category} onChange={(v: any) => updateFreelance(project.id, "category", v)} />
                      <InputField label="GitHub Repo URL" value={project.github || ""} onChange={(v: any) => updateFreelance(project.id, "github", v)} />
                      <InputField label="Live Site URL" value={project.live || ""} onChange={(v: any) => updateFreelance(project.id, "live", v)} />
                      <div className="md:col-span-2">
                        <CommaSeparatedInput label="Tags (comma-separated)" value={project.tags} onChange={(v) => updateFreelance(project.id, "tags", v)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-white">Contact & Connect Options</h2>
                <p className="text-xs text-neutral-400 mt-1">Configure email inbox destinations, location and service items checklist.</p>
              </div>
              <div className="space-y-4">
                <InputField label="Primary Contact Email" value={data.contact.email} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, email: v } })} />
                <InputField label="Office / Base Location" value={data.contact.location} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, location: v } })} />
                <InputField label="Weekly Availability Status" value={data.contact.availability} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, availability: v } })} />
                <InputField label="Footer Header Part 1" value={data.contact.title1} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, title1: v } })} />
                <InputField label="Footer Header Part 2" value={data.contact.title2} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, title2: v } })} />
                <InputField label="Call-To-Action Description" value={data.contact.description} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, description: v } })} multiline />
                <CommaSeparatedInput label="Services items list (comma-separated)" value={data.contact.services} onChange={(v) => setData({ ...data, contact: { ...data.contact, services: v } })} />
              </div>
            </div>
          )}

          {/* Section Visibility Tab */}
          {activeTab === "visibility" && (
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-white">Landing Page Section Status</h2>
                <p className="text-xs text-neutral-400 mt-1">Activate or deactivate specific sections of your main landing page dynamically.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: "hero", label: "Hero Banner" },
                  { key: "marquee", label: "Scrolling Ticker Bar" },
                  { key: "about", label: "About Agency Section" },
                  { key: "stats", label: "Performance Metrics strip" },
                  { key: "services", label: "Services Offerings Grid" },
                  { key: "studies", label: "Case Studies / Education" },
                  { key: "projects", label: "Featured Projects Showcases" },
                  { key: "freelance", label: "Freelance Projects Section" },
                  { key: "pricing", label: "Pricing & Quotation Plans" },
                  { key: "testimonials", label: "Client Testimonials Slider" },
                  { key: "contact", label: "Contact & Lead Form Panel" },
                ].map(({ key, label }) => {
                  const visibilityState = data.sectionVisibility || {};
                  const isSectionActive = visibilityState[key] !== false;
                  
                  const handleToggle = () => {
                    const nextVisibility = {
                      ...visibilityState,
                      [key]: !isSectionActive
                    };
                    setData({
                      ...data,
                      sectionVisibility: nextVisibility
                    });
                  };

                  return (
                    <div key={key} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-neutral-900/40">
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">{label}</span>
                      <button
                        onClick={handleToggle}
                        className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all duration-300 hover:scale-105 active:scale-95 ${
                          isSectionActive 
                            ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950" 
                            : "bg-neutral-800 hover:bg-neutral-700 text-neutral-400"
                        }`}
                      >
                        {isSectionActive ? "ACTIVE" : "INACTIVE"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
