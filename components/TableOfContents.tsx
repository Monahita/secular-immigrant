/**
 * Secular Immigrant
 * File: components/TableOfContents.tsx
 * Version: 2.0
 */

"use client";
import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  items: TocItem[];
};

export default function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
  const headings = items
    .map((item) => document.getElementById(item.id))
    .filter(Boolean) as HTMLElement[];

  if (!headings.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);

      if (visible) {
        setActiveId(visible.target.id);
      }
    },
    {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    }
  );

  headings.forEach((heading) => observer.observe(heading));

  return () => observer.disconnect();
}, [items]);
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="فهرست مطالب"
      className=" rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-lg font-bold text-gray-900">
        فهرست مطالب
      </h2>

      <ul className="space-y-2">

        {items.map((item) => (

          <li
            key={item.id}
            className={
              item.level === 3
                ? "mr-5"
                : item.level >= 4
                ? "mr-10"
                : ""
            }
          >

            <a
              href={`#${item.id}`}
              className={` block rounded-lg border-r-2 py-2 pr-3 text-sm leading-7 transition-all duration-200

  ${
    activeId === item.id
      ? "border-[#F4A261] bg-orange-50 text-gray-900 font-semibold"
      : "border-transparent text-gray-500 hover:border-[#F4A261] hover:bg-orange-50 hover:text-gray-900"
  }
  `}
            
            >
              {item.text}
            </a>

          </li>

        ))}

      </ul>
    </nav>
  );
}