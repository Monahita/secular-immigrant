"use client";

import { useEffect, useMemo, useState } from "react";
import MediaCard from "./MediaCard";

type MediaGridProps = {
refreshKey?: number;
public_id: string;
display_name: string;
secure_url: string;
resource_type: string;
format: string;
};

type Filter = "all" | "image" | "video" | "pdf" | "audio";

export default function MediaGrid({
  refreshKey,
}: MediaGridProps) {
const [items, setItems] = useState<MediaItem[]>([]);
const [filter, setFilter] = useState<Filter>("all");
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  loadMedia();
}, [refreshKey]);

async function loadMedia() {
  try {
    setLoading(true);
    setError("");

    const response = await fetch("/api/media");

    if (!response.ok) {
      throw new Error("Cannot load media");
    }

    const data = await response.json();
    setItems(data);
  } catch (error) {
    console.error(error);
    setError("فایل‌ها بارگذاری نشدند.");
  } finally {
    setLoading(false);
  }
}

async function handleDelete(
  public_id: string,
  resource_type: string
) {

const ok = confirm("آیا از حذف این فایل مطمئن هستید؟");


if (!ok) return;

try {
  const response = await fetch("/api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      public_id,
      resource_type,
    }),
  });

  const result = await response.json();

  if (!response.ok || result.result !== "ok") {
    throw new Error(result.error || "Delete failed");
  }

  setItems((currentItems) =>
    currentItems.filter(
      (item) => item.public_id !== public_id
    )
  );
} catch (error) {
  console.error(error);
  alert("حذف فایل با خطا مواجه شد.");
}


}

function getType(item: MediaItem): Filter {
const format = item.format?.toLowerCase();

if (item.resource_type === "image") {
  return "image";
}

if (item.resource_type === "video") {
  if (
    ["mp3", "wav", "m4a", "ogg", "aac", "flac"].includes(format)
  ) {
    return "audio";
  }

  return "video";
}

if (format === "pdf") {
  return "pdf";
}

if (
  ["mp3", "wav", "m4a", "ogg", "aac", "flac"].includes(format)
) {
  return "audio";
}

return "all";

}

const filteredItems = useMemo(() => {
const query = search.trim().toLowerCase();


return items.filter((item) => {
  const itemType = getType(item);

  const matchesFilter =
    filter === "all" || itemType === filter;

  const matchesSearch =
    !query ||
    item.display_name.toLowerCase().includes(query) ||
    item.public_id.toLowerCase().includes(query);

  return matchesFilter && matchesSearch;
});


}, [items, filter, search]);

const counts = useMemo(() => {
return {
all: items.length,
image: items.filter(
(item) => getType(item) === "image"
).length,
video: items.filter(
(item) => getType(item) === "video"
).length,
pdf: items.filter(
(item) => getType(item) === "pdf"
).length,
audio: items.filter(
(item) => getType(item) === "audio"
).length,
};
}, [items]);

const filters: {
key: Filter;
label: string;
}[] = [
{ key: "all", label: "همه" },
{ key: "image", label: "🖼 تصاویر" },
{ key: "video", label: "🎬 ویدئوها" },
{ key: "pdf", label: "📄 PDF" },
{ key: "audio", label: "🎵 صوت" },
];

if (loading) {
return ( <div className="py-16 text-center text-gray-500"> <div className="mb-3 text-4xl">⏳</div>
در حال بارگذاری فایل‌ها... </div>
);
}

if (error) {
return ( <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600"> <div className="mb-3 text-4xl">⚠️</div>

    <p>{error}</p>

    <button
      type="button"
      onClick={loadMedia}
      className="mt-4 rounded-xl bg-[#F4A261] px-5 py-2 text-white hover:bg-[#e38c4d]"
    >
      تلاش دوباره
    </button>
  </div>
);


}

return ( <section>

  {/* Header */}
  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        مدیریت رسانه
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {items.length} فایل در کتابخانه رسانه
      </p>
    </div>

    {/* Search */}
    <div className="relative w-full md:max-w-sm">

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="جست‌وجوی فایل..."
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-11 text-right text-sm outline-none transition focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/20"
      />

    </div>
  </div>

  {/* Filters */}
  <div className="mb-8 flex flex-wrap gap-2">

    {filters.map((item) => (
      <button
        key={item.key}
        type="button"
        onClick={() => setFilter(item.key)}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          filter === item.key
            ? "bg-[#F4A261] text-white shadow-sm"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {item.label}

        <span className="mr-1.5 opacity-70">
          ({counts[item.key]})
        </span>
      </button>
    ))}

  </div>

  {/* Search result */}
  {search.trim() && (
    <div className="mb-5 text-sm text-gray-500">
      نتیجه برای «{search}»: {filteredItems.length} فایل
    </div>
  )}

  {/* Grid */}
  {filteredItems.length > 0 ? (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {filteredItems.map((item) => (
        <MediaCard
          key={item.public_id}
          public_id={item.public_id}
          name={item.display_name}
          url={item.secure_url}
          resource_type={item.resource_type}
          type={getType(item) as
            | "image"
            | "video"
            | "pdf"
            | "audio"}
          onDelete={handleDelete}
        />
      ))}

    </div>
  ) : (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">

      <div className="mb-3 text-5xl">
        {search.trim() ? "🔍" : "📂"}
      </div>

      <h3 className="font-semibold text-gray-700">
        {search.trim()
          ? "فایلی پیدا نشد"
          : "هنوز فایلی وجود ندارد"}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {search.trim()
          ? "عبارت جست‌وجو را تغییر بده."
          : "اولین فایل خود را آپلود کن."}
      </p>

    </div>
  )}

</section>


);
}
