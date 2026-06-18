"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadArticleImagePayload } from "../types/upload-article-image-payload";
import { uploadArticleImage } from "../api/upload-article-image";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { articleKeys } from "../queries/article-keys";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { title } from "process";
import ArticleContent from "./article-content";
import { Separator } from "@/components/ui/separator";
import { useArticle } from "../hooks/use-article";

export default function UploadArticleImagesForm({
  id,
}: {
  id: string | number;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UploadArticleImagePayload) =>
      uploadArticleImage(id, data),

    onMutate(variables, context) {
      const toastId = toast.loading("Uploading...");
      return { toastId };
    },
    onSuccess(data, variables, onMutateResult, context) {
      toast.dismiss(onMutateResult?.toastId);
      toast.success("Berhasil");

      queryClient.invalidateQueries({ queryKey: articleKeys.all });
      router.push(ROUTES.DASHBOARD_ARTICLE);
    },
    onError(error, variables, onMutateResult, context) {
      toast.dismiss(onMutateResult?.toastId);
      toast.error("Gagal");
    },
  });

  const form = useAppForm({
    defaultValues: {
      files: [] as File[],
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  const { data: article } = useArticle(id);

  return (
    <div className="grid grid-cols-6 space-x-8">
      <form.AppForm>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(e);
          }}
          className="space-y-between-items col-span-2"
        >
          <form.AppField name="files">
            {(field) => <field.ImageField label="Upload Images" />}
          </form.AppField>

          <form.SubmitButton label="Save" />
        </form>
      </form.AppForm>

      <div className="col-span-4">
        <form.Subscribe
          selector={(state) => ({
            image: state.values.files,
          })}
        >
          {({ image }) => (
            <Card>
              <CardHeader>
                <CardTitle>Preview Article</CardTitle>
              </CardHeader>

              <Separator />

              <CardContent>
                <ArticleContent
                  title={article?.name ?? ""}
                  category={article?.category ?? ""}
                  content={article?.description ?? ""}
                  previewUrl={image[0]}
                />
              </CardContent>
            </Card>
          )}
        </form.Subscribe>
      </div>
    </div>
  );
}
