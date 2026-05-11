import { Article } from "@/types/article";
import { AspectRatio } from "../ui/aspect-ratio";
import { formatDate } from "@/lib/format/date";
import Image from "next/image";
import { ImageOff } from "lucide-react";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="shadow-xs flex flex-col h-full rounded-t-lg">
      <div className="relative rounded-t-lg">
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg">
          {article.images.length != 0 ? (
            <Image src={article.images[0]} alt="" fill />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <ImageOff />
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
