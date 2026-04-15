"use client";

import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const API_URL = '/api-backend/api'; 

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    rt: "",
    rw: "",
    zip_code: "",
    password: "",
    password_conf: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || RECAPTCHA_SITE_KEY === "YOUR_RECAPTCHA_SITE_KEY") {
      setRecaptchaReady(true); 
      return;
    }

    const scriptId = "recaptcha-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.onload = () => setRecaptchaReady(true);
      script.onerror = () => setRecaptchaReady(true);
      document.body.appendChild(script);
    } else {
      setRecaptchaReady(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    if (error) setError(""); 
  };

  const validate = () => {
    const requiredFields = ['first_name', 'last_name', 'phone', 'email', 'address', 'password'];
    for (const key of requiredFields) {
      if (!form[key as keyof typeof form].trim()) {
        return `Ups! ${key.replace('_', ' ')} wajib diisi.`;
      }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      return "Format email salah! Gunakan format yang benar (contoh: nama@email.com).";
    }

    if (form.password.length < 8) return "Password minimal 8 karakter ya.";
    if (form.password !== form.password_conf) return "Konfirmasi password tidak cocok.";

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError("");
    setLoading(true);

    try {
      let token = "";
      if (RECAPTCHA_SITE_KEY && (window as any).grecaptcha) {
        const grecaptcha = (window as any).grecaptcha;
        await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));
        token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "register" });
      }

      const { password_conf, ...payload } = form;

      await axios.post(`${API_URL}/auth/register`, {
        ...payload,
        captchaToken: token || "dummy_token"
      });

      router.push("/user/login");
      
    } catch (err: any) {
      const msg = err.response?.data?.message || "Gagal mendaftar. Email mungkin sudah digunakan.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="first_name">Nama Depan</FieldLabel>
          <Input id="first_name" placeholder="John" onChange={handleChange} value={form.first_name} disabled={loading} />
        </Field>
        <Field>
          <FieldLabel htmlFor="last_name">Nama Belakang</FieldLabel>
          <Input id="last_name" placeholder="Doe" onChange={handleChange} value={form.last_name} disabled={loading} />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="phone">Nomor Telpon</FieldLabel>
          <Input id="phone" placeholder="08123456789" onChange={handleChange} value={form.phone} disabled={loading} />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input 
            id="email" 
            type="email" 
            placeholder="nama@email.com" 
            onChange={handleChange} 
            value={form.email}
            disabled={loading}
            className={error.toLowerCase().includes("email") ? "border-red-500 ring-1 ring-red-500" : ""}
          />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="address">Alamat Lengkap</FieldLabel>
        <Input id="address" placeholder="Nama Jalan, No. Rumah" onChange={handleChange} value={form.address} disabled={loading} />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field>
          <FieldLabel htmlFor="rt">RT</FieldLabel>
          <Input id="rt" placeholder="001" onChange={handleChange} value={form.rt} disabled={loading} />
        </Field>
        <Field>
          <FieldLabel htmlFor="rw">RW</FieldLabel>
          <Input id="rw" placeholder="002" onChange={handleChange} value={form.rw} disabled={loading} />
        </Field>
        <Field>
          <FieldLabel htmlFor="zip_code">Kode Pos</FieldLabel>
          <Input id="zip_code" placeholder="12640" onChange={handleChange} value={form.zip_code} disabled={loading} />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" onChange={handleChange} value={form.password} disabled={loading} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password_conf">Konfirmasi Password</FieldLabel>
          <Input id="password_conf" type="password" onChange={handleChange} value={form.password_conf} disabled={loading} />
        </Field>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm animate-bounce font-bold">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <Button 
        className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90" 
        type="submit" 
        disabled={loading || !recaptchaReady}
      >
        {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : "Daftar Sekarang"}
      </Button>

      <div className="relative py-2">
        <FieldSeparator>Atau</FieldSeparator>
      </div>

      <Button variant="outline" type="button" className="w-full h-12" disabled={loading}>
        <FaGoogle className="mr-2 text-red-500" /> Lanjutkan dengan Google
      </Button>

      <p className="text-center text-sm text-muted-foreground pt-4">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-blue-600 font-bold hover:underline">
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}