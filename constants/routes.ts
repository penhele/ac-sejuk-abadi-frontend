export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  PORTOFOLIO: "/portofolio",
  EDUCATION: "/education",
  PRODUCT_DETAIL: (id: string | number) => `/shop/${id}`,
  PROJECT_DETAIL: (id: string | number) => `/portofolio/${id}`,

  DASHBOARD: "/dashboard",

  PRODUCTS: "/dashboard/products",
  CREATE_PRODUCT: "/dashboard/products/create",
  EDIT_PRODUCT: (id: string | number) => `/dashboard/products/${id}/edit`,

  BRAND: "/dashboard/brands",
  CREATE_BRAND: "/dashboard/brands/create",
  EDIT_BRAND: (id: string | number) => `/dashboard/brands/${id}/edit`,

  CATEGORY_TYPE: "/dashboard/category-type",

  DASHBOARD_COMPANY: "/dashboard/company",
  DASHBOARD_PORTOFOLIO: "/dashboard/portofolio",
  DASHBOARD_CREATE_PORTOFOLIO: "/dashboard/portofolio/create",
  DASHBOARD_EDIT_PORTOFOLIO: (id: string | number) =>
    `/dashboard/portofolio/${id}/edit`,
} as const;
