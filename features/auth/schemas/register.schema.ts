import z from "zod";

export const registerSchema = z.object({
  first_name: z.string().min(1, "Nama depan wajib diisi"),
  last_name: z.string().min(1, "Nama depan wajib diisi"),
  email: z.email(),
  password: z.string().min(8, "Password minimal 8 karakter"),
  // address: z.string(),
  // rt: z.string(),
  // rw: z.string(),
  // zip_code: z.string(),
});
