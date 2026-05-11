import { Article } from "@/types/article";
import { AspectRatio } from "../ui/aspect-ratio";
import { formatDate } from "@/lib/format/date";
import Image from "next/image";
import { ImageOff } from "lucide-react";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="shadow-xs flex flex-col h-full rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative rounded-t-lg">
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg">
          {article.images && article.images.length > 0 ? (
            <Image
              src={article.images[0].image_url}
              alt={`${article.name}-image`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col space-y-2 items-center justify-center h-full ">
              <ImageOff />
              <span className="text-sm">No Image</span>
            </div>
          )}
        </AspectRatio>

        <div className="absolute top-3 right-3 border bg-primary rounded-lg px-2 py-1 text-white text-xs">
          <span>{article.category}</span>
        </div>
      </div>

      <div className="border flex flex-col flex-1 rounded-b-lg">
        <div className="flex flex-col space-y-2 p-inside-card flex-1">
          <span className="font-bold text-gray-600">{article.name}</span>

          <span className="text-sm text-gray-600 line-clamp-5">
            {article.description}
          </span>
        </div>

        <div className="border-t">
          <span className="text-sm text-red-500 px-4 py-2 block">
            {formatDate(article.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
