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
import RegisterForm from "./register-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
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

      <Card className="absolute w-lg ">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="underline text-primary font-semibold"
            >
              Sign In
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </AuroraBackground>
  );
}
