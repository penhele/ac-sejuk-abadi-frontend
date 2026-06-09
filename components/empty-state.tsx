import { LucideIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { ROUTES } from "@/constants/routes";
import { Button } from "./ui/button";
import Link from "next/link";

export default function EmptyState({
  Icon,
  label,
  description,
  buttonLabel,
  className,
}: {
  Icon: LucideIcon;
  label: string;
  description?: string;
  buttonLabel?: string;
  className?: string;
}) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>

        <EmptyTitle>{label}</EmptyTitle>

        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>

      {buttonLabel && (
        <EmptyContent>
          <Link href={ROUTES.SHOP}>
            <Button variant={"outline"}>{buttonLabel}</Button>
          </Link>
        </EmptyContent>
      )}
    </Empty>
  );
}
