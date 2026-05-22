import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";
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

export default function DeleteButton<TId = string | number>({
  id,
  label = "Delete",
  mutationFn,
  queryKey,
  successMessage = "Berhasil menghapus data.",
  errorMessage = "Gagal menghapus data.",
}: {
  id: TId;
  label?: string;
  mutationFn: (id: TId) => Promise<unknown>;
  queryKey: readonly unknown[];
  successMessage?: string;
  errorMessage?: string;
}) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn,
    onMutate() {
      const toastId = toast.loading("Loading...");
      return { toastId };
    },
    onSuccess(_, __, context) {
      queryClient.invalidateQueries({
        queryKey,
      });

      toast.success(successMessage, {
        id: context?.toastId,
      });
    },
    onError(_, __, context) {
      toast.error(errorMessage, {
        id: context?.toastId,
      });
    },
  });

  return (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <AlertDialog>
        <AlertDialogTrigger className="w-full flex items-center justify-between">
          Delete
          <DropdownMenuShortcut>
            <Trash size={12} />
          </DropdownMenuShortcut>
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
            <AlertDialogAction onClick={() => mutate(id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenuItem>
  );
}
