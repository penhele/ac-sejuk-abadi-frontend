import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function VerifyEmailPage() {
  return (
    <AuroraBackground className="relative">
      <Card className="absolute w-lg">
        {/* <DotLottieReact
          src="https://lottie.host/542a3efb-8211-4df8-bd3d-af84099eb8b0/b8o69YZA3c.lottie"
          loop
          autoplay
        /> */}

        <CardContent className="flex flex-col space-y-2 items-start">
          <DotLottieReact
            src="https://lottie.host/1d38bd20-d03c-4340-b6d2-23f3f7db12ae/tmYTb0mSxF.lottie"
            loop
            autoplay
          />

          <h1 className="text-xl font-bold">Verifikasi Email Anda</h1>
          <span>Kami telah mengirimkan email ke ...</span>
          <Button variant={"link"}>Resend</Button>
        </CardContent>
      </Card>
    </AuroraBackground>
  );
}
