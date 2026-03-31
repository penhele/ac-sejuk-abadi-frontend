export interface ProductSpecs {
  brand: string;
  type: string;
  series: string;
  produksi: string;
  pk: string;
  watt: string;
  label: string;
  btu: string;
  refrigerant: string;
  warranty: string;
  dimensiindoor: string;
  dimensioutdoor: string;
  beratindoor: string;
  beratoutdoor: string;
  ukuranpipa: string;
}

export interface Product {
  name: string;
  category: string;
  price: string;
  images: string[];
  specs: ProductSpecs;
}