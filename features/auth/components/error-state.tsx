import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ErrorState() {
  return (
    <div className="w-full space-y-4 flex flex-col items-center">
      <DotLottieReact
        src="https://lottie.host/a603b8f9-1eed-49bf-87fd-d061cf1a7cc0/DDuSdFaSPx.lottie"
        loop
        autoplay
      />
      <div className="space-y-2 flex flex-col items-center text-center">
        <h1 className="text-xl font-bold">Verifikasi Gagal</h1>
        <span>
          Token verifikasi tidak valid atau telah kedaluwarsa. Silakan coba lagi
          atau kirim ulang email verifikasi.
        </span>
      </div>

      <Button variant={"link"}>Resend</Button>
    </div>
  );
}
