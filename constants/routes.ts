export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  PORTOFOLIO: "/portofolio",
  EDUCATION: "/education",
  PRODUCT_DETAIL: (id: string | number) => `/shop/${id}`,
  PROJECT_DETAIL: (id: string | number) => `/portofolio/${id}`,
};
