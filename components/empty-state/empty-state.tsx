import { LucideIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { ROUTES } from "@/contants/routes";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptyState({
  Icon,
  label,
  description,
  buttonLabel,
}: {
  Icon: LucideIcon;
  label: string;
  description?: string;
  buttonLabel?: string;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>

        <EmptyTitle>{label}</EmptyTitle>

        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Link href={ROUTES.SHOP}>
          <Button variant={"outline"}>
            {buttonLabel ?? "Browse Products"}
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
