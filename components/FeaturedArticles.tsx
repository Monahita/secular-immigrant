import { formatDate } from "@/lib/date";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

function getCardMedia(article: {
  media?: {
    gallery?: string[];
    youtube?: string;
    video?: string;
  };
}) {
  if (article.media?.gallery?.length) {
    return {
      type: "image",
      src: article.media.gallery[0],
    };
  }

  if (article.media?.youtube) {
    const id =
      article.media.youtube.match(/[?&]v=([^&]+)/)?.[1] ||
      article.media.youtube.match(/youtu\.be\/([^?]+)/)?.[1];

    if (id) {
      return {
        type: "image",
        src: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      };
    }
  }

  if (article.media?.video) {
    return {
      type: "video",
      src: article.media.video,
    };
  }

  return null;
}

export default function FeaturedArticles() {
  const articles = getAllArticles()
  .filter((article) => article.featured)
  .slice(0, 3);

  return (
    
    <section className="max-w-6xl mx-auto px-6 py-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
        const cover = getCardMedia(article);

           return (

          <article
            key={article.slug}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            
            <div className="relative h-48 overflow-hidden bg-gray-100">

  {!cover && (
    <div className="flex h-full items-center justify-center text-5xl">
      📄
    </div>
  )}

  {cover?.type === "image" && (
    <img
      src={cover.src}
      alt={article.title}
      className="w-full h-full object-cover"
    />
  )}

  {cover?.type === "video" && (
    <div className="flex h-full items-center justify-center text-6xl">
      🎬
    </div>
  )}

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

  <span>{formatDate(article.publishedAt)}</span>
</div>

<Link
  href={`/blog/${article.slug}`}
  className="inline-block mt-6 text-[#F4A261] font-semibold"
>
  ادامه مطلب →
</Link>
  </div>
          </article>
               );
      })}
        
      </div>
    </section>
  );
}