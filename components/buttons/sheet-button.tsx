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
}

export default function SheetButton({
  label,
  Icon,
  title,
  description,
  children,
  size,
}: Readonly<Props>) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={size}>
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
