"use client";

import { useFormContext } from "@/hooks/use-app-form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  label?: string;
  className?: string;
  isDisabled?: boolean;
  Icon?: LucideIcon;
};

export default function SubmitButton({
  label,
  className,
  isDisabled,
  Icon,
}: Props) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        canSubmit: state.canSubmit,
      })}
    >
      {({ isSubmitting, canSubmit }) => (
        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting || isDisabled}
          className={cn(className)}
        >
          {label && <span>{isSubmitting ? <Spinner /> : label}</span>}
          {Icon && <Icon />}
        </Button>
      )}
    </form.Subscribe>
  );
}
