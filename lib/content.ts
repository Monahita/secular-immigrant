import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export function getPage(slug: string) {
  const fullPath = path.join(contentDirectory, "pages", `${slug}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data } = matter(fileContents);

  return data;
}