"use client";

import { useFormContext } from "@/hooks/use-app-form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  className?: string;
  isDisabled?: boolean;
  loading?: boolean;
}

export default function SubmitButton({
  label,
  className,
  isDisabled,
  loading = false,
}: Props) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        canSubmit: state.canSubmit,
      })}
    >
      {({ isSubmitting, canSubmit }) => {
        const isLoading = isSubmitting || loading;

        return (
          <Button
            type="submit"
            disabled={!canSubmit || isLoading || isDisabled}
            className={cn("min-w-24", className)}
          >
            {isLoading ? <Spinner /> : label}
          </Button>
        );
      }}
    </form.Subscribe>
  );
}
