"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {}

export default function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant={"ghost"} size={"sm"}>
      <ArrowLeft /> Back
    </Button>
  );
}
