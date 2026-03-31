export interface PromoItem {
  title: string;
  percent?: number; // Hanya untuk diskon
  description: string;
  image: string;
}

export type MarketingType = "diskon" | "news";