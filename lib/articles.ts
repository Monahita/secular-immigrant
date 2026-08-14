/**
 * Secular Immigrant
 * File: lib/articles.ts
 * Version: 1.0
 * Status: Stable
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(
  process.cwd(),
  "content/articles"
);

export type Article = {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: string;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  featured: boolean;
  media?: {
    gallery?: string[];
    youtube?: string;
    video?: string;
    audio?: string;
    pdf?: string;
  };
  content: string;
};

type ArticleFrontMatter = Omit<Article, "slug" | "content">;

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".md"));
}

export function getArticleBySlug(
  slug: string
): Article | null {
  const realSlug = slug.replace(/\.md$/, "");

  const fullPath = path.join(
    articlesDirectory,
    `${realSlug}.md`
  );

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(
    fullPath,
    "utf8"
  );

  const { data, content } = matter(fileContents);

  const frontMatter = data as ArticleFrontMatter;

 return {
  slug: realSlug,
  ...frontMatter,
  content,
};
}

export async function getArticleContent(
  slug: string
): Promise<Article | null> {
  return getArticleBySlug(slug);
}


export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();

  const articles: Article[] = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null);

  
  return articles.sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() -
    new Date(a.publishedAt).getTime()
);

}

export function getAdjacentArticles(
  slug: string
): {
  previous: Article | null;
  next: Article | null;
} {
  const articles = getAllArticles();

  const index = articles.findIndex(
    (article) => article.slug === slug
  );
  return {
    previous:
      index > 0 ? articles[index - 1] : null,

    next:
      index >= 0 && index < articles.length - 1
        ? articles[index + 1]
        : null,
  };
} 
export function getCategories() {
  const articles = getAllArticles();

  const categories = Array.from(
    new Set(
      articles
        .map((article) => article.category)
        .filter(Boolean)
    )
  );

  return categories.sort();
}