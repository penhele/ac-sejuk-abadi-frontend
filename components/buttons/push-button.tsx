"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  route: string;
  className?: string;
  label?: string;
}

export default function PushButton({
  className,
  route,
  label = "Back",
}: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(route)}
      variant={"ghost"}
      size={"sm"}
      className={className}
    >
      <ArrowLeft /> {label}
    </Button>
  );
}
