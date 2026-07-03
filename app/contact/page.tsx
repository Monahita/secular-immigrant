import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
<Image
  src="/images/contact.jpg"
  alt="تماس با مهاجر سکولار"
  width={1600}
  height={900}
  className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-3xl mb-10"
/>
export default function ContactPage() {
  return (
    
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-20">

        <h1 className="text-center text-5xl font-bold text-[var(--primary)]">
          تماس با من
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-center leading-8 text-gray-600">
          اگر درباره آزادی، حقوق بشر، سکولاریسم، حقوق زنان،
          مهاجرت یا همکاری رسانه‌ای پرسشی دارید،
          خوشحال می‌شوم پیام شما را از طریق فرم زیر دریافت کنم.
        </p>

        <ContactForm />

      </main>

      <Footer />
    </>
  );
}