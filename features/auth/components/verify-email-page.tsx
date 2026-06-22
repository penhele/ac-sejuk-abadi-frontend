"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyEmail } from "../api/verify-email";
import ErrorState from "./error-state";
import LoadingState from "./loading-state";
import State from "./state";
import SuccessState from "./success-state";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (token: string) => verifyEmail(token),
  });

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) return mutate(token);
  }, [token, mutate]);

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
    <AuroraBackground className="relative">
      <Card className="absolute w-lg">
        <CardContent className="flex flex-col space-y-2 items-start">
          {/* Current */}
          {!token && !isPending && !isSuccess && !isError && <State />}

          {/* Loading State */}
          {token && isPending && <LoadingState />}

          {/* Success State */}
          {token && isSuccess && <SuccessState countdown={countdown} />}

          {/* Error State */}
          {token && isError && <ErrorState />}
        </CardContent>
      </Card>
    </AuroraBackground>
  );
}
