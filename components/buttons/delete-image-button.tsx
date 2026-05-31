import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { toast } from "sonner";
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
import { Button } from "../ui/button";
import { deleteProductImage } from "@/features/product/api/delete-product-image";
import { productKeys } from "@/features/product/queries/product-keys";


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
    mutationFn: () => deleteProductImage(idProduct, idImage),
    onMutate() {
      const toastId = toast.loading("Loading...");
      return { toastId };
    },
    onSuccess(_, __, context) {
      toast.success("Berhasil menghapus gambar", { id: context.toastId });

      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
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
