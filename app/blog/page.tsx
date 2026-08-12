import { getAllArticles, getCategories } from "@/lib/articles";
import BlogList from "@/components/BlogList";
import { formatDate } from "@/lib/date";

export default function BlogPage() {
  const articles = getAllArticles();
  const categories = getCategories();

  return (
    <main className="bg-[#fafafa] min-h-screen">

      <section className="max-w-4xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-[#F4A261] mb-4">
          مقالات
        </h1>

        <p className="text-gray-600 mb-16 leading-8">
          یادداشت‌ها، مقاله‌ها و تحلیل‌هایی درباره آزادی،
          سکولاریسم، حقوق زنان، حقوق بشر و تجربه مهاجرت.
        </p>

        <BlogList
          articles={articles}
          categories={categories}
        />

      </section>

    </main>
  );
}