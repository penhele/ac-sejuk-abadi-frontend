"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  MessageCircle,
  MessageCircleDashedIcon,
  RotateCwIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import { useChatShortcuts } from "../../shortcut/hooks/use-chat-shortcuts";
import { generateResponse } from "../api/generate-response";
import ChatbotMessage from "./chatbot-message";
import MessageAnimated from "./message-animated";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(
    undefined,
  );
  const [messages, setMessages] = useState<
    {
      id: string;
      sender: "user" | "assistant";
      text: string;
      time: string;
    }[]
  >([]);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }) + " WIB";

  const handleResetChat = () => {
    setMessages([]);
    setConversationId(undefined); // Reset conversation ID saat reset chat
  };

  const { mutate, isPending } = useMutation({
    mutationFn: generateResponse,
    onSuccess(data) {
      // Simpan conversationId dari backend agar pesan berikutnya melanjutkan percakapan yang sama
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "assistant" as const,
        text: data.response, // Memperbaiki akses data (data.response bukan data.data)
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMessage]);
    },
    onError() {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "assistant",
          text: "Maaf, terjadi kesalahan. Silakan coba lagi.",
          time: getCurrentTime(),
        },
      ]);
    },
  });

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: messageText,
        time: getCurrentTime(),
      },
    ]);

    mutate({
      message: messageText,
      title: messages.length === 0 ? messageText.slice(0, 30) : undefined,
      conversationId: conversationId,
    });
  };

  const { data: chatShortcuts } = useChatShortcuts();

  return (
    <div className="relative">
      {isOpen && (
        <MessageScrollerProvider>
          <Card className="fixed z-50 bottom-9 right-20 w-md">
            <CardHeader>
              <CardTitle>Sejuk Abadi AI</CardTitle>
              <CardDescription>Asisten Virtual (Aktif)</CardDescription>

              <CardAction>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Reset conversation"
                      onClick={handleResetChat}
                      className="group"
                    >
                      <RotateCwIcon className="group-hover:rotate-90 transition" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset</p>
                  </TooltipContent>
                </Tooltip>
              </CardAction>
            </CardHeader>

            <Separator />

            <CardContent className="h-100">
              {messages.length === 0 && !isPending ? (
                <Empty className="h-full">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <MessageCircleDashedIcon />
                    </EmptyMedia>
                    <EmptyTitle className="flex flex-row items-center">
                      Halo, Pelanggan Setia!
                    </EmptyTitle>
                    <EmptyDescription>
                      Tanya AI tentang AC yang Anda inginkan dan perlukan!
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <MessageScroller className="h-full">
                  <MessageScrollerViewport>
                    <MessageScrollerContent>
                      {messages.map((message) => (
                        <MessageAnimated key={message.id} message={message} />
                      ))}
                      {isPending && (
                        <MessageAnimated
                          message={{
                            id: "bot-loading",
                            sender: "assistant",
                            text: "*Sedang mengetik...*",
                            time: getCurrentTime(),
                          }}
                        />
                      )}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                </MessageScroller>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-2 items-start">
              <div className="flex flex-row gap-2 flex-wrap">
                {chatShortcuts?.map((shortcut) => (
                  <Badge
                    key={shortcut.id}
                    variant={"outline"}
                    onClick={() => handleSendMessage(shortcut.content)}
                    className="cursor-pointer"
                  >
                    <div className="aspect-square h-2  rounded-full bg-yellow-400" />
                    {shortcut.title}
                  </Badge>
                ))}
              </div>

              <ChatbotMessage
                onSend={handleSendMessage}
                isLoading={isPending}
              />
            </CardFooter>
          </Card>
        </MessageScrollerProvider>
      )}

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.93 }}
        className={cn(
          "fixed bottom-8 right-8 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer text-primary-foreground transition-all",
          isOpen ? "bg-destructive" : "bg-primary",
        )}
      >
        {isOpen ? <X size={16} /> : <MessageCircle size={16} />}
      </motion.button>
    </div>
  );
}
