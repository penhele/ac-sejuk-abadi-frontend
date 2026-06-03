export interface Brand {
  id: number;
  name: string;
  image_url: string | null;
  _count: BrandCount;
}

export interface BrandCount {
  products: number;
}

export interface CreateBrandPayload {
  name: string;
}
