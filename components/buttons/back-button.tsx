"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export default function BackButton({ className }: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant={"ghost"}
      size={"sm"}
      className={className}
    >
      <ArrowLeft /> Back
    </Button>
  );
}
