"use client";

import { FieldGroup } from "@/components/ui/field";
import { ROUTES } from "@/constants/routes";
import { useAppForm } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { AppError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "../api/login";
import { loginSchema } from "../schemas/login.schema";
import { LoginPayload } from "../types/login-payload";

interface Props {
  className?: string;
}

export default function LoginForm({ className }: Props) {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: LoginPayload) => login(data),
  });

  console.log("isPending: ", isPending);

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      goeyToast.promise(mutateAsync(value), {
        loading: "Logging in...",
        success: (data) => {
          if (data.user.role === "user") router.push(ROUTES.HOME);
          else if (data.user.role === "admin") router.push(ROUTES.DASHBOARD);

          return "Berhasil login";
        },
        error: (err) => (err as AppError).message,
      });
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
              <field.TextField
                label="Email"
                placeholder="john@doe.com"
                IconAddon={Mail}
              />
            )}
          />

          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField
                type="password"
                label="Password"
                placeholder="••••••••"
                IconAddon={Lock}
              />
            )}
          />

          <form.SubmitButton
            label="Sign in"
            className="w-full"
            loading={isPending}
          />
        </form>
      </FieldGroup>
    </form.AppForm>
  );
}
