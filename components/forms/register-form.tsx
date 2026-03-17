import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import Link from "next/link";
import { Textarea } from "../ui/textarea";

export default function RegisterForm() {
  return (
    <form action="">
      <div className="space-y-4">
        <div className="grid xs:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="first_name">Nama Depan</FieldLabel>
            <Input id="first_name" placeholder="John" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="last_name">Nama Belakang</FieldLabel>
            <Input id="last_name" placeholder="Doe" required />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="phone">Nomor Telpon</FieldLabel>
          <Input id="phone" required />
        </Field>

        <Field>
          <FieldLabel htmlFor="address">Alamat</FieldLabel>
          <Input
            id="address"
            placeholder="Jl. Srengseng Sawah No.2"
            className="hidden xs:block"
            required
          />
          <Textarea
            id="address"
            placeholder="Jl. Srengseng Sawah No.2"
            className="block xs:hidden"
            required
          />
        </Field>

        <div className="grid xs:grid-cols-2 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Field>
              <FieldLabel htmlFor="rt">RT</FieldLabel>
              <Input id="rt" required placeholder="12" type="number" />
            </Field>
            <Field>
              <FieldLabel htmlFor="rw">RW</FieldLabel>
              <Input id="rw" required placeholder="7" type="number" />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="zip_code">Kode Pos</FieldLabel>
            <Input id="zip_code" required placeholder="12640" type="number" />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="john@doe.com" required />
        </Field>

        <div className="grid xs:grid-cols-2 gap-2">
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Konfirmasi Password</FieldLabel>
            <Input id="password" type="password" required />
          </Field>
        </div>

        <Field>
          <Link href={"/auth/login"}>
            <Button className="w-full">Register</Button>
          </Link>
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
            <Link href="/auth/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </div>
    </form>
  );
}
