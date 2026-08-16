import Link from "next/link";
import { getSiteSettings } from "@/lib/content";
import Image from "next/image";

const menuItems = [
  { href: "/", label: "خانه" },
  { href: "/blog", label: "مقالات" },
  { href: "/about", label: "درباره من" },
  { href: "/contact", label: "تماس" },
  { href: "https://www.autonomy-secular.site/", label: "Deutsch" },
  
];

export default function Navbar() {
  const site = getSiteSettings();
  
  
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
      <Link
  href="/"
  className="flex items-center gap-3 transition hover:opacity-80"
>
  {site.logo && (
  <div className="relative h-[70px] w-[110px] shrink-0">
    <Image
      src={site.logo}
      alt={site.siteName}
      fill
      sizes="110px"
      className="scale-[1.22] object-contain"
      priority
    />
  </div>
)}

  <span className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-[var(--primary)]">
    {site.siteName}
  </span>
</Link>

        <div className="flex items-center gap-3 text-xs font-medium text-gray-700 sm:gap-5 sm:text-sm lg:gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative whitespace-nowrap transition duration-300 hover:text-[var(--primary)] ..."
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}