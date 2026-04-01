import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter"),
  // Token ini didapat dari widget Google reCAPTCHA
  captchaToken: z
    .string()
    .min(1, "Silakan selesaikan verifikasi Captcha"),
});

export type LoginInput = z.infer<typeof loginSchema>;