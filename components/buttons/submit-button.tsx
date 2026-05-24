"use client";

import { useFormContext } from "@/hooks/use-app-form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

export default function SubmitButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
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
          disabled={!canSubmit || isSubmitting}
          className={cn('min-w-24', className)}
        >
          {isSubmitting ? <Spinner /> : label}
        </Button>
      )}
    </form.Subscribe>
  );
}
