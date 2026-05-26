import { object, string } from "zod";

export const createCategorySchema = object({
  name: string().min(1, "Nama wajib diisi"),
});
