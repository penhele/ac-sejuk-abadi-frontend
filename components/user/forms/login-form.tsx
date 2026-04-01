"use client";

import { useState, useEffect, useRef } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

// ✅ Tambahin props
type LoginFormProps = {
  onSubmit: (data: {
    email: string;
    password: string;
    captchaToken: string;
  }) => void;
  loading?: boolean;
};

export default function LoginForm({ onSubmit, loading }: LoginFormProps) {
    
  const [isMounted, setIsMounted] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);

  // ✅ state form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ simpan captcha
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token || "");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email || !password) {
  alert("Email dan password wajib diisi");
  return;
}

if (!captchaToken) {
  alert("Silakan selesaikan captcha");
  return;
}
        onSubmit({ email, password, captchaToken });
      }}
    >
      <div className="space-y-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="john@doe.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>

        <Field>
          <div className="flex flex-row justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link href={"/forgot-password"}>
              <span className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Forgot Password?
              </span>
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        {/* CAPTCHA */}
        <div className="flex justify-center py-2">
          {isMounted ? (
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                "MASUKKAN_SITE_KEY_ANDA"
              }
              onChange={handleCaptchaChange}
            />
          ) : (
            <div className="h-19.5 w-full bg-muted animate-pulse rounded-md flex items-center justify-center text-xs text-muted-foreground">
              Loading Security...
            </div>
          )}
        </div>

        <Field>
          <Button className="w-full" type="submit" disabled={loading}>
  {loading ? "Loading..." : "Login"}
</Button>
        </Field>

        <Field className="my-8">
          <FieldSeparator>Or continue with</FieldSeparator>
        </Field>

        <Field>
          <Button variant={"outline"} className="w-full" type="button">
            <FaGoogle /> Login with Google
          </Button>

          <FieldDescription className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 font-medium hover:text-primary"
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </div>
    </form>
  );
}