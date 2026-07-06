import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  return (
    
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-20">
  <h1 className="text-4xl font-bold text-[#F4A261] mb-10">
    درباره من
  </h1>
  
  <div className="grid lg:grid-cols-[1fr_320px] gap-14 items-start">

  {/* متن */}

  <div>

    <div className="space-y-8 text-gray-700 leading-9 text-lg">

      <p>
        من در ایران و در خانواده‌ای نسبتاً لیبرال به دنیا آمده و رشد کردم.
        در ۲۴ سالگی، به دلیل شرایط سیاسی، ناچار به ترک وطن شدم و یک سال بعد،
        آلمان را به‌عنوان میهنی دوم یافتم.
      </p>

      <p>
        امروز به‌عنوان یک کنشگر، عمدتاً در حوزه‌های اسلام‌گرایی،
        حقوق زنان و حجاب اجباری فعالیت می‌کنم.
      </p>

      <p>
        باور دارم که مبارزه برای حق زنان در تعیین سرنوشت خویش،
        جدایی‌ناپذیر از مبارزه برای آزادی، کرامت انسانی و حقوق بشر است.
      </p>

    </div>

    <blockquote className="mt-10 border-r-4 border-[#F4A261] pr-6 italic text-xl text-gray-700">
      «آزادی بدون سکولاریسم پایدار نمی‌ماند و سکولاریسم بدون آزادی معنایی ندارد.»
    </blockquote>

    <div className="mt-10">
      <h2 className="font-bold text-2xl mb-5">
        باورهای من
      </h2>

      <div className="grid grid-cols-2 gap-3 text-gray-700">

        <div>🕊 آزادی</div>

        <div>⚖ برابری</div>

        <div>👩 حقوق زنان</div>

        <div>🌍 سکولاریسم</div>

        <div>💬 گفت‌وگو</div>

      </div>

    </div>

  </div>

  {/* عکس */}

  <div>

    <Image
      src="/images/about.jpg"
      alt="درباره من"
      width={420}
      height={520}
      className="rounded-3xl border-4 border-white shadow-xl w-full object-cover transition duration-500 hover:scale-[1.02] hover:shadow-2xl"
    />

  </div>

</div>

  <div className="mt-16 text-center">

  <p className="text-lg text-gray-700 mb-6">
    اگر مایل هستید دیدگاه‌ها و نوشته‌های مرا بخوانید،
    از بخش مقالات دیدن کنید.
  </p>

  <Link
    href="/blog"
    className="inline-block rounded-xl bg-[#F4A261] px-8 py-4 text-white hover:opacity-90 transition"
  >
    مشاهده مقالات →
  </Link>

</div> 
</main>

      <Footer />
    </>
  );
}