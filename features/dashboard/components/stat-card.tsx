import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";

type Props = {
  title: string;
  description: string;
  value: number;
  Icon: LucideIcon;
  className?: string;
} & StatVariants;

export default function StatCard({
  title,
  description,
  value,
  Icon,
  color,
}: Props) {
  const styles = statCard({ color });

  return (
    <Card className={styles.card()}>
      <CardHeader>
        <CardTitle className={styles.title()}>{title}</CardTitle>

        <CardAction className={styles.iconWrapper()}>
          <Icon className={styles.icon()} />
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className={cn(styles.value())}>{value.toLocaleString()}</div>

        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

const statCard = tv({
  slots: {
    card: "bg-gradient-to-br hover:shadow-md transition-all duration-300",
    title: "text-sm font-medium",
    value: "text-3xl font-bold",
    iconWrapper: "p-2 rounded-lg",
    icon: "h-4 w-4",
  },

  variants: {
    color: {
      sky: {
        card: "from-sky-500/10 to-sky-600/5 border-sky-200/50 dark:border-sky-800/50",
        title: "text-sky-700 dark:text-sky-400",
        value: "text-sky-600 dark:text-sky-400",
        iconWrapper: "bg-sky-100 dark:bg-sky-900/40",
        icon: "text-sky-600 dark:text-sky-400",
      },

      purple: {
        card: "from-purple-500/10 to-purple-600/5 border-purple-200/50 dark:border-purple-800/50",
        title: "text-purple-700 dark:text-purple-400",
        value: "text-purple-600 dark:text-purple-400",
        iconWrapper: "bg-purple-100 dark:bg-purple-900/40",
        icon: "text-purple-600 dark:text-purple-400",
      },

      indigo: {
        card: "from-indigo-500/10 to-indigo-600/5 border-indigo-200/50 dark:border-indigo-800/50",
        title: "text-indigo-700 dark:text-indigo-400",
        value: "text-indigo-600 dark:text-indigo-400",
        iconWrapper: "bg-indigo-100 dark:bg-indigo-900/40",
        icon: "text-indigo-600 dark:text-indigo-400",
      },

      emerald: {
        card: "from-emerald-500/10 to-emerald-600/5 border-emerald-200/50 dark:border-emerald-800/50",
        title: "text-emerald-700 dark:text-emerald-400",
        value: "text-emerald-600 dark:text-emerald-400",
        iconWrapper: "bg-emerald-100 dark:bg-emerald-900/40",
        icon: "text-emerald-600 dark:text-emerald-400",
      },
    },
  },

  defaultVariants: {
    color: "purple",
  },
});

type StatVariants = VariantProps<typeof statCard>;
