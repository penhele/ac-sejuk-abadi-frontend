"use client";

import { cn } from "@/lib/utils";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

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

        goeyToast.info("Batal diperbarui");
      }}
      disabled={isDisabled}
      className={cn("w-full", className)}
    >
      Cancel
    </Button>
  );
}
