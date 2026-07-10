import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticleBySlug } from "@/lib/articles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = getArticleBySlug(slug);

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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-20">
        <Image
          src={article.image}
          alt={article.title}
          width={1600}
          height={900}
          className="w-full h-[280px] object-cover rounded-3xl mb-10"
        />

        <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-orange-700">
          {article.category}
        </span>

        <h1 className="mt-8 text-5xl font-bold">
          {article.title}
        </h1>

        <div className="mt-6 flex items-center gap-6 text-gray-500 text-sm">
          <span>📅 {article.publishedAt}</span>
          <span>⏱ {article.readTime}</span>
        </div>
        <article className="prose prose-lg max-w-none mt-12 prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#F4A261] prose-blockquote:border-r-[#F4A261] prose-blockquote:text-gray-700">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {article.content}
        </ReactMarkdown>
        </article>
      </main>

      <Footer />
    </>
  );
}