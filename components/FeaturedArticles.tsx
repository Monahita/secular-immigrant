import Link from "next/link";

import { getAllArticles } from "@/lib/articles";

export default function FeaturedArticles() {
  const articles = getAllArticles().slice(0, 3);
  console.log(articles);
  return (
    
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-red-600">
  تست FeaturedArticles
</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            
            <div className="relative h-48 overflow-hidden">

            <img
  src={article.image}
  alt={article.title}
  className="w-full h-full object-cover"
/>
          
            </div>

            <div className="p-6">
              <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                {article.category}
              </span>

              <h3 className="mt-4 text-xl font-bold">
                {article.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                {article.excerpt}
              </p>

              <div className="mt-5 flex justify-between text-sm text-gray-500">
                <span>🕒 {article.readTime}</span>
                <span>{article.publishedAt}</span>
              </div>

              <Link
                href={`/blog/${article.slug}`}
                className="inline-block mt-6 text-[#F4A261] font-semibold"
              >
                ادامه مطلب →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}