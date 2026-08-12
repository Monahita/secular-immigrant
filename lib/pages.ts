import fs from "fs";
import path from "path";
import matter from "gray-matter";

const pagesDirectory = path.join(process.cwd(), "content/pages");

export type Page = {
  slug: string;
  title: string;
  intro?: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  quote?: string;
  beliefs?: string[];
  image?: string;
  buttonText?: string;
  buttonLink?: string;
};

export function getPage(slug: string): Page | null {
  const fullPath = path.join(pagesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const file = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(file);

  return {
    slug,
    ...(data as Omit<Page, "slug">),
  };
}