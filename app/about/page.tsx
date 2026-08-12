import Image from "next/image";
import Link from "next/link";
import { getPage } from "@/lib/pages";
import { notFound } from "next/navigation";

export default function AboutPage() {
  const page = getPage("about");

  if (!page) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-[#F4A261] mb-10">
        {page.title}
      </h1>

      <div className="grid lg:grid-cols-[1fr_320px] gap-14 items-start">

        {/* متن */}
        <div>
          <div className="space-y-8 text-gray-700 leading-9 text-lg">

            {page.intro && <p>{page.intro}</p>}
            {page.paragraph1 && <p>{page.paragraph1}</p>}
            {page.paragraph2 && <p>{page.paragraph2}</p>}
            {page.paragraph3 && <p>{page.paragraph3}</p>}

            {page.quote && (
              <blockquote className="border-r-4 border-orange-400 pr-6 italic text-xl text-gray-800">
                {page.quote}
              </blockquote>
            )}

            {page.beliefs && page.beliefs.length > 0 && (
              <ul className="space-y-3 list-disc pr-6">
                {page.beliefs.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}

            {page.buttonText && page.buttonLink && (
              <Link
                href={page.buttonLink}
                className="inline-block rounded-xl bg-[#F4A261] px-6 py-3 text-white hover:bg-[#E98B45] transition"
              >
                {page.buttonText}
              </Link>
            )}

          </div>
        </div>

        {/* عکس */}
        <div>
          {page.image && (
            <Image
              src={page.image}
              alt={page.title}
              width={420}
              height={520}
              className="rounded-3xl border-4 border-white shadow-xl w-full object-cover"
            />
          )}
        </div>

      </div>
    </main>
  );
}