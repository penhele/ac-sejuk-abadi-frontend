import z from "zod";

export const registerSchema = z.object({
  first_name: z.string().min(1, "*"),
  last_name: z.string().min(1, "*"),
  email: z.email(),
  password: z.string().min(8, "*"),
  address: z.string().min(8, "*"),
  rt: z.string().min(8, "*"),
  rw: z.string().min(8, "*"),
  zip_code: z.string().min(8, "*"),
});
