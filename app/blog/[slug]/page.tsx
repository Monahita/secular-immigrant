import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/TableOfContents";

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

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,

    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.image,
        },
      ],
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

  const { previous, next } = getAdjacentArticles(slug);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 gap-12">

          {/* Article */}

  <article className="lg:col-span-3 mx-auto max-w-4xl">

  {/* Hero */}

  <header className="mb-16">

    <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
      {article.category}
    </span>

    <h1 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-gray-900">
          {article.title}
    </h1>

    <p className="mt-6 max-w-3xl text-xl leading-9 text-gray-600">
      {article.excerpt}
    </p>

    <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500">

      <div className="flex items-center gap-2">
        <span>📅</span>
        <span>{article.publishedAt}</span>
      </div>

      <div className="flex items-center gap-2">
        <span>⏱</span>
        <span>{article.readTime}</span>
      </div>

    </div>

  </header>

  {/* Hero Image */}

  <img
  src={article.image}
  alt={article.title}
  className=" mb-14 h-[260px] md:h-[300px] w-full rounded-3xl object-cover shadow-lg"
/>
  {/* Article */}

  <article className="article-content">

    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
    >
      {article.content}
    </ReactMarkdown>


            </article>

            <div className="mt-20 border-t pt-10 grid md:grid-cols-2 gap-8">

              <div>

                {previous && (

                  <>
                    <p className="mb-2 text-sm text-gray-500">
                      مقاله قبلی
                    </p>

                    <Link
                      href={`/blog/${previous.slug}`}
                      className="block rounded-2xl border p-6 hover:border-[#F4A261] transition"
                    >
                      <h3 className="font-bold text-lg">
                        ← {previous.title}
                      </h3>
                    </Link>

                  </>

                )}

              </div>

              <div className="text-left">

                {next && (

                  <>
                    <p className="mb-2 text-sm text-gray-500">
                      مقاله بعدی
                    </p>

                    <Link
                      href={`/blog/${next.slug}`}
                      className="block rounded-2xl border p-6 hover:border-[#F4A261] transition"
                    >
                      <h3 className="font-bold text-lg">
                        {next.title} →
                      </h3>
                    </Link>

                  </>

                )}

              </div>

            </div>

          </article>

          {/* Table of Contents */}

          <aside className="hidden lg:block">

            <div className="sticky top-28">

              <TableOfContents items={toc} />

            </div>

          </aside>

        </div>

      </main>

      <Footer />
    </>
  );
}