import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aeropeak.tech";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/admin/*", "/api", "/api/*"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
