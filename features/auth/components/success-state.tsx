import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function SuccessState({ countdown }: { countdown: number }) {
  return (
    <div className="w-full space-y-4 flex flex-col items-center">
      <DotLottieReact
        src="https://lottie.host/542a3efb-8211-4df8-bd3d-af84099eb8b0/b8o69YZA3c.lottie"
        loop
        autoplay
      />
      <div className="space-y-2 flex flex-col items-center text-center">
        <h1 className="text-xl font-bold">Verifikasi Berhasil!</h1>
        <span>
          Email Anda telah berhasil diverifikasi. Anda akan dialihkan ke halaman
          login secara otomatis dalam {countdown} detik.
        </span>
      </div>
    </div>
  );
}
