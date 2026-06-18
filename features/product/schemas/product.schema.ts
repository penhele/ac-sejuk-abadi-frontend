import z, { number, object, string, infer as zodInfer } from "zod";

export const createProductSchema = object({
  name: string().min(1, "Nama produk wajib diisi"),
  description: string().optional(),
  id_brand: string().min(1, "Brand wajib dipilih"),
  id_category: string().optional(),
  id_ac_type: string().optional(),
  pk: string().optional(),
  freon_type: string().optional(),
  model_code: string().optional(),
  series_name: string().optional(),
  price: string().min(1, "Harga wajib diisi"),
  quantity: string().min(1, "Stok wajib diisi"),
});

export type ProductFormValues = zodInfer<typeof createProductSchema>;

const MAX_FILE_SIZE = 1024 * 1024; // 1MB dalam bytes

export const uploadProductImageSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .refine((files) => files.every((file) => file.size < MAX_FILE_SIZE), {
      message: "Ukuran setiap gambar harus kurang dari 1MB",
    }),
});
