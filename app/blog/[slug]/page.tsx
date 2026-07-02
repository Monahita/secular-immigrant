import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = articles.find(
    (item) => item.slug === slug
  );

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-20">

        <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-orange-700">
          {article.category}
        </span>

        <h1 className="mt-8 text-5xl font-bold">
          {article.title}
        </h1>

        <p className="mt-4 text-gray-500">
          {article.publishedAt} • {article.readTime}
        </p>

        <p className="mt-10 leading-9 text-gray-700">
          {article.content}
        </p>

      </main>

      <Footer />
    </>
  );
}