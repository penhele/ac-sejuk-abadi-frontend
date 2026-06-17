import z, { infer as zodInfer } from "zod";

export const createArticleSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
});

export type ArticleFormValues = zodInfer<typeof createArticleSchema>;
