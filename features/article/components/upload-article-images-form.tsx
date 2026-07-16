"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import { useAppForm } from "@/hooks/use-app-form";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import { uploadArticleImage } from "../api/upload-article-image";
import { useArticle } from "../hooks/use-article";
import { articleKeys } from "../queries/article-keys";
import { UploadArticleImagePayload } from "../types/upload-article-image-payload";
import ArticleContent from "./article-content";

interface Props {
  id: string | number;
}

export default function UploadArticleImagesForm({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UploadArticleImagePayload) =>
      uploadArticleImage(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: articleKeys.all });
      router.push(ROUTES.DASHBOARD_ARTICLE);
    },
  });

  const handleSubmit = ({ value }: { value: UploadArticleImagePayload }) => {
    goeyToast.promise(mutateAsync(value), {
      loading: "Uploading...",
      success: "Berhasil",
      error: (err) => (err as AppError).message,
    });
  };

  const form = useAppForm({
    defaultValues: {
      files: [] as File[],
    },
    onSubmit: handleSubmit,
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
            {(field) => <field.ImageField label="Upload Images" displayGrid={2} />}
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
