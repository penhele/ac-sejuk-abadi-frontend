"use client";

import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  routes: string;
};

export default function EditButtonHref({ routes }: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(routes)}
      variant={"outline"}
      size={"icon-xs"}
    >
      <Pencil />
    </Button>
  );
}
