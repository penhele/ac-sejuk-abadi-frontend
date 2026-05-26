import { object, string, infer as zodInfer } from "zod";

export const createProjectSchema = object({
  id_product: string().min(1, "ID Product wajib diisi"),
  name: string().min(1, "Nama wajib diisi"),
  description: string().min(1, "Description wajib diisi"),
  date: string().min(1, "Date wajib diisi"),
  location: string().min(1, "Location wajib diisi"),
  category: string().min(1, "Category wajib diisi"),
});

export type ProjectFormValues = zodInfer<typeof createProjectSchema>;
