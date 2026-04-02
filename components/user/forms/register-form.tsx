"use client";

import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Mengambil key dari environment variable
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

type RegisterFormProps = {
  backendUrl: string;
};

export default function RegisterForm({ backendUrl }: RegisterFormProps) {
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

  // Load reCAPTCHA script dengan cara yang lebih robust
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || RECAPTCHA_SITE_KEY === "YOUR_RECAPTCHA_SITE_KEY") {
      console.error("reCAPTCHA Site Key is missing or invalid!");
      return;
    }

    const scriptId = "recaptcha-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setRecaptchaReady(true);
      document.body.appendChild(script);
    } else {
      setRecaptchaReady(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    if (error) setError(""); // Clear error saat user mengetik
  };

  const validate = () => {
    // Check empty fields
    const requiredFields = ['first_name', 'last_name', 'phone', 'email', 'address', 'password', 'password_conf'];
    for (const key of requiredFields) {
      if (!form[key as keyof typeof form].trim()) return `Field ${key.replace('_', ' ')} wajib diisi`;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Format email tidak valid";

    const phoneRegex = /^08[0-9]{8,11}$/;
    if (!phoneRegex.test(form.phone)) return "Nomor HP tidak valid (Gunakan format 08...)";

    if (form.password !== form.password_conf) return "Konfirmasi password tidak cocok";

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(form.password))
      return "Password minimal 8 karakter, kombinasi huruf besar, kecil, angka, dan simbol";

    if (!recaptchaReady || !(window as any).grecaptcha) return "Sistem keamanan reCAPTCHA belum siap. Tunggu sebentar.";

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
      const grecaptcha = (window as any).grecaptcha;
      
      // Tunggu hingga grecaptcha benar-benar siap
      await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));

      // Generate Token
      const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "register" });

      if (!token) throw new Error("Gagal mengambil token keamanan.");

      const res = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken: token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Pendaftaran gagal. Silakan coba lagi.");
      } else {
        // Simpan token/session jika perlu
        if (data.token) localStorage.setItem("token", data.token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Register Error:", err);
      setError("Terjadi kesalahan koneksi atau keamanan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="first_name">Nama Depan</FieldLabel>
          <Input id="first_name" placeholder="John" onChange={handleChange} disabled={loading} value={form.first_name} />
        </Field>
        <Field>
          <FieldLabel htmlFor="last_name">Nama Belakang</FieldLabel>
          <Input id="last_name" placeholder="Doe" onChange={handleChange} disabled={loading} value={form.last_name} />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="phone">Nomor Telpon</FieldLabel>
          <Input id="phone" placeholder="08123456789" onChange={handleChange} disabled={loading} value={form.phone} />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="john@doe.com" onChange={handleChange} disabled={loading} value={form.email} />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="address">Alamat Lengkap</FieldLabel>
        <Input id="address" placeholder="Nama Jalan, No. Rumah" onChange={handleChange} disabled={loading} value={form.address} />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field>
          <FieldLabel htmlFor="rt">RT</FieldLabel>
          <Input id="rt" placeholder="001" onChange={handleChange} disabled={loading} value={form.rt} />
        </Field>
        <Field>
          <FieldLabel htmlFor="rw">RW</FieldLabel>
          <Input id="rw" placeholder="002" onChange={handleChange} disabled={loading} value={form.rw} />
        </Field>
        <Field>
          <FieldLabel htmlFor="zip_code">Kode Pos</FieldLabel>
          <Input id="zip_code" placeholder="12640" onChange={handleChange} disabled={loading} value={form.zip_code} />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" onChange={handleChange} disabled={loading} value={form.password} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password_conf">Konfirmasi Password</FieldLabel>
          <Input id="password_conf" type="password" onChange={handleChange} disabled={loading} value={form.password_conf} />
        </Field>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm font-medium animate-in fade-in zoom-in duration-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <Button className="w-full h-12 text-base font-semibold transition-all active:scale-[0.98]" type="submit" disabled={loading || !recaptchaReady}>
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
            Memproses...
          </>
        ) : (
          "Daftar Sekarang"
        )}
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