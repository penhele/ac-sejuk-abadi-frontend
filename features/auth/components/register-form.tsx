"use client";

import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { AppError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { register } from "../api/register";
import { registerSchema } from "../schemas/register.schema";
import { RegisterPayload } from "../types/register-payload";

export default function RegisterForm({ className }: { className?: string }) {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: (data: RegisterPayload) => register(data),
  });

  const form = useAppForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      address: "",
      rt: "",
      rw: "",
      zip_code: "",
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
          <form.AppField
            name="first_name"
            children={(field) => (
              <field.TextField
                label="First Name"
                placeholder="John"
                className="col-span-2"
              />
            )}
          />
          <form.AppField
            name="last_name"
            children={(field) => (
              <field.TextField
                label="Last Name"
                placeholder="Doe"
                className="col-span-2"
              />
            )}
          />
          <form.AppField
            name="address"
            children={(field) => (
              <field.TextareaField
                label="Address"
                placeholder="Ruko Srengseng Permai Village Jl. Srengseng Sawah No.2"
                className="col-span-4"
              />
            )}
          />

          <form.AppField
            name="rt"
            children={(field) => (
              <field.TextField label="RT" placeholder="12" />
            )}
          />

          <form.AppField
            name="rw"
            children={(field) => <field.TextField label="RW" placeholder="7" />}
          />

          <form.AppField
            name="zip_code"
            children={(field) => (
              <field.TextField
                label="Zip Code"
                placeholder="12640"
                className="col-span-2"
              />
            )}
          />

          <form.AppField
            name="email"
            children={(field) => (
              <field.TextField
                label="Email"
                placeholder="john@doe.com"
                className="col-span-4"
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
                placeholder="********"
                className="col-span-4"
                IconAddon={Lock}
              />
            )}
          />

          <form.SubmitButton label="Create an account" className="col-span-4" />
        </form>
      </FieldGroup>
    </form.AppForm>
  );
}
