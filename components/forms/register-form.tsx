"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { register } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldSeparator } from "../ui/field";
import { useRouter } from "next/navigation";
import { Register } from "@/types/auth";
import { Spinner } from "../ui/spinner";

export default function RegisterForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: Register) => register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      toast.success("Register berhasil");
      router.push("/login");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Terjadi kesalahan saat registrasi";
      toast.error(errorMessage);
    },
  });

  const { handleSubmit, AppField } = useAppForm({
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
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
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
        <div className="grid xs:grid-cols-2 gap-4">
          <AppField
            name="first_name"
            children={(field) => (
              <field.TextField label="Nama Depan" isDisable={isPending} />
            )}
          />
          <AppField
            name="last_name"
            children={(field) => (
              <field.TextField label="Nama Belakang" isDisable={isPending} />
            )}
          />
        </div>

        <AppField
          name="address"
          children={(field) => (
            <field.TextField label="Alamat" isDisable={isPending} />
          )}
        />

        <div className="grid xs:grid-cols-2 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <AppField
              name="rt"
              children={(field) => (
                <field.TextField
                  label="RT"
                  type="number"
                  isDisable={isPending}
                />
              )}
            />
            <AppField
              name="rw"
              children={(field) => (
                <field.TextField
                  label="RW"
                  type="number"
                  isDisable={isPending}
                />
              )}
            />
          </div>

          <AppField
            name="zip_code"
            children={(field) => (
              <field.TextField
                label="Kode Pos"
                type="number"
                isDisable={isPending}
              />
            )}
          />
        </div>

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
          <Button className="w-full">
            {isPending ? <Spinner /> : "Register"}
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
