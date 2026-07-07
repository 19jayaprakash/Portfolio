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
      title: string;
      description: string;
      icon: string;
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
}

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: "Jayaprakash R",
    title: "Full-Stack Developer & Creative Technologist",
    email: "jayaprakash.r024@gmail.com",
    location: "Coimbatore, Tamil Nadu, India",
    availability: "Mon–Fri, 9AM–6PM IST",
    github: "https://github.com/19jayaprakash",
    linkedin: "https://www.linkedin.com/in/jayaprakash-r-218968310/",
    heroTitle: "Crafting Digital Experiences",
    heroSubtitle: "Full-stack developer specializing in modern web applications, creative interfaces, and scalable solutions.",
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
        title: "Full-Stack Development",
        description: "End-to-end web applications with modern tech stacks",
        icon: "Code",
      },
      {
        id: "2",
        title: "UI/UX Design",
        description: "Beautiful, intuitive interfaces that users love",
        icon: "Palette",
      },
      {
        id: "3",
        title: "Mobile Development",
        description: "Cross-platform mobile apps with React Native",
        icon: "Smartphone",
      },
      {
        id: "4",
        title: "E-Commerce Solutions",
        description: "Scalable online stores with payment integration",
        icon: "ShoppingCart",
      },
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
  }
};
