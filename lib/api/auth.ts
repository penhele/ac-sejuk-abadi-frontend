// lib/auth.ts

export async function login(data: {
  email: string;
  password: string;
  captchaToken: string;
}) {
  console.log("Kirim ke backend:", data);

  // simulasi delay API
  await new Promise((res) => setTimeout(res, 1000));

  // mock login
  if (data.email === "admin@gmail.com" && data.password === "12345678") {
    return {
      token: "fake-jwt-token",
      user: {
        email: data.email,
      },
    };
  }

  throw new Error("Email atau password salah");
}