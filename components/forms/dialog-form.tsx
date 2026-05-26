"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type BaseCreateFormProps<T extends { name: string }> = {
  title: string;
  description?: string;
  defaultValues: T;
  onSubmit: (value: T) => Promise<unknown>;
  invalidateQueryKey: readonly unknown[];
  successMessage: string;
  errorMessage: string;
};

export default function DialogForm<T extends { name: string }>({
  title,
  description,
  defaultValues,
  onSubmit,
  invalidateQueryKey,
  successMessage,
  errorMessage,
}: BaseCreateFormProps<T>) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: onSubmit,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: invalidateQueryKey,
      });

      toast.success(successMessage);
    },

    onError() {
      toast.error(errorMessage);
    },
  });

  const form = useAppForm({
    defaultValues,

    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  return (
    <form.AppForm>
      <form
        className="flex flex-col gap-6"
        onSubmit={async (e) => {
          e.preventDefault();
          await form.handleSubmit();
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form.AppField name="name">
          {(field) => <field.TextField label="Name" />}
        </form.AppField>

        <DialogFooter>
          <form.SubmitButton label="Submit" />
        </DialogFooter>
      </form>
    </form.AppForm>
  );
}
