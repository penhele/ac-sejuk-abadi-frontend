"use client";

import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { AppError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { Lock, Mail } from "lucide-react";
import { register } from "../api/register";
import { registerSchema } from "../schemas/register.schema";
import { RegisterPayload } from "../types/register-payload";

export default function RegisterForm({ className }: { className?: string }) {
  const { mutateAsync } = useMutation({
    mutationFn: (data: RegisterPayload) => register(data),
  });

  const form = useAppForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      goeyToast.promise(mutateAsync(value), {
        loading: "Loading...",
        success: "Berhasil Register",
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
          className={cn(
            "space-y-between-items grid grid-cols-4 gap-x-between-card",
            className,
          )}
        >
          <form.AppField name="first_name">
            {(field) => (
              <field.InputField
                label="First Name"
                placeholder="John"
                className="col-span-2"
              />
            )}
          </form.AppField>

          <form.AppField name="last_name">
            {(field) => (
              <field.InputField
                label="Last Name"
                placeholder="Doe"
                className="col-span-2"
              />
            )}
          </form.AppField>

          <form.AppField name="email">
            {(field) => (
              <field.InputField
                label="Email"
                placeholder="john@doe.com"
                className="col-span-4"
                IconAddon={Mail}
              />
            )}
          </form.AppField>

          <form.AppField name="password">
            {(field) => (
              <field.InputField
                type="password"
                label="Password"
                placeholder="********"
                className="col-span-4"
                IconAddon={Lock}
              />
            )}
          </form.AppField>

          <form.SubmitButton label="Create an account" className="col-span-4" />
        </form>
      </FieldGroup>
    </form.AppForm>
  );
}
