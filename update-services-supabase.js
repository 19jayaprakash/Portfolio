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
    badge: "FULL-STACK DEV",
    title: "Full-Stack Development",
    desc: "End-to-end web applications built with modern stacks. From architecture to deployment, I handle everything with precision.",
    description: "End-to-end web applications built with modern stacks. From architecture to deployment, I handle everything with precision.",
    icon: "Code2",
    image: "/images/service_fullstack.jpg",
    tags: ["React", "Next.js", "Node.js", "Java", "MySQL"],
    accent: "#C8956B",
    glow: "rgba(200,149,107,0.3)",
    linkText: "",
    linkUrl: "/projects"
  },
  {
    id: "2",
    number: "02",
    badge: "UI/UX DESIGN",
    title: "UI/UX Design",
    desc: "Beautiful, intuitive interfaces crafted in Figma. Research, wireframing, and pixel-perfect prototypes.",
    description: "Beautiful, intuitive interfaces crafted in Figma. Research, wireframing, and pixel-perfect prototypes.",
    icon: "Palette",
    image: "/images/service_uiux.jpg",
    tags: ["Figma", "Prototyping", "Design Systems"],
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
    linkText: "",
    linkUrl: "/projects"
  },
  {
    id: "3",
    number: "03",
    badge: "MOBILE APP DEV",
    title: "Mobile App Development",
    desc: "Cross-platform mobile applications built with React Native and Expo for iOS and Android with native performance.",
    description: "Cross-platform mobile applications built with React Native and Expo for iOS and Android with native performance.",
    icon: "Smartphone",
    image: "/images/service_mobile.jpg",
    tags: ["React Native", "Expo", "iOS", "Android"],
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.3)",
    linkText: "",
    linkUrl: "/projects"
  },
  {
    id: "4",
    number: "04",
    badge: "E-COMMERCE SOLUTIONS",
    title: "E-Commerce Solutions",
    desc: "A sleek, conversion-focused e-commerce application featuring intuitive product discovery, visual filter systems, instant checkout flow, wishlist management, and detailed product showcase layouts.",
    description: "A sleek, conversion-focused e-commerce application featuring intuitive product discovery, visual filter systems, instant checkout flow, wishlist management, and detailed product showcase layouts.",
    icon: "ShoppingCart",
    image: "/images/service_ecommerce.jpg",
    tags: ["Figma", "Next.js", "Stripe", "Prototyping"],
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
