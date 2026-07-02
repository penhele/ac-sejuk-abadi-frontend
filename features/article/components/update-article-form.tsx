"use client";

import { ROUTES } from "@/constants/routes";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import { updateArticle } from "../api/update-article";
import { useArticle } from "../hooks/use-article";
import { articleKeys } from "../queries/article-keys";
import { UpdateArticlePayload } from "../types/update-article-payload";
import ArticleForm from "./article-form";

interface Props {
  id: string;
}

export default function UpdateArticleForm({ id }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateArticlePayload) => updateArticle(id, data),
  });

  const { data: article, isFetching } = useArticle(id);

  return (
    <ArticleForm
      defaultValues={{
        name: article?.name ?? "",
        description: article?.description ?? "",
        category: article?.category ?? "",
      }}
      onSubmit={async (value) => {
        goeyToast.promise(mutateAsync(value), {
          loading: "Updating...",
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
