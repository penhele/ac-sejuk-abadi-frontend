import { z, infer as zodInfer } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Nama category wajib diisi")
    .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh huruf"),
});

export type CategoryFormValues = zodInfer<typeof createCategorySchema>;
