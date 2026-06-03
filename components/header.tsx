import Link from "next/link";
import { Separator } from "./ui/separator";

export function Header({ title, href }: { title: string; href?: string }) {
  return (
    <div className="space-y-2 mb-4">
      <div className="flex justify-between items-end">
        <h1 className="text-lg font-bold xs:text-2xl">{title}</h1>

        {href && (
          <Link href={href}>
            <span className="text-xs xs:text-sm italic text-gray-600 dark:text-white transition hover:text-primary hover:underline">
              Lihat selengkapnya &gt;&gt;&gt;
            </span>
          </Link>
        )}
      </div>
      <Separator />
    </div>
  );
}
