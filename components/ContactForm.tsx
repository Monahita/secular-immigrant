"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.subject ||
      !form.message
    ) {
      alert("لطفاً همه فیلدها را تکمیل کنید.");
      return;
    }

    alert("پیام شما با موفقیت ثبت شد. (در مرحله بعد به ایمیل متصل می‌شود)");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-2xl space-y-6"
    >
      <div>
        <label className="mb-2 block font-medium">
          نام و نام خانوادگی
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[var(--primary)]"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          ایمیل
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[var(--primary)]"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          موضوع
        </label>

        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[var(--primary)]"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          پیام
        </label>

        <textarea
          name="message"
          rows={7}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[var(--primary)]"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-[var(--primary)] px-8 py-3 font-semibold text-white transition hover:opacity-90"
      >
        ارسال پیام
      </button>
    </form>
  );
}