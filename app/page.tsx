import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedArticles from "@/components/FeaturedArticles";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-[#fafafa]">

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-orange-50 to-white">

  <div className="max-w-5xl mx-auto px-6 py-32 text-center">

    <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700">
      مجله شخصی
    </span>

    <h1 className="mt-8 text-6xl font-extrabold text-[#F4A261] leading-tight">
      مهاجر سکولار
    </h1>

    <p className="mt-8 text-2xl text-gray-700">
      اندیشه • آزادی • حقوق بشر
    </p>

    <p className="mt-8 max-w-3xl mx-auto text-lg leading-9 text-gray-600">
      یادداشت‌ها، مقاله‌ها و تحلیل‌هایی درباره سکولاریسم،
      حقوق زنان، مهاجرت، اسلام‌گرایی و ارزش‌های جهان‌شمول
      آزادی و کرامت انسانی.
    </p>

    <div className="mt-12 flex flex-wrap justify-center gap-4">

      <Link
        href="/blog"
        className="rounded-xl bg-[#F4A261] px-8 py-4 text-white font-semibold hover:scale-105 transition"
      >
        مطالعه مقالات
      </Link>

      <Link
        href="/about"
        className="rounded-xl border border-[#F4A261] px-8 py-4 text-[#F4A261] font-semibold hover:bg-orange-50 transition"
      >
        درباره من
      </Link>

    </div>

  </div>
 </section>

        {/* Intro */}

        <section className="max-w-4xl mx-auto px-6 py-20">

          <h2 className="text-3xl font-bold mb-8">
            چرا «مهاجر سکولار»؟
          </h2>

          <p className="leading-9 text-gray-700">
            این وب‌سایت فضایی برای انتشار یادداشت‌ها، مقالات و تحلیل‌هایی درباره
            آزادی، سکولاریسم، حقوق زنان، حقوق بشر و تجربه زندگی در مهاجرت است.
            هدف من ایجاد بستری برای گفت‌وگوی آزاد، نقد اندیشه و دفاع از کرامت
            انسانی است.
          </p>

        </section>
        <FeaturedArticles />

      </main>

      <Footer />
    </>
  );
}