export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  PORTOFOLIO: "/portofolio",
  PRODUCT_DETAIL: (id: string | number) => `/shop/${id}`,
  PROJECT_DETAIL: (id: string | number) => `/portofolio/${id}`,

  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  //   FORGOT_PASSWORD: "/auth/forgot-password",
};
