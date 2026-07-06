import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticleBySlug } from "@/lib/articles";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

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

        <div className="mt-12 text-lg leading-[2.3] text-gray-700 whitespace-pre-line">
          {article.content}
        </div>

      </main>

      <Footer />
    </>
  );
}