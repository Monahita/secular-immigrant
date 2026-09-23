import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

function getValidDate(value?: string): Date | undefined {
  if (!value) return undefined;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://farsi.autonomy-secular.site";

  const articles = getAllArticles();

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => {
    const cleanSlug = article.slug.replace(/^\/+/, "");

    const lastModified =
      getValidDate(article.updatedAt) ??
      getValidDate(article.publishedAt);

    return {
      url: `${baseUrl}/blog/${cleanSlug}`,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    ...articleUrls,
  ];
}