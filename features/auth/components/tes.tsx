"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../api/verify-email";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ROUTES } from "@/constants/routes";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (token: string) => verifyEmail(token),
  });

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token, mutate]);

  // Handle countdown and auto-redirect upon success
  useEffect(() => {
    if (!isSuccess) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(ROUTES.LOGIN);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSuccess, router]);

  return (
    <AuroraBackground className="relative flex items-center justify-center min-h-screen">
      <Card className="absolute w-full max-w-md mx-auto shadow-xl border border-border/40 backdrop-blur-sm bg-card/85">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
          {/* STATE 1: LOADING / VERIFYING */}
          {token && isPending && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Spinner className="size-10 text-primary" />
              <h1 className="text-xl font-bold tracking-tight">
                Memverifikasi Email
              </h1>
              <p className="text-sm text-muted-foreground">
                Mohon tunggu, kami sedang memverifikasi akun Anda...
              </p>
            </div>
          )}

          {/* STATE 2: SUCCESS */}
          {token && isSuccess && (
            <div className="flex flex-col items-center justify-center w-full space-y-4">
              <div className="w-48 h-48 flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/542a3efb-8211-4df8-bd3d-af84099eb8b0/b8o69YZA3c.lottie"
                  loop={false}
                  autoplay
                />
              </div>
              <h1 className="text-2xl font-bold text-green-600 dark:text-green-400 tracking-tight">
                Verifikasi Berhasil!
              </h1>
              <p className="text-sm text-muted-foreground px-4 leading-relaxed">
                Email Anda telah berhasil diverifikasi. Anda akan dialihkan ke
                halaman login secara otomatis dalam{" "}
                <span className="font-semibold text-foreground">
                  {countdown}
                </span>{" "}
                detik.
              </p>
              <Button
                className="w-full mt-2 cursor-pointer"
                onClick={() => router.push(ROUTES.LOGIN)}
              >
                Ke Halaman Login
              </Button>
            </div>
          )}

          {/* STATE 3: ERROR */}
          {token && isError && (
            <div className="flex flex-col items-center justify-center w-full space-y-4 py-4">
              <div className="w-16 h-16 text-destructive flex items-center justify-center bg-destructive/10 rounded-full mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-destructive tracking-tight">
                Verifikasi Gagal
              </h1>
              <p className="text-sm text-muted-foreground px-4">
                Token verifikasi tidak valid atau telah kedaluwarsa. Silakan
                coba lagi atau kirim ulang email verifikasi.
              </p>
              <div className="flex flex-col w-full gap-2 mt-2">
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => mutate(token)}
                >
                  Coba Lagi
                </Button>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={() => router.push(ROUTES.LOGIN)}
                >
                  Kembali ke Login
                </Button>
              </div>
            </div>
          )}

          {/* STATE 4: NO TOKEN / CHECK EMAIL */}
          {!token && !isPending && !isSuccess && !isError && (
            <div className="flex flex-col items-center justify-center w-full space-y-4">
              <div className="w-48 h-48 flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/1d38bd20-d03c-4340-b6d2-23f3f7db12ae/tmYTb0mSxF.lottie"
                  loop
                  autoplay
                />
              </div>
              <h1 className="text-xl font-bold tracking-tight">
                Verifikasi Email Anda
              </h1>
              <p className="text-sm text-muted-foreground px-4">
                Kami telah mengirimkan email verifikasi. Silakan periksa kotak
                masuk Anda dan klik tautan verifikasi.
              </p>
              <Button
                variant="link"
                className="mt-2 text-primary hover:underline cursor-pointer"
              >
                Resend Email
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AuroraBackground>
  );
}
