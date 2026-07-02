import Link from "next/link";

const footerLinks = [
  { href: "/", label: "خانه" },
  { href: "/blog", label: "مقالات" },
  { href: "/about", label: "درباره من" },
  { href: "/contact", label: "تماس" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-12">

        <h2 className="text-2xl font-bold text-[var(--primary)]">
          مهاجر سکولار
        </h2>

        <p className="mt-3 text-center text-gray-600">
          اندیشه • آزادی • حقوق بشر
        </p>

        <nav className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[var(--primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex gap-6 text-sm text-gray-500">
          <span>𝕏 (به‌زودی)</span>
          <span>✉️ Email (به‌زودی)</span>
        </div>

        <div className="mt-10 h-px w-full bg-gray-200" />

        <p className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} مهاجر سکولار — تمامی حقوق محفوظ است.
        </p>

      </div>
    </footer>
  );
}