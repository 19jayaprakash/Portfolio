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
-- (We'll use service role key in API routes, so this is for admin access)
CREATE POLICY "Allow service role full access" ON portfolio_data
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 6. Insert default portfolio data
INSERT INTO portfolio_data (data) VALUES (
  '{
    "personal": {
      "name": "Jayaprakash R",
      "title": "Full-Stack Developer and Creative Technologist",
      "email": "jayaprakash.r024@gmail.com",
      "location": "Coimbatore, Tamil Nadu, India",
      "availability": "Mon-Fri, 9AM-6PM IST",
      "github": "https://github.com/19jayaprakash",
      "linkedin": "https://www.linkedin.com/in/jayaprakash-r-218968310/",
      "heroTitle": "Crafting Digital Experiences",
      "heroSubtitle": "Full-stack developer specializing in modern web applications, creative interfaces, and scalable solutions."
    },
    "stats": {
      "yearsExperience": 3,
      "projectsCompleted": 25,
      "technologiesCount": 15,
      "happyClients": 20
    },
    "services": {
      "title": "Services",
      "description": "Comprehensive development solutions tailored to your needs",
      "items": [
        {
          "id": "1",
          "title": "Full-Stack Development",
          "description": "End-to-end web applications with modern tech stacks",
          "icon": "Code"
        },
        {
          "id": "2",
          "title": "UI/UX Design",
          "description": "Beautiful, intuitive interfaces that users love",
          "icon": "Palette"
        },
        {
          "id": "3",
          "title": "Mobile Development",
          "description": "Cross-platform mobile apps with React Native",
          "icon": "Smartphone"
        },
        {
          "id": "4",
          "title": "E-Commerce Solutions",
          "description": "Scalable online stores with payment integration",
          "icon": "ShoppingCart"
        }
      ]
    },
    "projects": {
      "title": "Featured Projects",
      "items": [
        {
          "id": "1",
          "title": "E-Commerce Platform",
          "description": "A full-featured e-commerce platform with payment integration, admin dashboard, and real-time inventory management.",
          "image": "/images/photo1.jpg",
          "tags": ["Next.js", "Node.js", "MongoDB", "Stripe"],
          "github": "https://github.com",
          "live": "https://example.com",
          "duration": "3 months"
        },
        {
          "id": "2",
          "title": "Task Management App",
          "description": "Collaborative task management tool with real-time updates, team features, and analytics dashboard.",
          "image": "/images/photo2.jpg",
          "tags": ["React", "TypeScript", "Firebase", "Tailwind"],
          "github": "https://github.com",
          "live": "https://example.com",
          "duration": "2 months"
        },
        {
          "id": "3",
          "title": "Portfolio Website",
          "description": "Modern portfolio website with smooth animations, dark mode, and responsive design.",
          "image": "/images/photo3.jpg",
          "tags": ["Next.js", "Framer Motion", "GSAP", "Tailwind"],
          "github": "https://github.com",
          "live": "https://example.com",
          "duration": "1 month"
        }
      ]
    },
    "studies": {
      "title": "Education",
      "items": [
        {
          "id": "1",
          "degree": "Bachelor of Technology in Computer Science",
          "institution": "University Name",
          "duration": "2020 - 2024",
          "description": "Focused on software engineering, data structures, and web development."
        }
      ]
    },
    "testimonials": {
      "title": "Client Testimonials",
      "items": [
        {
          "id": "1",
          "name": "John Doe",
          "role": "CEO",
          "company": "Tech Startup",
          "content": "Exceptional work! Delivered the project on time with outstanding quality. Highly recommended.",
          "image": "/images/photo1.jpg"
        },
        {
          "id": "2",
          "name": "Jane Smith",
          "role": "Product Manager",
          "company": "Digital Agency",
          "content": "Great communication and technical skills. The final product exceeded our expectations.",
          "image": "/images/photo2.jpg"
        }
      ]
    },
    "freelance": {
      "title": "Freelance Projects",
      "description": "Selected freelance work and collaborations",
      "items": [
        {
          "id": "1",
          "title": "Corporate Website Redesign",
          "client": "Tech Corp",
          "duration": "2 months",
          "description": "Complete redesign and development of corporate website with CMS integration.",
          "tags": ["React", "Next.js", "Sanity CMS"]
        },
        {
          "id": "2",
          "title": "Mobile App Development",
          "client": "StartupXYZ",
          "duration": "4 months",
          "description": "Cross-platform mobile application with real-time features and offline support.",
          "tags": ["React Native", "Firebase", "Redux"]
        }
      ]
    },
    "contact": {
      "title": "Lets build",
      "subtitle": "something great",
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
