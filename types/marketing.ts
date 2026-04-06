// src/types/marketing.ts

export type MarketingType = "diskon" | "news";

export interface PromoItem {
  id?: number | string; // Untuk keperluan edit/delete
  id_product: string;    // Sesuai DTO BE
  price: number;        // Sesuai DTO BE
  start_date: string | Date; // Sesuai DTO BE
  end_date: string | Date;   // Sesuai DTO BE
  
  // Field lama (opsional jika masih dipakai untuk UI lain)
  title?: string;
  description?: string;
  image?: string;
  percent?: number;
}