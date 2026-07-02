import { useAppForm } from "@/hooks/use-app-form";
import {
  ArticleFormValues,
  createArticleSchema,
} from "../schemas/article.schema";
import { revalidateLogic } from "@tanstack/react-form";
import { cn } from "tailwind-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ArticleContent from "./article-content";
import { Eye } from "lucide-react";

interface Props {
  defaultValues: ArticleFormValues;
  onSubmit: (values: ArticleFormValues) => void;
  loading?: boolean;
}

export default function ArticledeForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: createArticleSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <div className="grid grid-cols-6 gap-between-items">
      <Card className="col-span-2">
        <CardContent>
          <form.AppForm>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className={cn("space-y-between-field")}
            >
              <form.AppField name="name">
                {(field) => {
                  return <field.TextField label="Judul" placeholder="Judul" />;
                }}
              </form.AppField>

              <form.AppField name="category">
                {(field) => {
                  return (
                    <field.TextField label="Kategory" placeholder="Kategori" />
                  );
                }}
              </form.AppField>

              <form.AppField name="description">
                {(field) => {
                  return (
                    <field.TextareaField label="Konten" placeholder="Konten" />
                  );
                }}
              </form.AppField>

              <form.SubmitButton
                label="Save"
                className="w-full"
                loading={loading}
              />
            </form>
          </form.AppForm>
        </CardContent>
      </Card>

      <div className="col-span-4">
        <form.Subscribe
          selector={(state) => ({
            title: state.values.name,
            content: state.values.description,
            category: state.values.category,
          })}
        >
          {({ title, content, category }) => (
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-row items-center gap-x-2">
                  <Eye size={18} /> Preview Article
                </CardTitle>
              </CardHeader>

              <Separator />

              <CardContent>
                <ArticleContent
                  title={title}
                  category={category}
                  content={content}
                />
              </CardContent>
            </Card>
          )}
        </form.Subscribe>
      </div>
    </div>
  );
}
