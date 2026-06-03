import { BrandCount } from "./brand-count";

export interface Brand {
  id: number;
  name: string;
  image_url: string | null;
  _count: BrandCount;
}
