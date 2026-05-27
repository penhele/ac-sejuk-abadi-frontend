import { array, object, string, infer as zodInfer } from "zod";

export const createProjectSchema = object({
  name: string().min(1, "Nama wajib diisi"),
  description: string().min(1, "Description wajib diisi"),
  date: string().min(1, "Date wajib diisi"),
  location: string().min(1, "Location wajib diisi"),
  category: string().min(1, "Category wajib diisi"),
  id_products: array(string()).min(1, "Product wajib dipilih"),
});

export type ProjectFormValues = zodInfer<typeof createProjectSchema>;
