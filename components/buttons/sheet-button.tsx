import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  label?: string;
  Icon?: LucideIcon;
  title: string;
  description?: string;
  children: ReactNode;
  size?:
    "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  variant?:
    "link" | "default" | "outline" | "secondary" | "ghost" | "destructive";
  className?: string;
}

export default function SheetButton({
  label,
  Icon,
  title,
  description,
  children,
  size,
  variant = "outline",
  className,
}: Readonly<Props>) {
  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        <Button variant={variant} size={size}>
          {Icon && <Icon />} {label}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  );
}
