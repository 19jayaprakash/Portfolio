import { MetadataRoute } from "next";
import { getPortfolioData } from "@/lib/portfolio-data-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.in";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    // Dynamic project routes
    const data = await getPortfolioData();
    const featuredList = data.projects?.items || [];
    const freelanceList = data.freelance?.items || [];
    
    const allProjects = [
      ...featuredList,
      ...freelanceList
    ];

    const projectRoutes: MetadataRoute.Sitemap = allProjects.map((project: any) => ({
      url: `${siteUrl}/project/${project.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
