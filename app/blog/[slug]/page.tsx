import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

      <main className="max-w-3xl mx-auto px-6 py-20">
      <Image
      src={article.image}
      alt={article.title}
      width={12000}
      height={7000}
      className="w-full h-52 md:h-64 lg:h-72 object-cover rounded-3xl mb-10"
      />
        <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-orange-700">
          {article.category}
        </span>

        <h1 className="mt-8 text-4xl font-bold leading-tight">
          {article.title}
        </h1>

        <div className="mt-6 flex items-center gap-6 text-gray-500 text-sm">

          <span>
            📅 {article.publishedAt}
          </span>

          <span>
           ⏱ {article.readTime}
          </span>

        </div>

        <div className="mt-12 text-lg leading-[2.3] text-gray-800">
          {article.content}
        </div>

      <div className="mt-16">

        <Link
          href="/blog"
          className="inline-block rounded-xl bg-[#F4A261] px-6 py-3 text-white hover:opacity-90 transition"
        >
          ← بازگشت به مقالات
        </Link>

</div>
      </main>

      <Footer />
    </>
  );
}