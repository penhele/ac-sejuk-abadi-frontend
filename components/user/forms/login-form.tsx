"use client";

import { useState, useEffect, Suspense } from "react"; // Tambah Suspense
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"; // Tambah CheckCircle2
import { useSearchParams } from "next/navigation"; // Tambah ini

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  loading: boolean;
}

// Pisahkan isi form ke komponen internal agar bisa menggunakan useSearchParams di dalam Suspense
function LoginFormContent({ onSubmit, loading }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const searchParams = useSearchParams();
  const isRegisterSuccess = searchParams.get("status") === "success";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi");
      return;
    }

    onSubmit({ 
      email: email.trim(), 
      password: password.trim() 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      
      {/* NOTIFIKASI SUKSES REGISTRASI */}
      {isRegisterSuccess && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-bold animate-bounce">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Registrasi berhasil! Silakan masuk ke akun Anda.
        </div>
      )}

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
          className={error ? "border-red-500" : ""}
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
          className={error ? "border-red-500" : ""}
        />
      </Field>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-medium">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button 
        className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold" 
        type="submit" 
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Login Sekarang"
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

// Komponen Utama yang diekspor
export default function LoginForm(props: LoginFormProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Suspense fallback={<div className="text-center p-4"><Loader2 className="animate-spin mx-auto" /></div>}>
      <LoginFormContent {...props} />
    </Suspense>
  );
}