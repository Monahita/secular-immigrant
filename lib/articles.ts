/**
 * Secular Immigrant
 * File: lib/articles.ts
 * Version: 1.0
 * Status: Stable
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const articlesDirectory = path.join(
  process.cwd(),
  "content/articles"
);

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  content: string;
};

type ArticleFrontMatter = Omit<Article, "slug" | "content">;

export function getArticleSlugs(): string[] {
  return fs.readdirSync(articlesDirectory);
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
  const article = getArticleBySlug(slug);

  if (!article) {
    return null;
  }

  const processedContent = await remark()
    .use(html)
    .process(article.content);

  return {
    ...article,
    content: processedContent.toString(),
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();

  const articles: Article[] = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null);

  return articles.sort((a, b) =>
    a.publishedAt > b.publishedAt ? -1 : 1
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