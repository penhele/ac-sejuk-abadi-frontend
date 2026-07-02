"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  onCancel: () => void;
  onCloseEdit: () => void;
  className?: string;
  isDisabled?: boolean;
  href?: string;
}

export default function CancelButton({
  onCancel,
  onCloseEdit,
  className,
  isDisabled,
  href,
}: Props) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant={"outline"}
      onClick={() => {
        onCancel();
        onCloseEdit();
        router.back();

        toast.info("Batal diperbarui", { position: "top-center" });
      }}
      disabled={isDisabled}
      className={cn("w-full", className)}
    >
      Cancel
    </Button>
  );
}
