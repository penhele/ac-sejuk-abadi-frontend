import Image from "next/image";
import { Badge } from "../ui/badge";
import { Briefcase, LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  Icon: LucideIcon;
  IconLabel: string;
};

export default function HeroSection({
  title,
  description,
  Icon,
  IconLabel,
}: Props) {
  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen h-80 overflow-hidden bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 ">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto flex items-center h-full px-4 md:px-0">
        <div className="flex flex-col space-y-2">
          <Badge variant={"outline"} className="text-primary">
            <Icon /> {IconLabel}
          </Badge>

          <div className="">
            <h1 className="text-4xl font-bold">{title}</h1>
            <span className="text-muted-foreground">{description}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
