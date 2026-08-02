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
    badge: "E-COMMERCE UI/UX",
    title: "LUXURA E-COMMERCE SHOPPING EXPERIENCE",
    desc: "A sleek, conversion-focused e-commerce application featuring intuitive product discovery, visual filter systems, instant checkout flow, wishlist management, and detailed product showcase layouts.",
    description: "A sleek, conversion-focused e-commerce application featuring intuitive product discovery, visual filter systems, instant checkout flow, wishlist management, and detailed product showcase layouts.",
    icon: "ShoppingCart",
    image: "/images/service_ecommerce.jpg",
    tags: ["Figma", "Adobe Illustrator", "Prototyping"],
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.3)",
    linkText: "Figma Design ↗",
    linkUrl: "/projects"
  },
  {
    id: "2",
    number: "02",
    badge: "MOBILE APP UI/UX",
    title: "EVENTO | EVENT MANAGEMENT APP",
    desc: "Designed and developed a user-friendly mobile event management app enabling organizers to create and manage events effortlessly while allowing attendees to explore, register, and check-in via dynamic QR passes.",
    description: "Designed and developed a user-friendly mobile event management app enabling organizers to create and manage events effortlessly while allowing attendees to explore, register, and check-in via dynamic QR passes.",
    icon: "Smartphone",
    image: "/images/service_mobile.jpg",
    tags: ["Figma", "Balsamiq", "User Flow", "React Native"],
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.3)",
    linkText: "Figma Design ↗",
    linkUrl: "/projects"
  },
  {
    id: "3",
    number: "03",
    badge: "FULL-STACK DEVELOPMENT",
    title: "ASTRA CLOUD | CLOUD ARCHITECTURE",
    desc: "End-to-end full-stack web applications built with modern architectures. From database modeling to serverless deployment, handling real-time data synchronization with sub-second speeds.",
    description: "End-to-end full-stack web applications built with modern architectures. From database modeling to serverless deployment, handling real-time data synchronization with sub-second speeds.",
    icon: "Code2",
    image: "/images/service_fullstack.jpg",
    tags: ["React", "Next.js", "Node.js", "Java", "MySQL", "Supabase"],
    accent: "#C8956B",
    glow: "rgba(200,149,107,0.3)",
    linkText: "Full-Stack System ↗",
    linkUrl: "/projects"
  },
  {
    id: "4",
    number: "04",
    badge: "UI/UX DESIGN",
    title: "STUDIO FLOW | DESIGN SYSTEM",
    desc: "Comprehensive UI/UX design systems, component libraries, typography scale, color tokens, and pixel-perfect interactive prototypes engineered for enterprise product teams.",
    description: "Comprehensive UI/UX design systems, component libraries, typography scale, color tokens, and pixel-perfect interactive prototypes engineered for enterprise product teams.",
    icon: "Palette",
    image: "/images/service_uiux.jpg",
    tags: ["Figma", "Prototyping", "Design Systems", "Tailwind CSS"],
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
    linkText: "Figma System ↗",
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
