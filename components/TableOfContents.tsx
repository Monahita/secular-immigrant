t/**
 * Secular Immigrant
 * File: components/TableOfContents.tsx
 * Version: 1.0
 * Status: Stable
 */

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  items: TocItem[];
};

export default function TableOfContents({
  items,
}: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="فهرست مطالب"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-5 text-lg font-bold text-gray-900">
        فهرست مطالب
      </h2>

      <ul className="space-y-3">

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
              className="
                block
                text-gray-600
                hover:text-[#F4A261]
                transition-colors
                duration-200
              "
            >
              {item.text}
            </a>

          </li>

        ))}

      </ul>
    </nav>
  );
}