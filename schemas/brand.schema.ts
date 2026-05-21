import { object, string, infer as zodInfer } from "zod";

export const createBrandSchema = object({
  name: string()
    .min(1, "Nama brand wajib diisi")
    .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh huruf"),
});

export type BranFormValues = zodInfer<typeof createBrandSchema>;
