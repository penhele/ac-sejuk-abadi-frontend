"use client";

import { useCallback, useState } from "react";
import { Message } from "../../types/message";
import { createChatSession } from "../api/create-chat-session";
import { getMessages } from "../api/get-messages";
import { CreateChatSessionPayload } from "../types/create-chat-session-payload";
import { sendMessage } from "../../message/api/send-message";

export const useChatSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startSession = useCallback(async (title: CreateChatSessionPayload) => {
    setLoading(true);
    setError(null);
    try {
      const id = await createChatSession(title);
      setSessionId(id);
      // Muat pesan default (biasanya kosong)
      const initMsgs = await getMessages(id);
      setMessages(initMsgs);
      return id;
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const postMessage = useCallback(
    async (content: Message) => {
      if (!sessionId) throw new Error("Session ID belum tersedia");
      setLoading(true);
      setError(null);
      try {
        const newMsg = await sendMessage(content);
        setMessages((prev) => [...prev, newMsg]);
        return newMsg;
      } catch (e: any) {
        setError(e?.response?.data?.message ?? e.message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [sessionId],
  );

  return {
    sessionId,
    messages,
    loading,
    error,
    startSession,
    postMessage,
  };
};
