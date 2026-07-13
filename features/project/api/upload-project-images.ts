import { api } from "@/lib/api/axios";
import { UploadProjectImagePayload } from "../types/upload-project-image-payload";

export const uploadProjectImage = async (
  id: string | number,
  body: UploadProjectImagePayload,
) => {
  const formData = new FormData();

  body.files.forEach((file) => {
    formData.append("files", file);
  });

  const { data } = await api.post(`/projects/${id}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
