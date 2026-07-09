"use client";

import Cookies from "js-cookie";

export const useAuthToken = () => {
  const getToken = () => {
    return Cookies.get("access_token");
  };

  const removeToken = () => {
    Cookies.remove("access_token");
  };

  const setToken = (token: string) => {
    Cookies.set("access_token", token);
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  return {
    getToken,
    setToken,
    removeToken,
    isAuthenticated,
    token: getToken(),
  };
};
