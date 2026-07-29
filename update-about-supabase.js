require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const newAboutData = {
  badgeText: "OUR APPROACH",
  title: "We engineer your",
  titleEmphasis: "digital growth engine.",
  description1: "At AeroPeak, we see software engineering not as an expense, but as a calculated investment. Led by our core team based in Coimbatore, our agile team specializes in blending creative engineering with analytical rigor.",
  description2: "Rooted in South India, built to global standards — we transform potential into measurable, sustainable market leadership.",
  focusAreasLabel: "PERFORMANCE FOCUS AREAS",
  focusAreas: [
    "Conversions & Custom Web Apps",
    "Cross-Platform Mobile Apps",
    "UI/UX Design Systems & Interfaces",
    "Scalable Cloud Architecture & APIs",
    "KPI-Aligned Performance & SEO"
  ],
  authorName: "R. Jayaprakash & Engineering Team",
  authorRole: "Founder & Core Team, AeroPeak",
  visionBadge: "OUR VISION",
  visionTitle: "Driving measurable, sustainable growth",
  visionQuote: "Ambitious, regional, and outcome-driven — establishing AeroPeak as a serious, long-term growth partner.",
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
};

async function updateSupabase() {
  console.log('🔄 Fetching current Supabase record...');
  const { data: records, error: fetchError } = await supabase
    .from('portfolio_data')
    .select('id, data')
    .order('updated_at', { ascending: false })
    .limit(1);

  if (fetchError) {
    console.error('❌ Error fetching:', fetchError);
    return;
  }

  if (!records || records.length === 0) {
    console.log('⚠️ No record found, inserting new record...');
    const { error: insertError } = await supabase
      .from('portfolio_data')
      .insert([{ data: { about: newAboutData } }]);
    if (insertError) console.error('❌ Insert error:', insertError);
    else console.log('✅ Inserted new record with updated about data!');
    return;
  }

  const record = records[0];
  console.log('Found record ID:', record.id);
  
  const updatedData = {
    ...record.data,
    about: newAboutData
  };

  const { error: updateError } = await supabase
    .from('portfolio_data')
    .update({
      data: updatedData,
      updated_at: new Date().toISOString()
    })
    .eq('id', record.id);

  if (updateError) {
    console.error('❌ Update error:', updateError);
  } else {
    console.log('🎉 SUCCESS! Updated Supabase database with new About section & Team configuration!');
  }
}

updateSupabase();
