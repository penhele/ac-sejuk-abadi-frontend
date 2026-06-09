export const ROUTES = {
  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  HOME: "/",
  SHOP: "/shop",
  PORTOFOLIO: "/portofolio",
  EDUCATION: "/education",
  PRODUCT_DETAIL: (id: string | number) => `/shop/${id}`,
  PROJECT_DETAIL: (id: string | number) => `/portofolio/${id}`,

  DASHBOARD: "/dashboard",
  USERS: "/dashboard/users",

  PRODUCTS: "/dashboard/products",
  CREATE_PRODUCT: "/dashboard/products/create",
  EDIT_PRODUCT: (id: string | number) => `/dashboard/products/${id}/edit`,

  DASHBOARD_PRODUCT_IMAGES: (id: string | number) =>
    `/dashboard/products/${id}/images`,
  DASHBOARD_UPLOAD_PRODUCT_IMAGES: (id: string | number) =>
    `/dashboard/products/${id}/images/upload`,

  BRAND: "/dashboard/brands",
  CREATE_BRAND: "/dashboard/brands/create",
  EDIT_BRAND: (id: string | number) => `/dashboard/brands/${id}/edit`,

  CATEGORY_TYPE: "/dashboard/category-type",

  DASHBOARD_COMPANY: "/dashboard/company",
  DASHBOARD_PROJECT: "/dashboard/projects",
  DASHBOARD_CREATE_PROJECT: "/dashboard/projects/create",
  DASHBOARD_EDIT_PROJECT: (id: string | number) =>
    `/dashboard/projects/${id}/edit`,
  DASHBOARD_CREATE_PROJECT_IMAGES: (id: string | number) =>
    `/dashboard/projects/${id}/images/create`,

  DASHBOARD_GALLERY_PROJECT: "/dashboard/projects/images",

  DASHBOARD_SETTING: "/dashboard/setting",
} as const;
