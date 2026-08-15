type ArticleMediaProps = {
  article: {
    image?: string;
    media?: {
      youtube?: string;
      video?: string;
      audio?: string;
      pdf?: string;
      gallery?: string[];
    };
  };
};

function getYouTubeEmbed(url: string) {
  if (!url) return "";

  if (url.includes("/embed/")) return url;

  const match = url.match(/[?&]v=([^&]+)/);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  const short = url.match(/youtu\.be\/([^?]+)/);
  if (short) {
    return `https://www.youtube.com/embed/${short[1]}`;
  }

  return url;
}

export default function ArticleMedia({
  article,
}: ArticleMediaProps) {
  if (article.media?.youtube) {
    return (
      <div className="my-10">
        <iframe
          src={getYouTubeEmbed(article.media.youtube)}
          className="w-full aspect-video rounded-2xl shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (article.media?.video) {
    return (
      <div className="my-10 flex justify-center">
  <video
    controls
    preload="metadata"
    className="w-full max-w-xl rounded-2xl shadow-lg"
  >
    <source src={article.media.video} type="video/mp4" />
    مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
  </video>
</div>

    );
  }

if (article.media?.audio) {
  return (
    <div className="my-10">
      <audio
        controls
        className="w-full"
      >
        <source
          src={article.media.audio}
        />
      </audio>
    </div>
  );
}
if (article.media?.pdf) {
  return (
    <div className="my-10">
      <a
        href={article.media.pdf}
        target="_blank"
        className="inline-flex items-center rounded-xl bg-[#F4A261] px-6 py-3 text-white font-semibold"
      >
        📄 مشاهده فایل PDF
      </a>
    </div>
  );
}
if (
  article.media?.gallery &&
  article.media.gallery.length > 0
) {
  return (
    <div className="grid grid-cols-2 gap-4 my-10">
      {article.media.gallery.map((img) => (
        <img
          key={img}
          src={img}
          className="rounded-xl"
        />
      ))}
    </div>
  );
}
  if (article.image) {
  return (
    <div className="my-10 flex justify-center">
      <img
        src={article.image}
        alt=""
        className="h-[200px] w-[320px] rounded-2xl object-cover shadow-md md:h-[230px] md:w-[420px]"
      />
    </div>
  );
}

  return null;
}