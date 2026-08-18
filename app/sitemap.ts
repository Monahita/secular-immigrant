import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://farsi.autonomy-secular.site";

  const articles = getAllArticles();

  const articleUrls = articles.map((article) => {
  const cleanSlug = article.slug.replace(/^\/+/, "");

  return {
    url: `${baseUrl}/blog/${cleanSlug}`,
    lastModified: new Date(
      article.updatedAt || article.publishedAt
    ),
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