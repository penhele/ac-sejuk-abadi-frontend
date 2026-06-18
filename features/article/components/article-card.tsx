import { Article } from "@/features/article/types/article";
import { AspectRatio } from "../../../components/ui/aspect-ratio";
import { formatDate } from "@/lib/format/date";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div
      key={article.id}
      className="relative space-y-between-items-xs transition duration-300 hover:-translate-y-1"
    >
      <Link
        href={ROUTES.ARTICLE_DETAIL(article.id)}
        className="absolute inset-0 z-10"
      />

      <div className="relative">
        {article.images.length > 0 ? (
          <div className="aspect-video relative">
            <Image
              src={article.images[0].image_url}
              alt={`${article.name}-image`}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video bg-muted rounded-lg" />
        )}
        <span className="absolute top-4 left-4 text-xs px-2 py-1 bg-card rounded-card">
          {article.category}
        </span>
        <span className="absolute bottom-4 right-4 text-xs px-2 py-1 bg-card rounded-card">
          {formatDate(article.updated_at)}
        </span>
      </div>
      <h1 className="font-semibold">{article.name}</h1>
      <p className="line-clamp-3 text-sm text-muted-foreground">
        {article.description}
      </p>
    </div>
  );
}
