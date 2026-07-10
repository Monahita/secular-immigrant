import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

type ArticleFrontMatter = {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
};

export type Article = ArticleFrontMatter & {
  slug: string;
  content: string;
};

const articlesDirectory = path.join(process.cwd(), "content/articles");

export function getArticleSlugs(): string[] {
  return fs.readdirSync(articlesDirectory);
}

export function getArticleBySlug(slug: string): Article {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(articlesDirectory, `${realSlug}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const frontMatter = data as ArticleFrontMatter;

  return {
    slug: realSlug,
    ...frontMatter,
    content,
  };
}

export async function getArticleContent(slug: string): Promise<Article> {
  const article = getArticleBySlug(slug);

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

  const articles = slugs.map((slug) => getArticleBySlug(slug));

  return articles.sort((a, b) =>
    a.publishedAt > b.publishedAt ? -1 : 1
  );
}