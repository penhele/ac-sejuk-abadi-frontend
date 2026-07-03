import z from "zod";

export const userSchema = z.object({
  first_name: z.string().min(1, "Nama depan wajib diisi"),
  last_name: z.string().min(1, "Nama depan wajib diisi"),
  email: z.email(),
  address: z.string().min(1, "Alamat wajib diisi"),
  rt: z.string().min(1, "RT wajib diisi"),
  rw: z.string().min(1, "RW wajib diisi"),
  zip_code: z.string().min(1, "Kode Pos wajib diisi"),
  role: z.string().min(1, "Kode Pos wajib diisi"),
});
