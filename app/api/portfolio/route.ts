import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Disable Next.js caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    console.log('Fetching portfolio data from Supabase...');
    
    // Fetch latest portfolio data from Supabase using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('portfolio_data')
      .select('id, data, updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch portfolio data', details: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      console.log('No data found in Supabase');
      return NextResponse.json(
        { error: 'No portfolio data found' },
        { status: 404 }
      );
    }

    console.log('Successfully fetched portfolio data');
    console.log('Last updated:', data.updated_at);
    console.log('Data preview:', JSON.stringify(data.data).substring(0, 200) + '...');
    
    const mergedData = {
      ...data.data,
      about: {
        ...data.data?.about,
        badgeText: data.data?.about?.badgeText || "OUR APPROACH",
        focusAreasLabel: data.data?.about?.focusAreasLabel || "PERFORMANCE FOCUS AREAS",
        focusAreas: data.data?.about?.focusAreas || [
          "Conversions & Custom Web Apps",
          "Cross-Platform Mobile Apps",
          "UI/UX Design Systems & Interfaces",
          "Scalable Cloud Architecture & APIs",
          "KPI-Aligned Performance & SEO"
        ],
        authorName: data.data?.about?.authorName || "R. Jayaprakash & Engineering Team",
        authorRole: data.data?.about?.authorRole || "Founder & Core Team, AeroPeak",
        visionBadge: data.data?.about?.visionBadge || "OUR VISION",
        visionTitle: data.data?.about?.visionTitle || "Driving measurable, sustainable growth",
        visionQuote: data.data?.about?.visionQuote || "Ambitious, regional, and outcome-driven — establishing AeroPeak as a serious, long-term growth partner.",
        page: {
          ...(data.data?.about?.page || {}),
          team: (data.data?.about?.page?.team && data.data.about.page.team.length > 0 && !data.data.about.page.team[0].image)
            ? data.data.about.page.team
            : [
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
              ]
        }
      }
    };
    
    return NextResponse.json({ 
      data: mergedData,
      _meta: {
        updated_at: data.updated_at,
        fetched_at: new Date().toISOString()
      }
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error('Error in portfolio API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data', details: error.message },
      { status: 500 }
    );
  }
}
