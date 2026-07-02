import Link from "next/link";

const menuItems = [
  { href: "/", label: "خانه" },
  { href: "/blog", label: "مقالات" },
  { href: "/about", label: "درباره من" },
  { href: "/contact", label: "تماس" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-[var(--primary)] transition hover:opacity-80"
        >
          مهاجر سکولار
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative transition duration-300 hover:text-[var(--primary)] after:absolute after:-bottom-1 after:right-0 after:h-0.5 after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </div>

      </nav>
    </header>
  );
}