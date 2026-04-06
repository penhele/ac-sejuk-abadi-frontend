export interface Article {
  id?: number;
  name: string;        // Wajib (sesuai CreateArticleDto)
  description?: string; // Optional
  category?: string;    // Optional
  images?: any[];       // Array gambar dari BE
}