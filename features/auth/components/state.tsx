import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function State() {
  return (
    <div className="w-full space-y-4 flex flex-col items-center">
      <DotLottieReact
        src="https://lottie.host/1d38bd20-d03c-4340-b6d2-23f3f7db12ae/tmYTb0mSxF.lottie"
        loop
        autoplay
      />

      <div className="space-y-2 flex flex-col items-center text-center">
        <h1 className="text-xl font-bold">Verifikasi Email Anda</h1>
        <span>
          Kami telah mengirimkan email verifikasi. Silakan periksa kotak masuk
          Anda dan klik tautan verifikasi.
        </span>
      </div>

      <Button variant={"link"}>Resend</Button>
    </div>
  );
}
