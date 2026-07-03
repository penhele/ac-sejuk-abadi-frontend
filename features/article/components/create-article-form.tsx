"use client";

import { ROUTES } from "@/constants/routes";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import { addArticle } from "../api/add-article";
import { articleKeys } from "../queries/article-keys";
import ArticleForm from "./article-form";

export default function CreateArticleForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addArticle,
  });

  return (
    <ArticleForm
      defaultValues={{
        name: "",
        description: "",
        category: "",
      }}
      onSubmit={async (value) => {
        goeyToast.promise(mutateAsync(value), {
          loading: "Creating...",
          success: () => {
            queryClient.invalidateQueries({ queryKey: articleKeys.all });
            router.push(ROUTES.DASHBOARD_ARTICLE);

            return "Berhasil";
          },
          error: (err) => (err as AppError).message,
        });
      }}
      loading={isPending}
    />
  );
}
