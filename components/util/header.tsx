import Link from "next/link";
import { Separator } from "../ui/separator";

export function HeaderSection({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="space-y-2 mb-4">
      <div className="flex justify-between items-end">
        <h1 className="header-h2">{title}</h1>

        {href && (
          <Link href={href}>
            <span className="text-sm italic text-gray-600">
              Lihat selengkapnya &gt;&gt;&gt;
            </span>
          </Link>
        )}
      </div>
      <Separator />
    </div>
  );
}

export function DescriptionSection({ description }: { description: string }) {
  return (
    <p className="text-gray-600 leading-relaxed text-base">{description}</p>
  );
}
