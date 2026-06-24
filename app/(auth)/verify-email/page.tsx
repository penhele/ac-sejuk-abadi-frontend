import VerifyEmailPage from "@/features/auth/components/verify-email-page";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <VerifyEmailPage />
    </Suspense>
  );
}
