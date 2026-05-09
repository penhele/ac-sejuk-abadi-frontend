"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { login } from "@/services/auth.service";
import { Login } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldSeparator } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { loginSchema } from "@/schemas/auth.schema";
import { ROUTES } from "@/contants/routes";

export default function LoginForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: Login) => login(data),
    onSuccess: (res) => {
      const { access_token, user } = res;

      Cookies.set("access_token", access_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("user_role", user.role, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      queryClient.invalidateQueries({ queryKey: ["login"] });
      toast.success("Login berhasil");

      router.push("/");
      router.refresh();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Terjadi kesalahan saat login";
      toast.error(errorMessage);
    },
  });

  const { handleSubmit, AppField } = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
    validators: {
      onChange: loginSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="space-y-4">
        <AppField
          name="email"
          children={(field) => (
            <field.TextField label="Email" type="email" isDisable={isPending} />
          )}
        />

        <AppField
          name="password"
          children={(field) => (
            <field.TextField
              label="Password"
              type="password"
              isDisable={isPending}
            />
          )}
        />

        <Field>
          <Button className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : "Login"}
          </Button>
        </Field>

        <Field className="my-8">
          <FieldSeparator>Or continue with</FieldSeparator>
        </Field>

        <Field>
          <Button variant={"outline"}>
            <FaGoogle /> Login with Google
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href={ROUTES.REGISTER} className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </div>
    </form>
  );
}
