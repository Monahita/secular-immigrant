import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import ArticleMedia from "@/components/ArticleMedia";
import TableOfContents from "@/components/TableOfContents";

import { formatDate } from "@/lib/date";
import { extractToc } from "@/lib/toc";

import {
  getArticleContent,
  getArticleSlugs,
  getAdjacentArticles,
} from "@/lib/articles";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = await getArticleContent(slug);

  if (!article) return {};

  const articleUrl =
    `https://farsi.autonomy-secular.site/blog/${slug}`;

  const shareImage =
  article.media?.gallery?.[0] ||
  "/images/share-default.png";

  return {
    title: article.title,
    description: article.excerpt,

    alternates: {
      canonical: articleUrl,
    },

    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      siteName: "مهاجر سکولار",
      locale: "fa_IR",
      type: "article",

      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,

      images: [
  {
    url: shareImage,
    alt: article.title,
  },
],
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [shareImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: Props) {
  const { slug } = await params;

  const article = await getArticleContent(slug);

  if (!article) {
    notFound();
  }

  const toc = extractToc(article.content);

  const { previous, next } =
    getAdjacentArticles(slug);

  return (
        <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-4 gap-12">

        {/* مقاله */}

        <article className="lg:col-span-3 mx-auto max-w-4xl">

          {/* Header */}

          <header className="mb-12">

            <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700">
              {article.category}
            </span>

            <h1 className="mt-6 text-3xl md:text-4xl font-extrabold leading-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="mt-6 text-2xl text-gray-600 leading-10">
                {article.subtitle}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">
  <span>
    📅 انتشار: {formatDate(article.publishedAt)}
  </span>

  {article.updatedAt && (
    <span>
      ✏️ به‌روزرسانی: {formatDate(article.updatedAt)}
    </span>
  )}

  <span>
    🕒 {article.readTime}
  </span>
</div>

          </header>

          {/* Media */}

          <ArticleMedia article={article} />

          {/* Article */}

          <div className="prose prose-lg prose-neutral max-w-none leading-9">

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
            >
              {article.content}
            </ReactMarkdown>

          </div>

          {/* Navigation */}

          <div className="mt-20 border-t border-gray-200 pt-10">

            <div className="grid md:grid-cols-2 gap-8">

              <div>
                {previous && (
                  <Link
                    href={`/blog/${previous.slug}`}
                    className="block rounded-xl border border-gray-200 p-6 hover:border-[#F4A261] transition"
                  >
                    <div className="text-sm text-gray-500 mb-2">
                      ← مقاله قبلی
                    </div>

                    <div className="font-bold">
                      {previous.title}
                    </div>
                  </Link>
                )}
              </div>

              <div className="text-left">
                {next && (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="block rounded-xl border border-gray-200 p-6 hover:border-[#F4A261] transition"
                  >
                    <div className="text-sm text-gray-500 mb-2">
                      مقاله بعدی →
                    </div>

                    <div className="font-bold">
                      {next.title}
                    </div>
                  </Link>
                )}
              </div>

            </div>

          </div>

        </article>

        {/* TOC */}

        <aside className="hidden lg:block">

          <div className="sticky top-28">

            <TableOfContents items={toc} />

          </div>

        </aside>

      </div>
    </main>
  );
}