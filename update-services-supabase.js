require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase env credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const newServices = [
  {
    id: "1",
    number: "01",
    badge: "FULL-STACK DEVELOPMENT",
    title: "Full-Stack Web Development",
    desc: "End-to-end web applications built with modern architectures. From complex relational & document database modeling to high-speed serverless deployment, I engineer production-grade web platforms with seamless real-time data pipelines and robust security.",
    description: "End-to-end web applications built with modern architectures. From complex relational & document database modeling to high-speed serverless deployment, I engineer production-grade web platforms with seamless real-time data pipelines and robust security.",
    icon: "Code2",
    image: "/images/service_fullstack.jpg",
    features: [
      "Custom Web Applications",
      "RESTful & GraphQL APIs",
      "Database Architecture & Supabase",
      "Serverless Cloud Infrastructure",
      "Authentication & OAuth Security"
    ],
    tags: ["React", "Next.js", "Node.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    accent: "#C8956B",
    glow: "rgba(200,149,107,0.3)",
    linkText: "",
    linkUrl: "/projects"
  },
  {
    id: "2",
    number: "02",
    badge: "UI/UX DESIGN",
    title: "UI/UX Design & Product Systems",
    desc: "Beautiful, conversion-oriented digital product design. Crafting intuitive user journeys, wireframes, interactive high-fidelity Figma prototypes, comprehensive design systems, color tokens, and micro-animations tailored for web & mobile apps.",
    description: "Beautiful, conversion-oriented digital product design. Crafting intuitive user journeys, wireframes, interactive high-fidelity Figma prototypes, comprehensive design systems, color tokens, and micro-animations tailored for web & mobile apps.",
    icon: "Palette",
    image: "/images/service_uiux.jpg",
    features: [
      "Figma Design Systems & UI Kits",
      "Wireframing & High-Fidelity Prototypes",
      "User Research & Journey Mapping",
      "Micro-Interactions & Motion Specs",
      "WCAG Accessibility Standards"
    ],
    tags: ["Figma", "Prototyping", "Design Systems", "User Research", "Wireframing", "Micro-Interactions"],
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
    linkText: "",
    linkUrl: "/projects"
  },
  {
    id: "3",
    number: "03",
    badge: "MOBILE APP DEVELOPMENT",
    title: "Cross-Platform Mobile App Development",
    desc: "Native-quality mobile applications for iOS and Android engineered with React Native and Expo. Seamless native device hardware integrations, offline-first storage pipelines, smooth 60fps animations, push notifications, and App Store / Google Play publishing.",
    description: "Native-quality mobile applications for iOS and Android engineered with React Native and Expo. Seamless native device hardware integrations, offline-first storage pipelines, smooth 60fps animations, push notifications, and App Store / Google Play publishing.",
    icon: "Smartphone",
    image: "/images/service_mobile.jpg",
    features: [
      "Cross-Platform iOS & Android Apps",
      "React Native & Expo Ecosystem",
      "Offline-First & Local DB Caching",
      "Push Notifications & Camera/GPS",
      "App Store & Play Store Publishing"
    ],
    tags: ["React Native", "Expo", "iOS", "Android", "Redux Toolkit", "SQLite", "Push API"],
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.3)",
    linkText: "",
    linkUrl: "/projects"
  },
  {
    id: "4",
    number: "04",
    badge: "E-COMMERCE SOLUTIONS",
    title: "E-Commerce & Digital Storefronts",
    desc: "High-performance e-commerce platforms engineered to maximize conversions. Featuring intuitive catalog browsing, instant multi-faceted filter search, multi-currency Stripe payment gateway integration, wishlist management, cart checkout optimization, and automated inventory sync.",
    description: "High-performance e-commerce platforms engineered to maximize conversions. Featuring intuitive catalog browsing, instant multi-faceted filter search, multi-currency Stripe payment gateway integration, wishlist management, cart checkout optimization, and automated inventory sync.",
    icon: "ShoppingCart",
    image: "/images/service_ecommerce.jpg",
    features: [
      "Custom High-Speed Storefronts",
      "Stripe & Multi-Currency Payment Checkout",
      "Faceted Filtering & Product Search",
      "Cart & Wishlist Systems",
      "Order Management & Analytics"
    ],
    tags: ["Next.js", "Stripe", "Figma", "Prototyping", "Cart Checkout", "Shopify API"],
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    linkText: "",
    linkUrl: "/projects"
  }
];

async function update() {
  console.log('Fetching latest record from Supabase...');
  const { data: currentData, error: fetchErr } = await supabase
    .from('portfolio_data')
    .select('id, data')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchErr) {
    console.error('Fetch error:', fetchErr);
    return;
  }

  if (!currentData) {
    console.error('No record found in Supabase portfolio_data table.');
    return;
  }

  const updatedPayload = {
    ...currentData.data,
    services: newServices
  };

  const { data: updated, error: updateErr } = await supabase
    .from('portfolio_data')
    .update({
      data: updatedPayload,
      updated_at: new Date().toISOString()
    })
    .eq('id', currentData.id)
    .select();

  if (updateErr) {
    console.error('Update error:', updateErr);
  } else {
    console.log('SUCCESS! Updated services in Supabase DB:', updated?.[0]?.updated_at);
  }
}

update();
