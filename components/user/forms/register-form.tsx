"use client";

import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type RegisterFormProps = {
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export default function RegisterForm({ onSubmit, loading }: RegisterFormProps) {
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
  const [captcha, setCaptcha] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

const validate = () => {
  const trimmed = {
    first_name: form.first_name.trim(),
    last_name: form.last_name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    address: form.address.trim(),
    password: form.password,
    password_conf: form.password_conf,
  };

  // REQUIRED
  for (const key in trimmed) {
    if (!trimmed[key as keyof typeof trimmed]) {
      return "Semua field wajib diisi";
    }
  }

  // EMAIL
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed.email)) {
    return "Format email tidak valid";
  }

  // PHONE
  const phoneRegex = /^08[0-9]{8,11}$/;
  if (!phoneRegex.test(trimmed.phone)) {
    return "Nomor HP tidak valid";
  }

  // PASSWORD MATCH
if (trimmed.password !== trimmed.password_conf) {
  return "Password tidak sama";
}

// PASSWORD STRENGTH
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!passwordRegex.test(trimmed.password)) {
  return "Password harus minimal 8 karakter, ada huruf besar, kecil, angka, dan simbol";
}

  // CAPTCHA
  if (!captcha) {
    return "Harap centang captcha";
  }

  return "";
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-3">
        
        {/* Nama Depan & Belakang */}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="first_name">Nama Depan</FieldLabel>
            <Input id="first_name" placeholder="John" onChange={handleChange} required disabled={loading} />
          </Field>
          <Field>
            <FieldLabel htmlFor="last_name">Nama Belakang</FieldLabel>
            <Input id="last_name" placeholder="Doe" onChange={handleChange} required disabled={loading} />
          </Field>
        </div>

        {/* Kontak & Email */}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="phone">Nomor Telpon</FieldLabel>
            <Input id="phone" placeholder="0812..." onChange={handleChange} required disabled={loading} />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="john@doe.com" onChange={handleChange} required disabled={loading} />
          </Field>
        </div>

        {/* Alamat Utama */}
        <Field>
          <FieldLabel htmlFor="address">Alamat</FieldLabel>
          <Input id="address" placeholder="Nama Jalan, No. Rumah" onChange={handleChange} required disabled={loading} />
        </Field>

        {/* RT, RW, Kode Pos (Dibuat 3 Kolom agar Hemat Tempat) */}
        <div className="grid grid-cols-3 gap-3">
          <Field>
            <FieldLabel htmlFor="rt">RT</FieldLabel>
            <Input id="rt" placeholder="00" onChange={handleChange} required disabled={loading} />
          </Field>
          <Field>
            <FieldLabel htmlFor="rw">RW</FieldLabel>
            <Input id="rw" placeholder="00" onChange={handleChange} required disabled={loading} />
          </Field>
          <Field>
            <FieldLabel htmlFor="zip_code">Kode Pos</FieldLabel>
            <Input id="zip_code" placeholder="12640" onChange={handleChange} required disabled={loading} />
          </Field>
        </div>

        {/* Password & Konfirmasi */}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" onChange={handleChange} required disabled={loading} />
          </Field>
          <p className="text-xs text-muted-foreground">
  Minimal 8 karakter, kombinasi huruf besar, kecil, angka, dan simbol
</p>
          <Field>
            <FieldLabel htmlFor="password_conf">Konfirmasi</FieldLabel>
            <Input id="password_conf" type="password" onChange={handleChange} required disabled={loading} />
          </Field>
          
        </div>

        {/* CAPTCHA Sederhana */}
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-md border border-slate-200">
          <input
            type="checkbox"
            id="captcha"
            className="w-4 h-4 accent-primary"
            onChange={(e) => setCaptcha(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="captcha" className="text-xs font-medium text-slate-600">
            Saya menyatakan data yang diisi adalah benar
          </label>
        </div>

        {/* Pesan Error */}
        {error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Tombol Submit */}
        <Button className="w-full h-11" type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
          {loading ? "Mendaftarkan..." : "Create Account"}
        </Button>

        <div className="relative py-2">
          <FieldSeparator>Or</FieldSeparator>
        </div>

        <Button variant="outline" type="button" className="w-full" disabled={loading}>
          <FaGoogle className="mr-2" /> Continue with Google
        </Button>

        <p className="text-center text-xs text-slate-500 pt-2">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </form>
  );
}