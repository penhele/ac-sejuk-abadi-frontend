import { object, string, infer as zodInfer } from "zod";

export const createProductSchema = object({
  name: string()
    .min(1, "Nama produk wajib diisi")
    .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh huruf"),
  description: string().min(1, "Deskripsi wajib diisi"),
  id_brand: string().min(1, "Brand wajib dipilih"),
  id_category: string().min(1, "Kategori wajib dipilih"),
  id_ac_type: string().min(1, "Tipe AC wajib dipilih"),
  pk: string().min(1, "PK wajib dipilih"),
  price: string().min(1, "Harga wajib diisi"),
  quantity: string().min(1, "Stok wajib diisi"),
});

export type ProductFormValues = zodInfer<typeof createProductSchema>;
