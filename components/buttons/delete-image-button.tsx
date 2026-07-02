import { cn } from "@/lib/utils";
import { AppError } from "@/types/error";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { X } from "lucide-react";
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

interface DeleteButtonProps {
  className?: string;
  mutationFn: () => Promise<unknown>;
  queryKey: QueryKey;

  title?: string;
  description?: string;

  successMessage?: string;
  errorMessage?: string;
}

export default function DeleteImageButton({
  className,
  mutationFn,
  queryKey,
}: DeleteButtonProps) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn,
  });

  const handleDelete = () => {
    goeyToast.promise(mutateAsync(), {
      loading: "Loading",
      success: () => {
        queryClient.invalidateQueries({
          queryKey,
        });

        return "Berhasil";
      },
      error: (err) => (err as AppError).message,
    });
  };

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
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
