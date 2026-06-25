import { LucideIcon } from "lucide-react";
import { Badge } from "../ui/badge";

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
    <section className="relative left-1/2 -translate-x-1/2 w-screen h-80 overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-b border-border/30">
      {/* Dotted/Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Decorative Blur Glows */}
      <div className="pointer-events-none absolute -top-32 right-[15%] h-96 w-96 rounded-full bg-primary/8 dark:bg-primary/4 blur-3xl opacity-80" />
      <div className="pointer-events-none absolute -bottom-32 left-[15%] h-96 w-96 rounded-full bg-blue-500/8 dark:bg-blue-500/4 blur-3xl opacity-80" />

      <div className="max-w-7xl mx-auto flex items-center h-full px-4 xl:px-0 relative z-10">
        <div className="flex flex-col space-y-3.5">
          {/* Badge */}
          <div>
            <Badge
              variant="outline"
              className="w-fit gap-1.5 px-3 py-1 bg-white/70 dark:bg-black/40 backdrop-blur-xs border-primary/20 text-primary font-semibold text-xs rounded-full shadow-2xs"
            >
              <Icon className="w-3.5 h-3.5 stroke-2" />
              <span>{IconLabel}</span>
            </Badge>
          </div>

          {/* Title and Description */}
          <div className="space-y-1.5">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {title}
            </h1>

            <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
