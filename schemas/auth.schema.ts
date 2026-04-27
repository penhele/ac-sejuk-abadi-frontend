import z from "zod";

export const registerSchema = z.object({
  first_name: z.string().min(1, "Nama depan wajib diisi"),
  last_name: z.string().min(1, "Nama belakang wajib diisi"),
  email: z.email(),
  password: z.string().min(8, "Password minimal 8 karakter"),
  address: z.string().min(1, "Wajib diisi"),
  rt: z
    .string()
    .min(1, "RT wajib diisi")
    .regex(/^\d+$/, "RT harus berupa angka"),
  rw: z
    .string()
    .min(1, "RW wajib diisi")
    .regex(/^\d+$/, "RW harus berupa angka"),
  zip_code: z
    .string()
    .min(5, "Kode pos minimal 5 digit")
    .regex(/^\d+$/, "Kode pos harus berupa angka"),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password minimal 8 karakter"),
});
