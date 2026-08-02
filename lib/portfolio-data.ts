export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    email: string;
    location: string;
    availability: string;
    github: string;
    linkedin: string;
    heroTitle: string;
    heroSubtitle: string;
  };
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    technologiesCount: number;
    happyClients: number;
  };
  services: {
    title: string;
    description: string;
    items: Array<{
      id: string;
      number?: string;
      badge?: string;
      title: string;
      desc?: string;
      description: string;
      icon: string;
      image?: string;
      tags?: string[];
      features?: string[];
      accent?: string;
      glow?: string;
      linkText?: string;
      linkUrl?: string;
    }>;
  };
  projects: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      tags: string[];
      github?: string;
      live?: string;
      duration: string;
    }>;
  };
  studies: {
    title: string;
    items: Array<{
      id: string;
      degree: string;
      institution: string;
      duration: string;
      description: string;
    }>;
  };
  testimonials: {
    title: string;
    items: Array<{
      id: string;
      name: string;
      role: string;
      company: string;
      content: string;
      image: string;
    }>;
  };
  freelance: {
    title: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      client: string;
      duration: string;
      description: string;
      tags: string[];
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    email: string;
    phone: string;
    location: string;
    availability: string;
    github: string;
    linkedin: string;
    twitter?: string;
    whatsapp?: string;
    services: string[];
  };
  pricing: {
    title: string;
    description: string;
    offerTitle: string;
    offerDiscount: string;
    offerDescription: string;
    offerPerks: Array<{
      title: string;
      desc: string;
    }>;
    plans: Array<{
      name: string;
      price: string;
      desc: string;
      features: string[];
      cta: string;
      popular: boolean;
    }>;
    startingEstimates: Array<{
      service: string;
      price: string;
      color: string;
    }>;
  };
  about: {
    badgeText?: string;
    title: string;
    titleEmphasis: string;
    description1: string;
    description2: string;
    focusAreasLabel?: string;
    focusAreas?: string[];
    authorName?: string;
    authorRole?: string;
    visionBadge?: string;
    visionTitle?: string;
    visionQuote?: string;
    teamEvolutionNote?: string;
    companyHighlights?: Array<{
      label: string;
      value: string;
      desc: string;
    }>;
    page?: {
      heroBadge?: string;
      heroTitle?: string;
      heroSubtitle?: string;
      storyTitle?: string;
      storyParagraph1?: string;
      storyParagraph2?: string;
      team?: Array<{
        id: string;
        name: string;
        role: string;
        bio: string;
        image: string;
        icon?: string;
        skills: string[];
        github?: string;
        linkedin?: string;
      }>;
      values?: Array<{
        id: string;
        title: string;
        desc: string;
        icon: string;
      }>;
      milestones?: Array<{
        id: string;
        year: string;
        title: string;
        desc: string;
      }>;
    };
  };
}

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: "AeroPeak",
    title: "Website & Mobile App Development Company",
    email: "contact.aeropeak@gmail.com",
    location: "Coimbatore, Tamil Nadu, India",
    availability: "Mon–Fri, 9AM–6PM IST",
    github: "https://github.com/19jayaprakash",
    linkedin: "https://www.linkedin.com/in/jayaprakash-r-218968310/",
    heroTitle: "Engineering Digital Excellence",
    heroSubtitle: "AeroPeak is a website and mobile app development company in Coimbatore specializing in Next.js, React, Laravel, UI/UX design, SEO, and custom software solutions.",
  },
  stats: {
    yearsExperience: 3,
    projectsCompleted: 25,
    technologiesCount: 15,
    happyClients: 20,
  },
  services: {
    title: "Services",
    description: "Comprehensive development solutions tailored to your needs",
    items: [
      {
        id: "1",
        number: "01",
        badge: "FULL-STACK DEV",
        title: "Full-Stack Development",
        desc: "End-to-end web applications engineered with Next.js, Node.js, and cloud database backend architectures.",
        description: "End-to-end web applications engineered with Next.js, Node.js, and cloud database backend architectures.",
        icon: "Code2",
        image: "/images/service_fullstack.jpg",
        tags: ["Next.js", "React", "Node.js", "Supabase", "TypeScript"],
        accent: "#C8956B",
        glow: "rgba(200,149,107,0.25)",
        linkText: "Full-Stack Architecture ↗",
        linkUrl: "/projects"
      },
      {
        id: "2",
        number: "02",
        badge: "UI/UX DESIGN",
        title: "UI/UX Design",
        desc: "Beautiful, intuitive design systems, responsive wireframes, micro-interactions, and glassmorphic interfaces.",
        description: "Beautiful, intuitive design systems, responsive wireframes, micro-interactions, and glassmorphic interfaces.",
        icon: "Palette",
        image: "/images/service_uiux.jpg",
        tags: ["Figma", "Prototyping", "Design System", "Micro-Interactions"],
        accent: "#EC4899",
        glow: "rgba(236,72,153,0.2)",
        linkText: "Figma Systems ↗",
        linkUrl: "/projects"
      },
      {
        id: "3",
        number: "03",
        badge: "MOBILE APP DEV",
        title: "Mobile App Development",
        desc: "Cross-platform iOS and Android mobile applications built for high performance with React Native and Expo.",
        description: "Cross-platform iOS and Android mobile applications built for high performance with React Native and Expo.",
        icon: "Smartphone",
        image: "/images/service_mobile.jpg",
        tags: ["React Native", "Expo", "iOS", "Android", "Redux"],
        accent: "#6366F1",
        glow: "rgba(99,102,241,0.2)",
        linkText: "Mobile Showcase ↗",
        linkUrl: "/projects"
      },
      {
        id: "4",
        number: "04",
        badge: "E-COMMERCE UI/UX",
        title: "E-Commerce Solutions",
        desc: "A sleek, conversion-focused e-commerce application featuring intuitive product discovery, visual filter systems, instant checkout flow, wishlist management, and detailed product showcase layouts.",
        description: "A sleek, conversion-focused e-commerce application featuring intuitive product discovery, visual filter systems, instant checkout flow, wishlist management, and detailed product showcase layouts.",
        icon: "ShoppingCart",
        image: "/images/service_ecommerce.jpg",
        tags: ["Figma", "Next.js", "Stripe", "Prototyping", "Cart Systems"],
        accent: "#F59E0B",
        glow: "rgba(245,158,11,0.2)",
        linkText: "E-Commerce Experience ↗",
        linkUrl: "/projects"
      }
    ],
  },
  projects: {
    title: "Featured Projects",
    items: [
      {
        id: "1",
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce platform with payment integration, admin dashboard, and real-time inventory management.",
        image: "/images/photo1.jpg",
        tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
        github: "https://github.com",
        live: "https://example.com",
        duration: "3 months",
      },
      {
        id: "2",
        title: "Task Management App",
        description: "Collaborative task management tool with real-time updates, team features, and analytics dashboard.",
        image: "/images/photo2.jpg",
        tags: ["React", "TypeScript", "Firebase", "Tailwind"],
        github: "https://github.com",
        live: "https://example.com",
        duration: "2 months",
      },
      {
        id: "3",
        title: "Portfolio Website",
        description: "Modern portfolio website with smooth animations, dark mode, and responsive design.",
        image: "/images/photo3.jpg",
        tags: ["Next.js", "Framer Motion", "GSAP", "Tailwind"],
        github: "https://github.com",
        live: "https://example.com",
        duration: "1 month",
      },
    ],
  },
  studies: {
    title: "Education",
    items: [
      {
        id: "1",
        degree: "Bachelor of Technology in Computer Science",
        institution: "University Name",
        duration: "2020 - 2024",
        description: "Focused on software engineering, data structures, and web development.",
      },
    ],
  },
  testimonials: {
    title: "Client Testimonials",
    items: [
      {
        id: "1",
        name: "John Doe",
        role: "CEO",
        company: "Tech Startup",
        content: "Exceptional work! Delivered the project on time with outstanding quality. Highly recommended.",
        image: "/images/photo1.jpg",
      },
      {
        id: "2",
        name: "Jane Smith",
        role: "Product Manager",
        company: "Digital Agency",
        content: "Great communication and technical skills. The final product exceeded our expectations.",
        image: "/images/photo2.jpg",
      },
    ],
  },
  freelance: {
    title: "Freelance Projects",
    description: "Selected freelance work and collaborations",
    items: [
      {
        id: "1",
        title: "Corporate Website Redesign",
        client: "Tech Corp",
        duration: "2 months",
        description: "Complete redesign and development of corporate website with CMS integration.",
        tags: ["React", "Next.js", "Sanity CMS"],
      },
      {
        id: "2",
        title: "Mobile App Development",
        client: "StartupXYZ",
        duration: "4 months",
        description: "Cross-platform mobile application with real-time features and offline support.",
        tags: ["React Native", "Firebase", "Redux"],
      },
    ],
  },
  contact: {
    title: "Let's build",
    subtitle: "something great",
    description: "Have a project in mind or want to discuss opportunities? I'm always open to new challenges and interesting work. Let's connect!",
    email: "contact.aeropeak@gmail.com",
    phone: "+91 98765 43210",
    location: "Coimbatore, Tamil Nadu, India",
    availability: "Mon–Fri, 9AM–6PM IST",
    github: "https://github.com/19jayaprakash",
    linkedin: "https://www.linkedin.com/in/jayaprakash-r-218968310/",
    twitter: "",
    whatsapp: "",
    services: ["Full-Stack Web App", "UI/UX Design", "Mobile App", "E-Commerce", "Design System"],
  },
  pricing: {
    title: "Pricing",
    description: "Startup-friendly rates designed to deliver maximum quality without surprise invoices. Choose a plan or request a custom quotation based on your exact specifications.",
    offerTitle: "Startup Launch Offer",
    offerDiscount: "20% OFF",
    offerDescription: "Helping early-stage startups and small businesses kickstart their digital presence with zero compromise on engineering and visual quality.",
    offerPerks: [
      { title: "1 Year Maintenance", desc: "Security and content support" },
      { title: "Free Basic SEO", desc: "Rank higher on Google" },
      { title: "Free Deployment Support", desc: "Domain, Vercel, Supabase" }
    ],
    plans: [
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
          "Free Deployment Support"
        ],
        cta: "Start Project",
        popular: false
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
          "Custom UI/UX (Zero Templates)"
        ],
        cta: "Scale Your Business",
        popular: true
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
          "Priority Maintenance & Support"
        ],
        cta: "Launch Store",
        popular: false
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
          "Direct Slack/WhatsApp Developer Support"
        ],
        cta: "Schedule Consultation",
        popular: false
      }
    ],
    startingEstimates: [
      { service: "Website Development", price: "Starting from ₹9,999", color: "#C8956B" },
      { service: "Mobile App Development", price: "Starting from ₹39,999", color: "#6366F1" },
      { service: "E-commerce Solutions", price: "Starting from ₹39,999", color: "#14B8A6" },
      { service: "Custom Software", price: "Contact Us", color: "#EC4899" }
    ]
  },
  about: {
    badgeText: "OUR APPROACH",
    title: "We engineer your",
    titleEmphasis: "digital growth engine.",
    description1: "At AeroPeak, we see software engineering not as a simple project, but as a calculated digital investment. Led by our core team of full-stack developers, UI/UX strategists, and cloud architects based in Coimbatore, our agile team specializes in blending creative design with production-grade technical rigor.",
    description2: "Rooted in South India, built to global standards — we partner with ambitious founders, startups, and enterprise teams to transform potential into measurable market leadership.",
    focusAreasLabel: "PERFORMANCE FOCUS AREAS",
    focusAreas: [
      "Custom Web Applications (Next.js/React)",
      "Cross-Platform Mobile Apps (React Native)",
      "UI/UX Design Systems & Micro-Interactions",
      "Scalable Cloud Infrastructure & Supabase APIs",
      "Core Web Vitals & SEO Performance"
    ],
    authorName: "R. Jayaprakash & Engineering Team",
    authorRole: "Founder & Core Engineers, AeroPeak",
    visionBadge: "OUR VISION",
    visionTitle: "Driving measurable, sustainable growth",
    visionQuote: "Ambitious, regional, and outcome-driven — establishing AeroPeak as your serious, long-term digital growth partner.",
    teamEvolutionNote: "Engineered by a specialized team of full-stack developers, mobile engineers, UI/UX designers, and DevOps specialists focused on crafting world-class digital experiences.",
    companyHighlights: [
      { label: "Engineering Team", value: "Multi-disciplinary", desc: "Full-stack devs, UI/UX designers & cloud architects" },
      { label: "Client Satisfaction", value: "99.4%", desc: "On-time delivery & transparent communication" },
      { label: "Global Reach", value: "25+ Apps", desc: "Deployed across web, iOS, Android & cloud" }
    ],
    page: {
      heroBadge: "About AeroPeak Digital Agency",
      heroTitle: "Architecting Next-Generation",
      heroSubtitle: "We are a collective of passionate software engineers, product designers, and technology consultants dedicated to building exceptional digital products.",
      storyTitle: "Our Company Evolution",
      storyParagraph1: "AeroPeak began with a singular vision: to eliminate the gap between complex enterprise software engineering and modern visual elegance. Over time, our core team expanded to bring together top talent in Next.js, React Native, Laravel, Cloud Infrastructure, and UI/UX Strategy.",
      storyParagraph2: "Today, operating from Coimbatore, Tamil Nadu, AeroPeak delivers end-to-end web platforms, mobile applications, and custom cloud software for clients across India and globally. We build with longevity, security, and extreme performance in mind.",
      team: [
        {
          id: "1",
          name: "Full-Stack Architecture Team",
          role: "Lead Systems & Cloud Architect",
          bio: "Engineered by R. Jayaprakash & core architects specializing in Next.js, React Native, cloud infrastructure, and production-grade API systems.",
          icon: "Code2",
          image: "",
          skills: ["Next.js", "React Native", "TypeScript", "Node.js", "System Architecture"],
          github: "https://github.com/19jayaprakash",
          linkedin: "https://www.linkedin.com/in/jayaprakash-r-218968310/"
        },
        {
          id: "2",
          name: "UI/UX & Design Engineering",
          role: "UI/UX & Frontend Specialists",
          bio: "Focused on crafting fluid motion animations, interactive micro-interactions, responsive design systems, and modern glassmorphic aesthetics.",
          icon: "Palette",
          image: "",
          skills: ["Figma", "Tailwind CSS", "Framer Motion", "UI Design", "User Research"],
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        },
        {
          id: "3",
          name: "Backend & Cloud Operations",
          role: "Backend & Database Infrastructure",
          bio: "Dedicated to PostgreSQL database optimization, Supabase security, API integrations, real-time sync systems, and Vercel cloud pipelines.",
          icon: "Cpu",
          image: "",
          skills: ["PostgreSQL", "Supabase", "REST & GraphQL", "Docker", "AWS/Vercel"],
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        }
      ],
      values: [
        {
          id: "1",
          title: "Engineering Excellence",
          desc: "We write clean, modular, and maintainable code built to handle high traffic and seamless updates.",
          icon: "Code2"
        },
        {
          id: "2",
          title: "Pixel Precision UI/UX",
          desc: "Every interaction, animation, and color token is crafted for maximum user engagement and clarity.",
          icon: "Palette"
        },
        {
          id: "3",
          title: "High Performance & SEO",
          desc: "Optimized asset delivery, core web vitals, server-side rendering, and rapid response times.",
          icon: "Zap"
        },
        {
          id: "4",
          title: "Transparent Partnership",
          desc: "Direct developer communication, regular project updates, clear milestones, and zero hidden costs.",
          icon: "Users"
        }
      ],
      milestones: [
        {
          id: "1",
          year: "2023",
          title: "Founding & Initial Launch",
          desc: "Started with core freelance web development and client consultations."
        },
        {
          id: "2",
          year: "2024",
          title: "Team & Tech Stack Expansion",
          desc: "Expanded team capabilities into full-stack Next.js, React Native mobile apps, and Supabase cloud solutions."
        },
        {
          id: "3",
          year: "2025",
          title: "25+ Client Deliveries",
          desc: "Successfully launched over 25 custom applications for startups, retail stores, and digital agencies."
        },
        {
          id: "4",
          year: "2026",
          title: "AeroPeak Digital Enterprise",
          desc: "Established full-service agency framework offering web development, mobile applications, and admin control solutions."
        }
      ]
    }
  }
};

export function getFeaturedProjectsList(data: any): any[] {
  if (!data) return [];
  if (Array.isArray(data.projects)) return data.projects;
  if (data.projects && Array.isArray(data.projects.items)) return data.projects.items;
  if (data.projects && Array.isArray(data.projects.projects)) return data.projects.projects;
  return [];
}

export function getFreelanceProjectsList(data: any): any[] {
  if (!data) return [];
  if (Array.isArray(data.freelance)) return data.freelance;
  if (data.freelance && Array.isArray(data.freelance.projects)) return data.freelance.projects;
  if (data.freelance && Array.isArray(data.freelance.items)) return data.freelance.items;
  return [];
}

export function getAllProjectsList(data: any): any[] {
  const featured = getFeaturedProjectsList(data).map((p: any) => ({ ...p, type: p.type || "Featured" }));
  const freelance = getFreelanceProjectsList(data).map((p: any) => ({ ...p, type: p.type || "Freelance" }));
  return [...featured, ...freelance];
}

export function findProjectById(data: any, id: string | number): any | null {
  if (!id) return null;
  const allProjects = getAllProjectsList(data);
  const targetId = String(id).trim();
  return allProjects.find((p: any) => p && String(p.id).trim() === targetId) || null;
}

