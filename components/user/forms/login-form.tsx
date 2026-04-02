"use client";

import { useState, useEffect, useRef } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

type LoginFormProps = {
  onSubmit: (data: { email: string; password: string; captchaToken: string }) => void;
  loading?: boolean;
};

export default function LoginForm({ onSubmit, loading = false }: LoginFormProps) {
  const [isMounted, setIsMounted] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token || "");
    if (token) setError(""); // clear error jika captcha diisi
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi frontend
    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi");
      return;
    }

    if (!captchaToken) {
      setError("Silakan centang Captcha untuk keamanan");
      return;
    }

    // Panggil parent untuk kirim API
    onSubmit({ email: email.trim(), password: password.trim(), captchaToken });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      {/* Email */}
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="john@doe.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          disabled={loading}
        />
      </Field>

      {/* Password */}
      <Field>
        <div className="flex justify-between items-center">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Link href="/forgot-password">
            <span className="text-xs text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </span>
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          disabled={loading}
        />
      </Field>

      {/* Captcha */}
      <div className="flex justify-center py-2">
        {isMounted ? (
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "MASUKKAN_SITE_KEY_ANDA"}
            onChange={handleCaptchaChange}
            theme="light"
          />
        ) : (
          <div className="h-20 w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-xs text-slate-400">
            Loading Security...
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-medium">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button className="w-full h-11" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Login"
        )}
      </Button>

      <Field className="py-2">
        <FieldSeparator>Or continue with</FieldSeparator>
      </Field>

      {/* Google Login */}
      <Button variant="outline" className="w-full h-11" type="button" disabled={loading}>
        <FaGoogle className="mr-2 text-red-500" /> Login with Google
      </Button>

      {/* Link to Register */}
      <FieldDescription className="text-center mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-600 font-bold hover:underline">
          Sign up
        </Link>
      </FieldDescription>
    </form>
  );
}