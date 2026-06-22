import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function LoadingState() {
  return (
    <div className="w-full space-y-4 flex flex-col items-center">
      <Spinner className="size-10" />

      <div className="space-y-2 flex flex-col items-center text-center">
        <h1 className="text-xl font-bold">Verifikasi Email Anda</h1>
        <span>
          Kami telah mengirimkan email verifikasi. Silakan periksa kotak masuk
          Anda dan klik tautan verifikasi.
        </span>
      </div>
    </div>
  );
}
