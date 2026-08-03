import { chatApi } from "@/lib/api/chat-api";
import { GenerateResponsePayload } from "../types/generate-response-payload";
import { GenerateResponseSuccessData } from "../types/generate-response-success.data";

export const generateResponse = async (
  body: GenerateResponsePayload,
): Promise<GenerateResponseSuccessData> => {
  const { data } = await chatApi.post("/chat", body);

  return data;
};
