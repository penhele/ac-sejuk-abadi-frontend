import { api } from "@/lib/api/axios";
import { Brand, CreateBrandPayload, SponsoredBrand } from "@/types/brand";

export const getBrands = async (): Promise<Brand[]> => {
  try {
    const response = await api.get<Brand[]>("/brands");

    return response.data;
  } catch (error) {
    return [];
  }
};

export const addBrand = async (data: CreateBrandPayload) => {
  const response = await api.post("/brands", data, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDQ1ODMzZi05YTAwLTRiNGUtODYzNy0xN2IxMmY3ZDA3YTciLCJlbWFpbCI6ImFkbWluQHh5ei5jb20iLCJpYXQiOjE3NzkyOTg3NTMsImV4cCI6MTc3OTkwMzU1M30.Ellv66P3CIs-0rcXFE0xiK-QC4Vq9OLbE10WKbnEKv8",
    },
  });

  return response.data;
};

export const deleteBrand = async (id: string | number) => {
  const response = await api.delete(`/brands/${id}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDQ1ODMzZi05YTAwLTRiNGUtODYzNy0xN2IxMmY3ZDA3YTciLCJlbWFpbCI6ImFkbWluQHh5ei5jb20iLCJpYXQiOjE3NzkyOTg3NTMsImV4cCI6MTc3OTkwMzU1M30.Ellv66P3CIs-0rcXFE0xiK-QC4Vq9OLbE10WKbnEKv8",
    },
  });

  return response.data;
};

export const getSponsoredBrands = async (): Promise<SponsoredBrand[]> => {
  try {
    const response = await api.get<SponsoredBrand[]>("/sponsored-brands");

    return response.data;
  } catch (error) {
    return [];
  }
};
