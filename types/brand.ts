export interface Brand {
  id: number;
  name: string;
  image_url: string | null;
  _count: BrandCount;
}

export interface BrandCount {
  products: number;
}

export interface SponsoredBrand {
  id: number;
  id_brand: number;
  priority: number;
  start_date: string;
  end_date: string;
  brand: Brand;
}

export interface CreateBrandPayload {
  name: string;
}
