import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CancelButton({
  onCancel,
  onCloseEdit,
  className,
  isDisabled,
  href,
}: {
  onCancel: () => void;
  onCloseEdit: () => void;
  className?: string;
  isDisabled?: boolean;
  href?: string;
}) {
  return (
    <Link href={href || ""} className={cn("w-full", className)}>
      <Button
        type="button"
        variant={"outline"}
        onClick={() => {
          onCancel();
          onCloseEdit();

          toast.info("Batal diperbarui", { position: "top-center" });
        }}
        disabled={isDisabled}
        className="w-full"
      >
        Cancel
      </Button>
    </Link>
  );
}
