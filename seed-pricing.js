// Seed database with default pricing data structure
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { defaultPortfolioData } = require('./lib/portfolio-data.ts');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Fallback pricing object in pure JS to avoid TS compile issues in CJS require
const defaultPricing = {
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
};

async function seed() {
  console.log('🔍 Fetching current Supabase record...');
  const { data: record, error: fetchError } = await supabase
    .from('portfolio_data')
    .select('id, data')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    console.error('❌ Fetch error:', fetchError);
    return;
  }

  if (!record) {
    console.error('❌ No record found in database!');
    return;
  }

  console.log('✅ Current record loaded.');
  console.log('Injecting pricing default object...');

  const updatedData = {
    ...record.data,
    pricing: record.data.pricing || defaultPricing
  };

  const { data: updated, error: updateError } = await supabase
    .from('portfolio_data')
    .update({ 
      data: updatedData,
      updated_at: new Date().toISOString()
    })
    .eq('id', record.id)
    .select();

  if (updateError) {
    console.error('❌ Update error:', updateError);
    return;
  }

  console.log('🎉 SUCCESS! Stored portfolio data now contains the default pricing schema!');
}

seed();
