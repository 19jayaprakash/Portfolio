import ProjectDetailsClient from "./page.client";
import { getPortfolioData } from "@/lib/portfolio-data-server";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPortfolioData();
  const featuredList = data.projects?.items || [];
  const freelanceList = data.freelance?.items || [];
  
  const allProjects = [
    ...featuredList,
    ...freelanceList
  ];
  
  const project = allProjects.find((p: any) => String(p.id) === params.id) as any;
  
  if (!project) {
    return {
      title: "Project Not Found | Aeropeak Technologies",
      description: "The requested project case study could not be found.",
    };
  }

  const title = project.title || "Case Study";
  const desc = project.description || `Case study and implementation details for ${title} project built by Aeropeak Technologies.`;

  const imageUrl = project.image || "/Logo.png";

  return {
    title: `${title} | Case Study`,
    description: desc,
    alternates: {
      canonical: `/project/${params.id}`,
    },
    openGraph: {
      title: `${title} | Aeropeak Technologies Case Study`,
      description: desc,
      url: `/project/${params.id}`,
      type: "article",
      siteName: "Aeropeak Technologies",
      images: [
        {
          url: imageUrl,
          alt: `${title} Case Study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Aeropeak Technologies Case Study`,
      description: desc,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: Props) {
  const data = await getPortfolioData();
  const featuredList = data.projects?.items || [];
  const freelanceList = data.freelance?.items || [];
  
  const allProjects = [
    ...featuredList,
    ...freelanceList
  ];
  
  const project = allProjects.find((p: any) => String(p.id) === params.id) as any;
  
  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description || "",
    "creator": {
      "@type": "Organization",
      "name": "Aeropeak Technologies",
      "url": "https://aeropeak.tech"
    },
    "genre": project.category || "Software Development",
    "keywords": project.tags?.join(", ") || ""
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailsClient />
    </>
  );
}
