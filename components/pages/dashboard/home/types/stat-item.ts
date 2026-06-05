import { LucideIcon } from "lucide-react";

export type StatColor = "sky" | "purple" | "indigo" | "emerald";

export type StatItem = {
  title: string;
  description: string;
  value: number;
  Icon: LucideIcon;
  color: StatColor;
};
