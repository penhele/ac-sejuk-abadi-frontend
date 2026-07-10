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
import { motion } from "framer-motion";
import {
  MessageCircle,
  MessageCircleDashedIcon,
  RotateCwIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import ChatbotMessage from "./chatbot-message";
import MessageAnimated from "./message-animated";
import { Badge } from "@/components/ui/badge";
import { useChatShortcuts } from "../shortcut/hooks/use-chat-shortcuts";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<
    {
      id: string;
      sender: "user" | "bot";
      text: string;
      time: string;
    }[]
  >([]);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }) + " WIB";

  const handleSendMessageSuccess = (
    userMessage: string,
    botResponse: string,
  ) => {
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
                        <MessageAnimated key={message.id} message={message} />
                      ))}
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
                    onClick={() => {}}
                    className="cursor-pointer"
                  >
                    <div className="aspect-square h-2  rounded-full bg-yellow-400" />
                    {shortcut.title}
                  </Badge>
                ))}
              </div>

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
          "fixed bottom-8 right-8 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer text-primary-foreground transition-all",
          isOpen ? "bg-destructive" : "bg-primary",
        )}
      >
        {isOpen ? <X size={16} /> : <MessageCircle size={16} />}
      </motion.button>
    </div>
  );
}
