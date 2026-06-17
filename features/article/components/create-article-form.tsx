"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addArticle } from "../api/add-article";
import ArticleForm from "./article-forn";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { articleKeys } from "../queries/article-keys";

export default function CreateArticleForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: addArticle,
    onMutate(variables, context) {
      const toastId = toast.loading("Loading...");
      return { toastId };
    },
    onSuccess(data, variables, onMutateResult, context) {
      toast.success("Berhasil", { id: onMutateResult.toastId });

      queryClient.invalidateQueries({ queryKey: articleKeys.all });
      router.push(ROUTES.DASHBOARD_ARTICLE);
    },
    onError(error, variables, onMutateResult, context) {
      toast.error("Gagal", { id: onMutateResult?.toastId });
    },
  });

  return (
    <ArticleForm
      defaultValues={{
        name: "",
        description: "",
        category: "",
      }}
      onSubmit={async (value) => {
        await mutateAsync(value);
      }}
    />
  );
}
