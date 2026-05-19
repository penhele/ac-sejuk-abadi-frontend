export interface AcType {
  id: number;
  name: string;
  _count: AcTypeCount;
}

export interface AcTypeCount {
  products: number;
}
