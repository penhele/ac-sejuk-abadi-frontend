import { api } from "@/lib/api/axios";
import { UploadImagePayload } from "../types/update-image-payload";

export const uploadProductImages = async (
  id: string | number,
  data: UploadImagePayload,
) => {
  const formData = new FormData();

  data.files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post(`/products/${id}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
