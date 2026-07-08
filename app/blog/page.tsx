import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllArticles } from "@/lib/articles";
import Link from "next/link";

export default function BlogPage() {
  const articles = getAllArticles();
  return (
    <>
      <Navbar />

      <main className="bg-[#fafafa] min-h-screen">
        <section className="max-w-6xl mx-auto px-6 py-16">

          <h1 className="text-5xl font-bold text-[#F4A261] mb-4">
            مقالات
          </h1>

          <p className="text-gray-600 mb-12">
            یادداشت‌ها و مقاله‌های من درباره آزادی، سکولاریسم، حقوق زنان و مهاجرت.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {articles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-48 bg-orange-100 flex items-center justify-center text-5xl">
                  📰
                </div>

                <div className="p-6">

                  <span className="text-sm text-gray-500">
                    {article.date}
                  </span>

                  <h2 className="mt-3 text-xl font-bold">
                    {article.title}
                  </h2>

                  <p className="mt-4 text-gray-600 leading-8">
                    {article.excerpt}
                  </p>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-block mt-6 text-[#F4A261] font-semibold"
>
                     ادامه مطلب ←
                  </Link>

                </div>
              </article>
            ))}

          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}