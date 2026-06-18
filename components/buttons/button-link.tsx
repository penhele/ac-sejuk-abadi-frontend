"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ImagePlus } from "lucide-react";

type Props = {
  routes: string;
};

export default function ButtonLink({ routes }: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(routes)}
      variant={"outline"}
      size={"icon-xs"}
    >
      <ImagePlus />
    </Button>
  );
}
