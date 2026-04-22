"use client";

import { api } from "@/lib/axios";
import { Login } from "@/lib/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { InputTextController } from "../inputs/input-text-controller";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldSeparator } from "../ui/field";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<Login>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: Login) => {
    startTransition(async () => {
      try {
        const res = await api.post("/auth/login", data);

        console.log("Response:", res.data);

        localStorage.setItem("access_token", res.data.access_token);

        toast("Login Berhasil");
        router.push("/");
        router.refresh();
      } catch (err: any) {
        toast(err.response?.data?.message || "Terjadi kesalahan");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <InputTextController
          label="Email"
          name="email"
          placeholder="john@doe.com"
          control={form.control}
        />

        <InputTextController
          label="Password"
          name="password"
          isPassword
          placeholder="********"
          control={form.control}
        />

        <Field>
          <Button className="w-full">Login</Button>
        </Field>

        <Field className="my-8">
          <FieldSeparator>Or continue with</FieldSeparator>
        </Field>

        <Field>
          <Button variant={"outline"}>
            <FaGoogle /> Login with Google
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account?
            <Link href="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </div>
    </form>
  );
}
