"use client";

import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";

// 1. DEFINISIKAN TYPE PROPS (Agar TypeScript tidak marah)
interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  loading: boolean;
}

// 2. TANGKAP PROPS DI SINI
export default function LoginForm({ onSubmit, loading }: LoginFormProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi Input Dasar
    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi");
      return;
    }

    // 3. KIRIM DATA KE PARENT (LoginPage)
    onSubmit({ 
      email: email.trim(), 
      password: password.trim() 
    });
  };

  if (!isMounted) return null;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      {/* Email */}
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="admin@xyz.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          disabled={loading}
          required
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
          required
        />
      </Field>

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