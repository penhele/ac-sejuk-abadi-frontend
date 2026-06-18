"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateArticle } from "../api/update-article";
import { useArticle } from "../hooks/use-article";
import { UpdateArticlePayload } from "../types/update-article-payload";
import ArticleForm from "./article-form";
import { articleKeys } from "../queries/article-keys";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

type Props = {
  id: string;
};

export default function UpdateArticleForm({ id }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateArticlePayload) => updateArticle(id, data),
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

  const { data: article } = useArticle(id);

  return (
    <ArticleForm
      defaultValues={{
        name: article?.name ?? "",
        description: article?.description ?? "",
        category: article?.category ?? "",
      }}
      onSubmit={async (value) => {
        await mutateAsync(value);
      }}
    />
  );
}
