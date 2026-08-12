"use client";
import { formatDate } from "@/lib/date";
import { useMemo, useState } from "react";
import Link from "next/link";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
};

type Props = {
  articles: Article[];
  categories: string[];
};

export default function BlogList({
  articles,
  categories,
}: Props) {
  const [activeCategory, setActiveCategory] =
    useState("همهٔ مقالات");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "همهٔ مقالات") {
      return articles;
    }

    return articles.filter(
      (article) => article.category === activeCategory
    );
  }, [articles, activeCategory]);

  return (
    <>
      <div className="mb-14 flex flex-wrap gap-3">

        <button
          onClick={() => setActiveCategory("همهٔ مقالات")}
          className={`rounded-full px-5 py-2 text-sm transition
          ${
            activeCategory === "همهٔ مقالات"
              ? "bg-[#F4A261] text-white"
              : "border border-gray-300 text-gray-700 hover:border-[#F4A261] hover:text-[#F4A261]"
          }`}
        >
          همهٔ مقالات ({articles.length})
        </button>

        {categories.map((category) => {
          const count = articles.filter(
            (article) => article.category === category
          ).length;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm transition
              ${
                activeCategory === category
                  ? "bg-[#F4A261] text-white"
                  : "border border-gray-300 text-gray-700 hover:border-[#F4A261] hover:text-[#F4A261]"
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-10">

        {filteredArticles.map((article) => (
          <article
            key={article.slug}
            className="border-b border-gray-200 pb-8"
          >
            <Link href={`/blog/${article.slug}`}>

              <h2 className="text-2xl font-bold text-gray-900 hover:text-[#F4A261] transition-colors duration-300">
                {article.title}
              </h2>

            </Link>

            <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">

              <span>{formatDate(article.publishedAt)}</span>

              {article.readTime && (
                <>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </>
              )}

            </div>

          </article>
        ))}

      </div>
    </>
  );
}