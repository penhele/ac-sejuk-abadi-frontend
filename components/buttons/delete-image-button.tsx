import { X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage } from "@/services/product.service";
import { toast } from "sonner";
import { getProductByIdQueryOptions } from "@/hooks/queries/product-queries";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { id } from "date-fns/locale";

export default function DeleteImageButton({
  className,
  idProduct,
  idImage,
}: {
  className?: string;
  idProduct: string | number;
  idImage: string | number;
}) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteImage(idProduct, idImage),
    onMutate() {
      const toastId = toast.loading("Loading...");
      return { toastId };
    },
    onSuccess(_, __, context) {
      toast.success("Berhasil menghapus gambar", { id: context.toastId });

      queryClient.invalidateQueries(
        getProductByIdQueryOptions(idProduct.toString()),
      );
    },
    onError(_, __, context) {
      toast.error("Gagal menghapus error", { id: context?.toastId });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(className, "rounded-full")}
          size={"icon-xs"}
          variant={"outline"}
        >
          <X />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
