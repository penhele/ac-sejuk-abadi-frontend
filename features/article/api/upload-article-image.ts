import { api } from "@/lib/api/axios";
import { UploadArticleImagePayload } from "../types/upload-article-image-payload";

export const uploadArticleImage = async (
  id: string | number,
  body: UploadArticleImagePayload,
) => {
  const formData = new FormData();

  body.files.forEach((file) => {
    formData.append("files", file);
  });

  const { data } = await api.post(`/articles/${id}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
