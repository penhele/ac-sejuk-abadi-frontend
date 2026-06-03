"use client";

import { FieldGroup } from "@/components/ui/field";
import { ROUTES } from "@/constants/routes";
import { useAppForm } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "../api/login";
import { LoginPayload } from "../types/login-payload";
import { loginSchema } from "../schemas/login.schema";

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
            children={(field) => (
              <field.TextField label="Email" placeholder="john@doe.com" />
            )}
          />

          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField
                type="password"
                label="Password"
                placeholder="********"
              />
            )}
          />

          <form.SubmitButton label="Submit" />
        </form>
      </FieldGroup>
    </form.AppForm>
  );
}
