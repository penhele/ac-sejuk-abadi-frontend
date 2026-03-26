import { Separator } from "../ui/separator";

export function HeaderSection({ title }: { title: string }) {
  return (
    <div className="space-y-2 mb-2">
      <h1 className="header-h2">{title}</h1>
      <Separator />
    </div>
  );
}

export function DescriptionSection({ description }: { description: string }) {
  return (
    <p className="text-gray-600 leading-relaxed text-base">{description}</p>
  );
}
