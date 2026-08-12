"use client";

import Image from "next/image";

type Props = {
  name: string;
  url: string;
  public_id: string;
  resource_type: string;
  type: "image" | "video" | "pdf" | "audio";
  onDelete: (
    public_id: string,
    resource_type: string
  ) => void;
};

export default function MediaCard({
  name,
  url,
  public_id,
  resource_type,
  type,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-lg transition">

      <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gray-100">

        {type === "image" && (
          <Image
            src={url}
            alt={name}
            width={400}
            height={250}
            className="h-full w-full object-cover"
          />
        )}

        {type === "video" && (
          <div className="text-6xl">🎬</div>
        )}

        {type === "audio" && (
          <div className="text-6xl">🎵</div>
        )}

        {type === "pdf" && (
          <div className="text-6xl">📄</div>
        )}

      </div>

      <h3 className="font-bold text-center break-all">
        {name}
      </h3>

      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(url)}
        className="mt-5 w-full rounded-xl bg-[#F4A261] py-2 text-white hover:bg-[#e38c4d]"
      >
        📋 کپی لینک
      </button>

      <button
  type="button"
  onClick={() => onDelete(public_id, resource_type)}
  className="mt-3 w-full rounded-xl bg-red-600 py-2 text-white hover:bg-red-700"
>
  🗑 حذف فایل
</button>

    </div>
  );
}