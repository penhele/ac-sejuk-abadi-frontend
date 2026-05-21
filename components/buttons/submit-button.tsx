"use client";

import { useFormContext } from "@/hooks/use-app-form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function SubmitButton({ label }: { label: string }) {
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
          className=""
        >
          {isSubmitting ? <Spinner /> : label}
        </Button>
      )}
    </form.Subscribe>
  );
}
