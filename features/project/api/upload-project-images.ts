import { api } from "@/lib/api/axios";
import { UploadProjectImagePayload } from "../types/upload-project-image-payload";

export const uploadProjectImage = async (
  id: string | number,
  data: UploadProjectImagePayload,
) => {
  const formData = new FormData();

  data.files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post(`/projects/${id}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
