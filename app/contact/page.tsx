import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { getPage } from "@/lib/content";

export default function ContactPage() {
  const { frontmatter } = getPage("contact");

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <Image
        src={frontmatter.image}
        alt={frontmatter.title}
        width={1600}
        height={900}
        className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-3xl mb-10"
      />

      <h1 className="text-center text-5xl font-bold text-[var(--primary)]">
        {frontmatter.title}
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-center leading-8 text-gray-600">
        {frontmatter.paragraph1}
      </p>

      <ContactForm />
    </main>
  );
}