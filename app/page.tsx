import Link from "next/link";
import FeaturedArticles from "@/components/FeaturedArticles";
import { getPage } from "@/lib/content";

export default function Home() {
  const { frontmatter } = getPage("home");

  return (
    <main className="bg-[#fafafa]">
      <section className="bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700">
            مجله شخصی
          </span>

          <h1 className="mt-5 text-5xl font-extrabold text-[#F4A261] leading-tight">
            {frontmatter.heroTitle}
          </h1>

          <p className="mt-5 text-xl text-gray-700">
            {frontmatter.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={frontmatter.buttonLink}
              className="rounded-xl bg-[#F4A261] px-7 py-3 text-white font-semibold hover:scale-105 transition"
            >
              {frontmatter.buttonText}
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-[#F4A261] px-7 py-3 text-[#F4A261] font-semibold hover:bg-orange-50 transition"
            >
              درباره من
            </Link>
          </div>
        </div>
      </section>

      <FeaturedArticles />
    </main>
  );
}