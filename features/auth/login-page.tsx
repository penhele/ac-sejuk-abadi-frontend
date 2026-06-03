"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./components/login-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
  const router = useRouter();

  return (
    <AuroraBackground className="relative">
      <Button
        variant={"ghost"}
        onClick={() => router.push(ROUTES.HOME)}
        className="absolute top-8 left-8"
      >
        <ArrowLeft />
        Back
      </Button>

      <Card className="absolute w-md ">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </AuroraBackground>
  );
}
