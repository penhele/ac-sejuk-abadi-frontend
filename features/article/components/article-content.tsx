import MarkdownRenderer from "@/components/product/markdown-renderer";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/format/date";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  title: string;
  category: string;
  content: string;
  createdAt?: string;
  className?: string;
  imageUrl?: string;
  previewUrl?: File;
}

export default function ArticleContent({
  title,
  category,
  content,
  createdAt,
  className,
  imageUrl,
  previewUrl,
}: Props) {
  return (
    <div className={cn("space-y-4", className)}>
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

      {imageUrl && (
        <div className="relative aspect-video">
          <Image
            src={imageUrl}
            alt={`${title}-image`}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {previewUrl && (
        <img
          src={URL.createObjectURL(previewUrl)}
          className="w-full rounded-lg object-cover aspect-video"
        />
      )}

      <MarkdownRenderer text={content || "--"} />
    </div>
  );
}
