"use client";

import { api } from "@/lib/axios";
import { Register } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { InputTextController } from "../inputs/input-text-controller";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldSeparator } from "../ui/field";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<Register>({
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
  });

  const onSubmit = (data: Register) => {
    startTransition(async () => {
      try {
        const res = await api.post("/auth/register", data);

        toast("Register Berhasil");
        router.push("/login");
      } catch (err: any) {
        toast(err.response?.data?.message || "Terjadi kesalahan");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="grid xs:grid-cols-2 gap-4">
          <InputTextController
            label="Nama Depan"
            name="first_name"
            control={form.control}
            placeholder="Stephen"
          />
          <InputTextController
            label="Nama Belakang"
            name="last_name"
            control={form.control}
            placeholder="Helenus"
          />
        </div>

        <InputTextController
          label="Alamat"
          name="address"
          control={form.control}
          placeholder="Jl. Srengseng Sawah No.2"
        />

        <div className="grid xs:grid-cols-2 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <InputTextController
              label="RT"
              name="rt"
              control={form.control}
              placeholder="001"
            />
            <InputTextController
              label="RW"
              name="rw"
              control={form.control}
              placeholder="008"
            />
          </div>

          <InputTextController
            label="Kode Pos"
            name="zip_code"
            control={form.control}
            placeholder="123456"
          />
        </div>

        <InputTextController
          label="Email"
          name="email"
          control={form.control}
          placeholder="john"
        />

        <InputTextController
          label="Password"
          name="password"
          control={form.control}
          placeholder="********"
          isPassword
        />

        <Field>
          <Button className="w-full">Register</Button>
        </Field>

        <Field className="my-8">
          <FieldSeparator>Or continue with</FieldSeparator>
        </Field>

        <Field>
          <Button variant={"outline"}>
            <FaGoogle /> Login with Google
          </Button>

          <FieldDescription className="text-center">
            Have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </div>
    </form>
  );
}
