"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, Save, CheckCircle,
  User, BarChart3, FolderOpen, BookOpen, MessageSquare,
  Briefcase, Grid, Mail, Plus, Trash2, Image as ImageIcon, Edit2
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("hero");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

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
          setData(result.data);
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
      highlights: ["Highlight 1", "Highlight 2"]
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
      client: "Client Name",
      title: "Project Title",
      desc: "Project description",
      tags: ["React"],
      duration: "3 months",
      budget: "Rs 10,000",
      rating: 5,
      status: "Completed",
      color: "#22C55E",
      category: "Web App"
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white text-lg font-mono">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white text-lg">No data found. Please run the SQL setup in Supabase.</p>
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "Hero", icon: User },
    { id: "stats", label: "Stats", icon: BarChart3 },
    { id: "services", label: "Services", icon: Grid },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "studies", label: "Studies", icon: BookOpen },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "freelance", label: "Freelance", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const InputField = ({ label, value, onChange, multiline = false }: any) => (
    <div>
      <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none"
          style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
          style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-6 py-4 border-b"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-black tracking-tight" style={{ color: "var(--accent-primary)" }}>
              JP
            </div>
            <div className="h-6 w-px" style={{ background: "var(--border)" }} />
            <h1 className="text-sm font-mono uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {saved && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: "var(--success)/10", border: "1px solid var(--success)/30" }}>
                <CheckCircle className="w-4 h-4" style={{ color: "var(--success)" }} />
                <span className="text-sm font-medium" style={{ color: "var(--success)" }}>Saved!</span>
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
              style={{ background: "var(--accent-primary)", color: "#FFFFFF" }}
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleLogout}
              className="p-3 rounded-xl transition-all duration-300 hover:scale-105"
              style={{ background: "var(--bg-primary)", border: "1px solid var(--border)" }}
            >
              <LogOut className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingId(null);
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 hover:scale-105"
                style={{
                  background: activeTab === tab.id ? "var(--accent-primary)" : "var(--surface)",
                  color: activeTab === tab.id ? "#FFFFFF" : "var(--text-secondary)",
                  border: `1px solid ${activeTab === tab.id ? "var(--accent-primary)" : "var(--border)"}`,
                }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Hero Tab */}
          {activeTab === "hero" && (
            <div className="p-6 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Hero Section</h2>
              <div className="space-y-4">
                <InputField label="Status Badge" value={data.hero.status} onChange={(v: any) => updateHero("status", v)} />
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                    Title Words (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={data.hero.titleWords.join(", ")}
                    onChange={(e) => updateHero("titleWords", e.target.value.split(",").map((s: string) => s.trim()))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                    style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                    Roles (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={data.hero.roles.join(", ")}
                    onChange={(e) => updateHero("roles", e.target.value.split(",").map((s: string) => s.trim()))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                    style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                  />
                </div>
                <InputField label="Description" value={data.hero.description} onChange={(v: any) => updateHero("description", v)} multiline />
                <div className="grid md:grid-cols-3 gap-4">
                  <InputField label="Experience" value={data.hero.experience} onChange={(v: any) => updateHero("experience", v)} />
                  <InputField label="Projects Count" value={data.hero.projectsCount} onChange={(v: any) => updateHero("projectsCount", v)} />
                  <InputField label="Tech Stack" value={data.hero.techStack} onChange={(v: any) => updateHero("techStack", v)} />
                </div>
                <InputField label="GitHub URL" value={data.hero.github} onChange={(v: any) => updateHero("github", v)} />
                <InputField label="LinkedIn URL" value={data.hero.linkedin} onChange={(v: any) => updateHero("linkedin", v)} />
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === "stats" && (
            <div className="p-6 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Stats Bar</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.stats.map((stat: any, index: number) => (
                  <div key={index} className="p-4 rounded-xl border" style={{ background: "var(--bg-primary)", borderColor: "var(--border)" }}>
                    <InputField label="Value" value={stat.value} onChange={(v: any) => updateStat(index, "value", v)} />
                    <div className="mt-3">
                      <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                        Suffix
                      </label>
                      <input
                        type="text"
                        value={stat.suffix}
                        onChange={(e) => updateStat(index, "suffix", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                        style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                      />
                    </div>
                    <div className="mt-3">
                      <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                        Label
                      </label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateStat(index, "label", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                        style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === "services" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Services ({data.services.length})</h2>
                <button
                  onClick={addService}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: "var(--accent-primary)", color: "#FFFFFF" }}
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>
              <div className="space-y-4">
                {data.services.map((service: any, index: number) => (
                  <div key={index} className="p-6 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{service.title}</h3>
                      <button
                        onClick={() => deleteService(index)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: "var(--error)", background: "var(--error)/10" }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField label="Title" value={service.title} onChange={(v: any) => updateService(index, "title", v)} />
                      <InputField label="Icon" value={service.icon} onChange={(v: any) => updateService(index, "icon", v)} />
                      <div className="md:col-span-2">
                        <InputField label="Description" value={service.desc} onChange={(v: any) => updateService(index, "desc", v)} multiline />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={service.tags.join(", ")}
                          onChange={(e) => updateService(index, "tags", e.target.value.split(",").map((t: string) => t.trim()))}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                          style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                        />
                      </div>
                      <InputField label="Accent Color" value={service.accent} onChange={(v: any) => updateService(index, "accent", v)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Projects ({data.projects.length})</h2>
                <button
                  onClick={addProject}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: "var(--accent-primary)", color: "#FFFFFF" }}
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
              <div className="space-y-6">
                {data.projects.map((project: any) => (
                  <div
                    key={project.id}
                    className="p-6 rounded-2xl border-2 transition-all duration-300"
                    style={{ borderColor: editingId === project.id ? "var(--accent-primary)" : "var(--border)" }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{project.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingId(editingId === project.id ? null : project.id)}
                          className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                          style={{ background: editingId === project.id ? "var(--accent-primary)" : "var(--bg-primary)", color: "#fff" }}
                        >
                          {editingId === project.id ? <CheckCircle className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                          style={{ background: "#EF4444", color: "#fff" }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {editingId === project.id && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <InputField label="Title" value={project.title} onChange={(v: any) => updateProject(project.id, "title", v)} />
                          <InputField label="Category" value={project.category} onChange={(v: any) => updateProject(project.id, "category", v)} />
                          <div className="md:col-span-2">
                            <InputField label="Description" value={project.desc} onChange={(v: any) => updateProject(project.id, "desc", v)} multiline />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                              <ImageIcon className="w-3 h-3 inline mr-1" />
                              Image URL (optional)
                            </label>
                            <input
                              type="text"
                              value={project.image || ""}
                              onChange={(e) => updateProject(project.id, "image", e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                              style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                            />
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Leave empty to show letter icon</p>
                          </div>
                          <InputField label="GitHub URL" value={project.github} onChange={(v: any) => updateProject(project.id, "github", v)} />
                          <InputField label="Live Demo URL" value={project.live} onChange={(v: any) => updateProject(project.id, "live", v)} />
                          <InputField label="Year" value={project.year} onChange={(v: any) => updateProject(project.id, "year", v)} />
                          <InputField label="Accent Color" value={project.color} onChange={(v: any) => updateProject(project.id, "color", v)} />
                          <div className="md:col-span-2">
                            <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                              Tags (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={project.tags.join(", ")}
                              onChange={(e) => updateProject(project.id, "tags", e.target.value.split(",").map((t: string) => t.trim()))}
                              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                              style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={project.featured}
                              onChange={(e) => updateProject(project.id, "featured", e.target.checked)}
                              className="w-4 h-4"
                            />
                            <label className="text-sm" style={{ color: "var(--text-secondary)" }}>Featured</label>
                          </div>
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
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Education ({data.studies.education.length})</h2>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                    style={{ background: "var(--accent-primary)", color: "#FFFFFF" }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Education
                  </button>
                </div>
                <div className="space-y-4">
                  {data.studies.education.map((edu: any, index: number) => (
                    <div key={index} className="p-6 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{edu.degree}</h3>
                        <button
                          onClick={() => deleteEducation(index)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: "var(--error)", background: "var(--error)/10" }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Degree" value={edu.degree} onChange={(v: any) => updateEducation(index, "degree", v)} />
                        <InputField label="Institution" value={edu.institution} onChange={(v: any) => updateEducation(index, "institution", v)} />
                        <InputField label="Period" value={edu.period} onChange={(v: any) => updateEducation(index, "period", v)} />
                        <InputField label="Location" value={edu.location} onChange={(v: any) => updateEducation(index, "location", v)} />
                        <InputField label="Grade" value={edu.grade} onChange={(v: any) => updateEducation(index, "grade", v)} />
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                            Highlights (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={edu.highlights.join(", ")}
                            onChange={(e) => {
                              const newEducation = [...data.studies.education];
                              newEducation[index].highlights = e.target.value.split(",").map((h: string) => h.trim());
                              setData({ ...data, studies: { ...data.studies, education: newEducation } });
                            }}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                            style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Certifications ({data.studies.certifications.length})</h2>
                  <button
                    onClick={addCertification}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                    style={{ background: "var(--accent-primary)", color: "#FFFFFF" }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Certification
                  </button>
                </div>
                <div className="space-y-4">
                  {data.studies.certifications.map((cert: any, index: number) => (
                    <div key={index} className="p-6 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{cert.name}</h3>
                        <button
                          onClick={() => deleteCertification(index)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: "var(--error)", background: "var(--error)/10" }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <InputField label="Name" value={cert.name} onChange={(v: any) => updateCertification(index, "name", v)} />
                        <InputField label="Issuer" value={cert.issuer} onChange={(v: any) => updateCertification(index, "issuer", v)} />
                        <InputField label="Year" value={cert.year} onChange={(v: any) => updateCertification(index, "year", v)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Testimonials ({data.testimonials.length})</h2>
                <button
                  onClick={addTestimonial}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: "var(--accent-primary)", color: "#FFFFFF" }}
                >
                  <Plus className="w-4 h-4" />
                  Add Testimonial
                </button>
              </div>
              <div className="space-y-6">
                {data.testimonials.map((testimonial: any) => (
                  <div key={testimonial.id} className="p-6 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{testimonial.name}</h3>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: "var(--error)", background: "var(--error)/10" }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField label="Name" value={testimonial.name} onChange={(v: any) => updateTestimonial(testimonial.id, "name", v)} />
                      <InputField label="Role" value={testimonial.role} onChange={(v: any) => updateTestimonial(testimonial.id, "role", v)} />
                      <InputField label="Company" value={testimonial.company} onChange={(v: any) => updateTestimonial(testimonial.id, "company", v)} />
                      <InputField label="Avatar Initials" value={testimonial.avatar} onChange={(v: any) => updateTestimonial(testimonial.id, "avatar", v)} />
                      <InputField label="Avatar Color" value={testimonial.avatarColor} onChange={(v: any) => updateTestimonial(testimonial.id, "avatarColor", v)} />
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                          Rating (1-5)
                        </label>
                        <input
                          type="number"
                          value={testimonial.rating}
                          onChange={(e) => updateTestimonial(testimonial.id, "rating", parseInt(e.target.value))}
                          min="1"
                          max="5"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                          style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <InputField label="Testimonial Text" value={testimonial.text} onChange={(v: any) => updateTestimonial(testimonial.id, "text", v)} multiline />
                      </div>
                      <InputField label="Project" value={testimonial.project} onChange={(v: any) => updateTestimonial(testimonial.id, "project", v)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Freelance Tab */}
          {activeTab === "freelance" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Freelance Projects ({data.freelance.projects.length})</h2>
                <button
                  onClick={addFreelance}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: "var(--accent-primary)", color: "#FFFFFF" }}
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
              <div className="space-y-6">
                {data.freelance.projects.map((project: any) => (
                  <div key={project.id} className="p-6 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{project.client}</h3>
                      <button
                        onClick={() => deleteFreelance(project.id)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: "var(--error)", background: "var(--error)/10" }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField label="Client" value={project.client} onChange={(v: any) => updateFreelance(project.id, "client", v)} />
                      <InputField label="Title" value={project.title} onChange={(v: any) => updateFreelance(project.id, "title", v)} />
                      <div className="md:col-span-2">
                        <InputField label="Description" value={project.desc} onChange={(v: any) => updateFreelance(project.id, "desc", v)} multiline />
                      </div>
                      <InputField label="Duration" value={project.duration} onChange={(v: any) => updateFreelance(project.id, "duration", v)} />
                      <InputField label="Budget" value={project.budget} onChange={(v: any) => updateFreelance(project.id, "budget", v)} />
                      <InputField label="Status" value={project.status} onChange={(v: any) => updateFreelance(project.id, "status", v)} />
                      <InputField label="Color" value={project.color} onChange={(v: any) => updateFreelance(project.id, "color", v)} />
                      <div className="md:col-span-2">
                        <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={project.tags.join(", ")}
                          onChange={(e) => updateFreelance(project.id, "tags", e.target.value.split(",").map((t: string) => t.trim()))}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                          style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="p-6 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Contact Section</h2>
              <div className="space-y-4">
                <InputField label="Email" value={data.contact.email} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, email: v } })} />
                <InputField label="Location" value={data.contact.location} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, location: v } })} />
                <InputField label="Availability" value={data.contact.availability} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, availability: v } })} />
                <InputField label="Title Part 1" value={data.contact.title1} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, title1: v } })} />
                <InputField label="Title Part 2" value={data.contact.title2} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, title2: v } })} />
                <InputField label="Description" value={data.contact.description} onChange={(v: any) => setData({ ...data, contact: { ...data.contact, description: v } })} multiline />
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                    Services (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={data.contact.services.join(", ")}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, services: e.target.value.split(",").map((s: string) => s.trim()) } })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                    style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
