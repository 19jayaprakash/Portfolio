-- Supabase Database Setup for Portfolio Admin Panel
-- Run this SQL in your Supabase SQL Editor

-- 1. Create portfolio_data table
CREATE TABLE IF NOT EXISTS portfolio_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_portfolio_data_created_at ON portfolio_data(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- 4. Create policy to allow anyone to read (public portfolio data)
CREATE POLICY "Allow public read access" ON portfolio_data
  FOR SELECT
  TO anon
  USING (true);

-- 5. Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Allow service role full access" ON portfolio_data
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 6. Insert default portfolio data (EXACT data from your components)
INSERT INTO portfolio_data (data) VALUES (
  '{
    "hero": {
      "status": "Open to opportunities",
      "titleWords": ["Crafting", "Digital", "Experiences"],
      "roles": ["Full-Stack Developer", "UI/UX Designer", "React Specialist", "Creative Technologist"],
      "description": "I build fast, beautiful web applications with a sharp eye for design. From SaaS dashboards to e-commerce storefronts - I ship products that users love and businesses rely on.",
      "experience": "2+",
      "projectsCount": "10+",
      "techStack": "Next.js - TypeScript - Tailwind",
      "stats": [
        { "val": "99%", "lbl": "Uptime SLA" },
        { "val": "<100ms", "lbl": "Avg Response" },
        { "val": "4.9★", "lbl": "Client Score" }
      ],
      "skills": ["React", "Node.js", "TypeScript", "Prisma", "PostgreSQL", "GraphQL", "Docker", "Figma"],
      "github": "https://github.com/19jayaprakash",
      "linkedin": "https://linkedin.com/in/jayaprakash-r-218968310"
    },
    "about": {
      "title": "Turning ideas into",
      "titleEmphasis": "digital reality",
      "description1": "I am a full-stack developer and creative technologist passionate about building beautiful, high-performance web experiences. With 2+ years of experience, I bridge design and engineering - creating products that are delightful to use and powerful under the hood.",
      "description2": "Based in Coimbatore, Tamil Nadu - working with startups, agencies, and enterprises worldwide to build products that matter.",
      "photos": ["/images/photo4.jpg", "/images/photo1.jpg"],
      "traits": [
        { "icon": "Code2", "label": "Clean Code", "desc": "Scalable, maintainable architecture" },
        { "icon": "Palette", "label": "Design Eye", "desc": "Pixel-perfect attention to detail" },
        { "icon": "Zap", "label": "Performance", "desc": "Optimized for speed and UX" },
        { "icon": "Globe", "label": "Global Ready", "desc": "i18n and accessibility first" }
      ],
      "skills": [
        { "category": "Frontend", "items": ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
        { "category": "Backend", "items": ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"] },
        { "category": "Design", "items": ["Figma", "Adobe XD", "Illustrator", "Photoshop", "UI/UX"] },
        { "category": "DevOps", "items": ["Docker", "AWS", "Vercel", "CI/CD", "Linux"] }
      ]
    },
    "stats": [
      { "value": 10, "suffix": "+", "label": "Projects Delivered" },
      { "value": 2, "suffix": "+", "label": "Years Experience" },
      { "value": 5, "suffix": "+", "label": "Happy Clients" },
      { "value": 99, "suffix": "%", "label": "Client Satisfaction" }
    ],
    "services": [
      {
        "icon": "Code2",
        "number": "01",
        "title": "Full-Stack Development",
        "desc": "End-to-end web applications built with modern stacks. From architecture to deployment, I handle everything with precision.",
        "tags": ["React", "Next.js", "Node.js", "PostgreSQL"],
        "accent": "#C8956B",
        "featured": true
      },
      {
        "icon": "Palette",
        "number": "02",
        "title": "UI/UX Design",
        "desc": "Beautiful, intuitive interfaces crafted in Figma. Research, wireframing, and pixel-perfect prototypes.",
        "tags": ["Figma", "Prototyping", "Design Systems"],
        "accent": "#EC4899",
        "featured": false
      },
      {
        "icon": "Smartphone",
        "number": "03",
        "title": "Mobile Development",
        "desc": "Cross-platform mobile apps with React Native. Native performance, beautiful design.",
        "tags": ["React Native", "Expo", "iOS", "Android"],
        "accent": "#6366F1",
        "featured": false
      },
      {
        "icon": "Globe",
        "number": "04",
        "title": "Web Performance",
        "desc": "Audit and optimize for Core Web Vitals, SEO, and Lighthouse scores that matter.",
        "tags": ["SEO", "Core Web Vitals", "Caching"],
        "accent": "#14B8A6",
        "featured": false
      },
      {
        "icon": "ShoppingCart",
        "number": "05",
        "title": "E-Commerce Solutions",
        "desc": "Full-featured stores with Shopify, WooCommerce, or completely custom-built commerce platforms.",
        "tags": ["Shopify", "Stripe", "Inventory"],
        "accent": "#F59E0B",
        "featured": false
      },
      {
        "icon": "Layers",
        "number": "07",
        "title": "Design Systems",
        "desc": "Scalable component libraries that keep your product consistent across every surface.",
        "tags": ["Storybook", "Tailwind", "Tokens"],
        "accent": "#A78BFA",
        "featured": false
      },
      {
        "icon": "Shield",
        "number": "08",
        "title": "Security and Auth",
        "desc": "Authentication systems, authorization flows, and security audits for web applications.",
        "tags": ["OAuth", "JWT", "Auth0", "2FA"],
        "accent": "#F87171",
        "featured": false
      }
    ],
    "projects": [
      {
        "id": 1,
        "title": "Gk Cloud",
        "category": "Web App",
        "desc": "Optimized landing pages, course modules, and admin dashboards to improve UI consistency, responsiveness, and loading performance.",
        "tags": ["Next.js", "TypeScript", "Tailwind CSS", "node.js", "razorpay"],
        "color": "#22C55E",
        "year": "2024",
        "featured": true,
        "image": "",
        "github": "",
        "live": ""
      },
      {
        "id": 2,
        "title": "MetaCognitive AI",
        "category": "Web App",
        "desc": "Built a modern EdTech platform with reusable UI components, animations, and mobile-first layouts.",
        "tags": ["Next.js", "TypeScript", "Tailwind CSS", "razorpay"],
        "color": "#F59E0B",
        "year": "2024",
        "featured": true,
        "image": "",
        "github": "",
        "live": ""
      },
      {
        "id": 3,
        "title": "VivaahAI Mobile",
        "category": "Mobile",
        "desc": "Developed a cross-platform mobile app for matchmaking with AI-driven compatibility scores, chat, and video features.",
        "tags": ["React Native", "Expo", "Firebase", "Redux"],
        "color": "#8B5CF6",
        "year": "2024",
        "featured": false,
        "image": "",
        "github": "",
        "live": ""
      },
      {
        "id": 4,
        "title": "PHC - Medico Healthcare",
        "category": "Product",
        "desc": "Developed a healthcare web app with AI-assisted features such as smart appointment suggestions, automated record insights, and predictive reminders, along with patient and provider management tools.",
        "tags": ["Next.js", "Node.js", "WebRTC", "MongoDB"],
        "color": "#EC4899",
        "year": "2025",
        "featured": false,
        "image": "",
        "github": "",
        "live": ""
      },
      {
        "id": 5,
        "title": "STU - AI-Powered Educational Assistant",
        "category": "Design",
        "desc": "Built AI-driven chatbots using NLP models to deliver personalized answers, automated doubt-clearing, study recommendations, and interactive learning assistance for students.",
        "tags": ["Figma", "Illustrator", "Brand Strategy"],
        "color": "#C8956B",
        "year": "2023",
        "featured": false,
        "image": "",
        "github": "",
        "live": ""
      },
      {
        "id": 6,
        "title": "AI Marketing Agent - Growth Automation Tool",
        "category": "Web App",
        "desc": "Developed an AI-based automation platform for B2B lead generation (Apollo.io), campaign scheduling, workflow automation, and client management dashboards.",
        "tags": ["Next.js", "AWS S3", "FFmpeg", "Stripe"],
        "color": "#14B8A6",
        "year": "2022",
        "featured": false,
        "image": "",
        "github": "",
        "live": ""
      }
    ],
    "studies": {
      "education": [
        {
          "type": "degree",
          "icon": "GraduationCap",
          "institution": "Global Knowledge Technologies",
          "degree": "Software Engineer",
          "period": "2024 - 2025",
          "location": "Bengaluru, Karnataka",
          "grade": "Rating 4.5/5 based on Performance",
          "highlights": ["Full-Stack Development", "Mobile Development", "UI/UX Design", "Software Engineering"]
        },
        {
          "type": "degree",
          "icon": "GraduationCap",
          "institution": "Dr.N.G.P. Institute of Technology",
          "degree": "B.Tech - Information Technology",
          "period": "2020 - 2024",
          "location": "Coimbatore, Tamil Nadu",
          "grade": "CGPA: 7.8 / 10",
          "highlights": ["Full-Stack Development", "Data Structures and Algorithms", "Database Management", "Software Engineering"]
        },
        {
          "type": "degree",
          "icon": "GraduationCap",
          "institution": "Higher Secondary School",
          "degree": "Class XII - Computer Science",
          "period": "2019 - 2020",
          "location": "Coimbatore",
          "grade": "Percentage: 68%",
          "highlights": ["Computer Science", "Mathematics", "Physics"]
        }
      ],
      "certifications": [
        {
          "icon": "Award",
          "name": "Meta Front-End Developer",
          "issuer": "Meta (Coursera)",
          "year": "2022",
          "color": "#0084FF"
        },
        {
          "icon": "BookOpen",
          "name": "Next.js and React - The Complete Guide",
          "issuer": "Udemy",
          "year": "2021",
          "color": "#A435F0"
        },
        {
          "icon": "BookOpen",
          "name": "Node.js, Express and MongoDB",
          "issuer": "Udemy - Jonas Schmedtmann",
          "year": "2021",
          "color": "#A435F0"
        },
        {
          "icon": "BookOpen",
          "name": "Advanced CSS",
          "issuer": "Udemy",
          "year": "2020",
          "color": "#A435F0"
        }
      ]
    },
    "testimonials": [
      {
        "id": 1,
        "name": "Shri Ram",
        "role": "CEO",
        "company": "Pixel Cognitix",
        "avatar": "SR",
        "avatarColor": "#22C55E",
        "rating": 5,
        "text": "The website redesign and development project was executed flawlessly. The new site is not only visually stunning but also incredibly fast and user-friendly. We have received countless compliments from clients and partners. The team attention to detail and commitment to quality truly set them apart.",
        "project": "Website Redesign and Development"
      },
      {
        "id": 2,
        "name": "Amal Denver",
        "role": "Manager",
        "company": "Square Yards",
        "avatar": "AD",
        "avatarColor": "#F59E0B",
        "rating": 5,
        "text": "The social media campaign they managed for us was nothing short of phenomenal. From content creation to analytics, every aspect was handled with professionalism and creativity. We saw a significant boost in engagement and brand awareness within weeks. Truly a pleasure to work with!",
        "project": "Social Media Campaign"
      }
    ],
    "freelance": {
      "title": "Freelance Projects",
      "stats": {
        "clients": "2+",
        "revenue": "Rs 20,000 +",
        "rating": "5.0"
      },
      "projects": [
        {
          "id": 1,
          "client": "Pixel Cognitix",
          "title": "Company Website",
          "desc": "Redesigned and developed a high-performance marketing website with Next.js, improving load times by 40% and user engagement.",
          "tags": ["Next.js", "TypeScript", "Tailwind"],
          "duration": "3 months",
          "budget": "Rs 10,000",
          "rating": 5,
          "status": "Completed",
          "color": "#22C55E",
          "category": "Web App"
        },
        {
          "id": 2,
          "client": "Square Yards",
          "title": "Social media campaign",
          "desc": "Managed and executed a comprehensive social media campaign across multiple platforms, resulting in a 30% increase in brand awareness and engagement.",
          "tags": ["Social Media", "Content Creation", "Analytics"],
          "duration": "6 weeks",
          "budget": "Rs 10,000",
          "rating": 5,
          "status": "Ongoing",
          "color": "#14B8A6",
          "category": "Web App"
        }
      ]
    },
    "contact": {
      "email": "jayaprakash.r024@gmail.com",
      "location": "Coimbatore, Tamil Nadu, India",
      "availability": "Mon-Fri, 9AM-6PM IST",
      "title1": "Lets build",
      "title2": "something great",
      "description": "Have a project in mind or want to discuss opportunities? I am always open to new challenges and interesting work. Lets connect!",
      "services": ["Full-Stack Web App", "UI/UX Design", "Mobile App", "E-Commerce", "Design System"]
    }
  }'::jsonb
);

-- 7. Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Create trigger to auto-update updated_at
CREATE TRIGGER update_portfolio_data_updated_at
    BEFORE UPDATE ON portfolio_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verify setup
SELECT COUNT(*) as total_records FROM portfolio_data;
