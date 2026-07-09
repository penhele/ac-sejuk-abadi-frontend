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
import { useAuthToken } from "../hooks";
import { loginSchema } from "../schemas/login.schema";
import { LoginPayload } from "../types/login-payload";

interface Props {
  className?: string;
}

export default function LoginForm({ className }: Props) {
  const router = useRouter();
  const { setToken } = useAuthToken();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: LoginPayload) => login(data),
    onSuccess: ({ access_token, user }) => {
      setToken(access_token);
      router.push(user.role === "admin" ? ROUTES.DASHBOARD : ROUTES.HOME);
    },
  });

  const handleLogin = ({ value }: { value: LoginPayload }) => {
    goeyToast.promise(mutateAsync(value), {
      loading: "Logging in...",
      success: "Berhasil login",
      error: (err) => (err as AppError).message,
    });
  };

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: handleLogin,
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
              <field.InputField
                label="Email"
                placeholder="john@doe.com"
                IconAddon={Mail}
              />
            )}
          />

          <form.AppField
            name="password"
            children={(field) => (
              <field.InputField
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
