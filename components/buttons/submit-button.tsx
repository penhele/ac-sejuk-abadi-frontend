"use client";

import { useFormContext } from "@/hooks/use-app-form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props {
  label?: string;
  className?: string;
  isDisabled?: boolean;
  loading?: boolean;
  Icon?: LucideIcon;
}

export default function SubmitButton({
  label,
  className,
  isDisabled,
  loading = false,
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
      {({ isSubmitting, canSubmit }) => {
        const isLoading = isSubmitting || loading;

        return (
          <Button
            type="submit"
            disabled={!canSubmit || isLoading || isDisabled}
            className={cn(className)}
          >
            {isLoading ? <Spinner /> : Icon ? <Icon /> : label}
          </Button>
        );
      }}
    </form.Subscribe>
  );
}
