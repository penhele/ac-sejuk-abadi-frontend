"use client";

import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  label?: string;
  Icon?: LucideIcon;
  className?: string;
  variant?:
    "default" | "link" | "outline" | "secondary" | "ghost" | "destructive";
  size?:
    "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
}

export default function ButtonLink({
  href,
  label,
  Icon,
  className,
  variant = "outline",
  size = "icon-xs",
}: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(href)}
      variant={variant}
      size={size}
      className={cn(className)}
    >
      {Icon && <Icon />}
      {label && label}
    </Button>
  );
}
