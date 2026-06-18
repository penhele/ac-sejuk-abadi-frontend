import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/format/date";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  title: string;
  category: string;
  content: string;
  createdAt?: string;
  className?: string;
  imageUrl?: string;
};

export default function ArticleContent({
  title,
  category,
  content,
  createdAt,
  className,
  imageUrl,
}: Props) {
  return (
    <div className={cn("space-y-4", className)}>
      {imageUrl && <div className="bg-muted aspect-video rounded-lg"></div>}

      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-semibold">{title || "Judul Artikel"}</h1>
        <span className="text-xs text-muted-foreground">
          {`Kategori: ${category || "-"}`}
        </span>

        {createdAt && (
          <>
            <span className="text-xs text-muted-foreground">
              Diunggah pada <strong>{formatDate(createdAt)}</strong>
            </span>
          </>
        )}
      </div>

      <Separator />

      <div className="whitespace-pre-wrap leading-6">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  );
}
