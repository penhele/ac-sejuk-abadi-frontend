import { z, infer as zodInfer } from "zod";

export const createAcTypeSchema = z.object({
  name: z
    .string()
    .min(1, "Nama AC type wajib diisi")
    .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh huruf"),
});

export type AcTypeFormValues = zodInfer<typeof createAcTypeSchema>;
