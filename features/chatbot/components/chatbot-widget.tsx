"use client";

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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  MessageCircle,
  MessageCircleDashedIcon,
  RotateCcw,
  RotateCwIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import ChatbotMessage from "./chatbot-message";
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import MessageAnimated from "./message-animated";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // 1. Tambahkan state untuk melacak status loading
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Halo! Ada yang bisa saya bantu hari ini?",
      time:
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }) + " WIB",
    },
  ]);

  // Helper untuk mendapatkan waktu saat ini
  const getCurrentTime = () =>
    new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }) + " WIB";

  const handleSendMessageSuccess = (
    userMessage: string,
    botResponse: string,
  ) => {
    // Matikan loading ketika respon sudah berhasil didapatkan
    setIsLoading(false);

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: userMessage,
        time: getCurrentTime(),
      },
      {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
        time: getCurrentTime(),
      },
    ]);
  };

  const handleResetChat = () => {
    setMessages([]);
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isOpen && (
        <MessageScrollerProvider>
          <Card className="fixed z-50 bottom-24 right-8 w-md">
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
                      // disabled={isBusy}
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

            <CardContent className="max-h-100 min-h-80 overflow-y-scroll">
              {messages.length === 0 ? (
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
                <MessageScroller>
                  <MessageScrollerViewport>
                    <MessageScrollerContent>
                      {messages.map((message) => (
                        <MessageAnimated
                          key={message.id}
                          message={message}
                          // scrollAnchor={message.role === "user"}
                        />
                      ))}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                </MessageScroller>
              )}
            </CardContent>

            <CardFooter>
              <ChatbotMessage
                onSuccess={handleSendMessageSuccess}
                onSendStart={() => setIsLoading(true)}
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
          "fixed bottom-8 right-8 rounded-full h-14 w-14 flex items-center justify-center cursor-pointer text-primary-foreground transition-all",
          isOpen ? "bg-destructive" : "bg-primary",
        )}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
}
