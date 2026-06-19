"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import LoginForm from "./login-form";
import Link from "next/link";

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

      <Card className="absolute w-lg">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            Don't have an account?{" "}
            <Link
              href={ROUTES.REGISTER}
              className="underline text-primary font-semibold"
            >
              Create an account
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </AuroraBackground>
  );
}
