import Link from "next/link";
import { getSiteSettings } from "@/lib/content";

const footerLinks = [
  { href: "/", label: "خانه" },
  { href: "/blog", label: "مقالات" },
  { href: "/about", label: "درباره من" },
  { href: "/contact", label: "تماس" },
];

export default function Footer() {
  const site = getSiteSettings();

  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-12">

        <h2 className="text-2xl font-bold text-[var(--primary)]">
          {site.siteName}
        </h2>

        <p className="mt-3 text-center text-gray-600">
          {site.tagline}
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

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          {site.twitter && (
            <a
              href={site.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              𝕏
            </a>
          )}

          {site.telegram && (
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
          )}

          {site.youtube && (
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          )}

          {site.email && (
            <a href={`mailto:${site.email}`}>
              ✉️ Email
            </a>
          )}
        </div>

        <div className="mt-10 h-px w-full bg-gray-200" />

        <p className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {site.footer}
        </p>

      </div>
    </footer>
  );
}