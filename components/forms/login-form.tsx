"use client";

import { ROUTES } from "@/constants/routes";
import { useAppForm } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/schemas/auth.schema";
import { login } from "@/services/auth.service";
import { LoginPayload } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FieldGroup } from "../ui/field";

export default function LoginForm({ className }: { className?: string }) {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: (data: LoginPayload) => login(data),
    onSuccess() {
      toast.success("Berhasil login");
      router.push(ROUTES.DASHBOARD);
    },
    onError() {
      toast.error("Gagal login");
      form.reset();
    },
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  return (
    <form.AppForm>
      <FieldGroup>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className={cn("space-y-between-items", className)}
        >
          <form.AppField
            name="email"
            children={(field) => <field.TextField label="Email" />}
          />

          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField type="password" label="Password" />
            )}
          />

          <form.SubmitButton label="Submit" />
        </form>
      </FieldGroup>
    </form.AppForm>
  );
}
