import { ArticleImages } from "./article-images";

export interface Article {
  id: number;
  name: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
  images: ArticleImages[];
}
