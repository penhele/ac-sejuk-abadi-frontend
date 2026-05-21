import {
  infer as zodInfer,
  object,
  string,
  instanceof as zInstanceOf,
} from "zod";

export const createBrandSchema = object({
  name: string()
    .min(1, "Nama brand wajib diisi")
    .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh huruf"),
});

export const createBrandImageSchema = object({
  id_brand: string().min(1, "Wajib memilih brand"),

  image_file: zInstanceOf(File, {
    message: "Wajib memasukkan gambar",
  }),
});

export type BranFormValues = zodInfer<typeof createBrandSchema>;
export type BrandImageFormValues = zodInfer<typeof createBrandImageSchema>;
