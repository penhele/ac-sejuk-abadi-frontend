"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  route: string;
  className?: string;
}

export default function PushButton({ className, route }: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(route)}
      variant={"ghost"}
      size={"sm"}
      className={className}
    >
      <ArrowLeft /> Back
    </Button>
  );
}
