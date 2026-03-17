import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form action="">
      <div className="space-y-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="john@doe.com" required />
        </Field>

        <Field>
          <div className="flex flex-row justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <Link href={"/auth/forgot-password"}>
              <FieldLabel>Forgot Password?</FieldLabel>
            </Link>
          </div>
          <Input id="password" type="password" required />
        </Field>

        <Field>
          <Link href={"/"}>
            <Button className="w-full">Login</Button>
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
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="underline underline-offset-4"
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </div>
    </form>
  );
}
