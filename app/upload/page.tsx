"use client";

import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import MediaGrid from "@/components/MediaGrid";

export default function UploadPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleUploadSuccess() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-[#F4A261]">
          مرکز مدیریت رسانه
        </h1>

        <p className="mt-3 text-gray-600">
          تصاویر، ویدئوها، فایل‌های صوتی و PDF را اینجا مدیریت کنید.
        </p>
      </header>

      <UploadForm onUploadSuccess={handleUploadSuccess} />

      <section className="mt-12">
        <MediaGrid refreshKey={refreshKey} />
      </section>

    </main>
  );
}