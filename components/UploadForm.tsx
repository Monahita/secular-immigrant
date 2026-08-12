"use client";

import Image from "next/image";
import {
DragEvent,
useRef,
useState,
} from "react";

const MAX_SIZE = 100 * 1024 * 1024;

const ALLOWED_TYPES = [
"image/",
"video/",
"audio/",
"application/pdf",
];

type UploadFormProps = {
  onUploadSuccess?: () => void;
};

export default function UploadForm({
  onUploadSuccess,
}: UploadFormProps) {

const inputRef = useRef<HTMLInputElement>(null);

const [folder, setFolder] = useState("articles");
const [file, setFile] = useState<File | null>(null);
const [previewUrl, setPreviewUrl] = useState("");
const [uploading, setUploading] = useState(false);
const [progress, setProgress] = useState(0);
const [uploadedUrl, setUploadedUrl] = useState("");
const [dragging, setDragging] = useState(false);
const [error, setError] = useState("");

function validateFile(selectedFile: File) {
if (selectedFile.size > MAX_SIZE) {
setError("حجم فایل نباید بیشتر از 100 مگابایت باشد.");
return false;
}


const valid = ALLOWED_TYPES.some((type) =>
  type.endsWith("/")
    ? selectedFile.type.startsWith(type)
    : selectedFile.type === type
);

if (!valid) {
  setError("این نوع فایل پشتیبانی نمی‌شود.");
  return false;
}

return true;

}

function selectFile(selectedFile: File) {
setError("");
setUploadedUrl("");
setProgress(0);


if (!validateFile(selectedFile)) {
  setFile(null);
  setPreviewUrl("");
  return;
}

setFile(selectedFile);

if (selectedFile.type.startsWith("image/")) {
  const url = URL.createObjectURL(selectedFile);
  setPreviewUrl(url);
} else {
  setPreviewUrl("");
}


}

function handleFileChange(
event: React.ChangeEvent<HTMLInputElement>
) {
const selectedFile = event.target.files?.[0];


if (selectedFile) {
  selectFile(selectedFile);
}


}

function handleDragOver(event: DragEvent<HTMLDivElement>) {
event.preventDefault();
setDragging(true);
}

function handleDragLeave(event: DragEvent<HTMLDivElement>) {
event.preventDefault();
setDragging(false);
}

function handleDrop(event: DragEvent<HTMLDivElement>) {
event.preventDefault();
setDragging(false);

const droppedFile = event.dataTransfer.files?.[0];

if (droppedFile) {
  selectFile(droppedFile);
}


}

function removeSelectedFile() {
setFile(null);
setPreviewUrl("");
setUploadedUrl("");
setProgress(0);
setError("");

if (inputRef.current) {
  inputRef.current.value = "";
}


}

function uploadFile() {
if (!file || uploading) return;


setUploading(true);
setProgress(0);
setError("");
setUploadedUrl("");

const form = new FormData();

form.append("file", file);
form.append("folder", folder);

const xhr = new XMLHttpRequest();

xhr.open("POST", "/api/upload");

xhr.upload.onprogress = (event) => {
  if (event.lengthComputable) {
    const percentage = Math.round(
      (event.loaded / event.total) * 100
    );

    setProgress(percentage);
  }
};

xhr.onload = () => {
  setUploading(false);

  try {
    const result = JSON.parse(xhr.responseText);

    if (
      xhr.status < 200 ||
      xhr.status >= 300 ||
      !result.secure_url
    ) {
      throw new Error(
        result.error || "Upload failed"
      );
    }

    setProgress(100);
    setUploadedUrl(result.secure_url);
    onUploadSuccess?.();
  } catch (error) {
    console.error(error);
    setError("آپلود فایل با خطا مواجه شد.");
  }
};

xhr.onerror = () => {
  setUploading(false);
  setError("ارتباط با سرور برقرار نشد.");
};

xhr.onabort = () => {
  setUploading(false);
  setProgress(0);
  setError("آپلود لغو شد.");
};

xhr.send(form);

}

function cancelUpload() {
// در این نسخه لغو واقعی را در مرحله بعد
// با نگه‌داشتن reference به XHR اضافه می‌کنیم.
setUploading(false);
}

async function copyLink() {
if (!uploadedUrl) return;

try {
  await navigator.clipboard.writeText(uploadedUrl);
  alert("لینک کپی شد.");
} catch {
  alert("کپی لینک انجام نشد.");
}

}

const fileSize =
file && file.size < 1024 * 1024
? `${(file.size / 1024).toFixed(1)} KB`
: file
? `${(file.size / 1024 / 1024).toFixed(1)} MB`
: "";

return ( <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

```
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900">
      آپلود فایل
    </h2>

    <p className="mt-2 text-sm text-gray-500">
      فایل را انتخاب کنید یا آن را به داخل کادر بکشید.
    </p>
  </div>

  {/* Folder */}
  <label className="mb-2 block text-sm font-medium text-gray-700">
    محل ذخیره
  </label>

  <select
    value={folder}
    onChange={(event) => setFolder(event.target.value)}
    disabled={uploading}
    className="mb-6 w-full rounded-xl border border-gray-200 bg-white p-3 text-right outline-none transition focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/20"
  >
    <option value="articles">مقالات</option>
    <option value="about">درباره من</option>
    <option value="gallery">گالری</option>
    <option value="videos">ویدئو</option>
    <option value="audio">صوت</option>
    <option value="pdf">PDF</option>
  </select>

  {/* Drop Zone */}
  {!file && (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition ${
        dragging
          ? "border-[#F4A261] bg-[#F4A261]/10"
          : "border-gray-300 bg-gray-50 hover:border-[#F4A261] hover:bg-[#F4A261]/5"
      }`}
    >
      <div className="mb-4 text-6xl">
        {dragging ? "📥" : "☁️"}
      </div>

      <h3 className="font-semibold text-gray-800">
        {dragging
          ? "فایل را رها کنید"
          : "فایل را اینجا بکشید و رها کنید"}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        یا برای انتخاب فایل کلیک کنید
      </p>

      <p className="mt-4 text-xs text-gray-400">
        حداکثر حجم: 100 MB
      </p>

      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )}

  {/* Selected File */}
  {file && (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

      <div className="flex items-start gap-4">

        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white text-3xl">

          {previewUrl ? (
            <Image
              src={previewUrl}
              alt={file.name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          ) : file.type.startsWith("video/") ? (
            "🎬"
          ) : file.type.startsWith("audio/") ? (
            "🎵"
          ) : file.type === "application/pdf" ? (
            "📄"
          ) : (
            "📁"
          )}

        </div>

        <div className="min-w-0 flex-1">
          <p className="break-all font-semibold text-gray-800">
            {file.name}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {fileSize}
          </p>
        </div>

        {!uploading && !uploadedUrl && (
          <button
            type="button"
            onClick={removeSelectedFile}
            className="text-gray-400 transition hover:text-red-500"
            title="حذف انتخاب"
          >
            ✕
          </button>
        )}

      </div>

      {/* Progress */}
      {uploading && (
        <div className="mt-6">

          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">
              در حال آپلود...
            </span>

            <span className="font-semibold text-[#F4A261]">
              {progress}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#F4A261] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>
      )}

      {/* Buttons */}
      {!uploading && !uploadedUrl && (
        <button
          type="button"
          onClick={uploadFile}
          className="mt-6 w-full rounded-xl bg-[#F4A261] py-3 font-semibold text-white transition hover:bg-[#e38c4d]"
        >
          ☁️ آپلود فایل
        </button>
      )}

      {uploading && (
        <button
          type="button"
          onClick={cancelUpload}
          className="mt-4 w-full rounded-xl border border-gray-300 bg-white py-2.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          لغو
        </button>
      )}

    </div>
  )}

  {/* Error */}
  {error && (
    <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
      ⚠️ {error}
    </div>
  )}

  {/* Success */}
  {uploadedUrl && (
    <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">

      <div className="mb-4 font-bold text-green-700">
        ✅ فایل با موفقیت آپلود شد
      </div>

      <div className="mb-3 text-xs text-gray-500">
        لینک فایل:
      </div>

      <input
        value={uploadedUrl}
        readOnly
        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left text-xs"
      />

<div className="mt-3 flex gap-2">
  <button
    type="button"
    onClick={copyLink}
    className="flex-1 rounded-xl bg-[#F4A261] py-2.5 text-sm font-medium text-white hover:bg-[#e38c4d]"
  >
    📋 کپی لینک
  </button>

  <a
    href={uploadedUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 rounded-xl border border-gray-300 bg-white py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-100"
  >
    ↗ مشاهده فایل
  </a>
</div>

<button
  type="button"
  onClick={removeSelectedFile}
  className="mt-3 w-full rounded-xl border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
>
  ➕ آپلود فایل دیگر
</button>
      </div>

  )}

</section>

);
}
