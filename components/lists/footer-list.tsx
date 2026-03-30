import Link from "next/link";

export default function FooterList({
  title,
  list,
}: {
  title: string;
  list: { name: string; href: string }[];
}) {
  return (
    <div className="space-y-4">
      <h1 className="font-semibold uppercase text-xs tracking-widest">
        {title}
      </h1>

      <ul className="space-y-2">
        {list.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="block text-sm">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
