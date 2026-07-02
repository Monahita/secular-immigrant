import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-[#F4A261] mb-10">
          مقالات
        </h1>

        <p className="text-gray-600">
          هنوز مقاله‌ای منتشر نشده است.
        </p>
      </main>

      <Footer />
    </>
  );
}