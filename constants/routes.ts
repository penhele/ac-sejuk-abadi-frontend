export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  PORTOFOLIO: "/portofolio",
  EDUCATION: "/education",
  PRODUCT_DETAIL: (id: string | number) => `/shop/${id}`,
  PROJECT_DETAIL: (id: string | number) => `/portofolio/${id}`,

  DASHBOARD: "/dashboard",
  
  PRODUCTS: "/dashboard/products",
  CREATE_PRODUCTS: "/dashboard/products/create",
  EDIT_PRODUCTS: (id: string | number) => `/dashboard/products/${id}/edit`,

  BRANDS: "/dashboard/brands",
  CREATE_BRANDS: "/dashboard/brands/create",
  EDIT_BRANDS: (id: string | number) => `/dashboard/brands/${id}/edit`,
} as const;
