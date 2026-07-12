import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function extractToc(markdown: string): TocItem[] {
  const tree = unified()
    .use(remarkParse)
    .parse(markdown);

  const headings: TocItem[] = [];

  visit(tree, "heading", (node: any) => {
    const text = node.children
      .filter((child: any) => child.type === "text")
      .map((child: any) => child.value)
      .join("");

    headings.push({
      id: text
        .toLowerCase()
        .replace(/\s+/g, "-"),
      text,
      level: node.depth,
    });
  });

  return headings;
}