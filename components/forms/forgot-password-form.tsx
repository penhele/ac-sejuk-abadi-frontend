import Link from "next/link";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { ROUTES } from "@/contants/routes";

export default function ForgotPasswordForm() {
  return (
    <form action="">
      <div className="space-y-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="john@doe.com" required />
        </Field>

        <Field>
          <FieldLabel htmlFor="code">Verification Code</FieldLabel>
          <Input id="code" type="code" placeholder="" required />
        </Field>

        <div className="grid xs:grid-cols-2 gap-2">
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="" required />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
            <Input id="password" type="password" placeholder="" required />
          </Field>
        </div>

        <Field>
          <Button>Reset Password</Button>

          <Link href={ROUTES.LOGIN}>
            <Button variant={"outline"} className="w-full">
              Back to login
            </Button>
          </Link>
        </Field>
      </div>
    </form>
  );
}
