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
import { MessageCircle, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import ChatbotMessage from "./chatbot-message";

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

  // Varian animasi untuk titik-titik melompat
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [-5, 5, -5] },
  };

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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed z-50 bottom-24 right-8"
          >
            <Card className="w-md">
              <CardHeader>
                <CardTitle>Sejuk Abadi AI</CardTitle>
                <CardDescription>Asisten Virtual (Aktif)</CardDescription>

                <CardAction>
                  <Button
                    variant={"ghost"}
                    size={"icon-sm"}
                    onClick={handleResetChat}
                  >
                    <RotateCcw />
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"icon-sm"}
                    onClick={() => setIsOpen(false)} // Tambahkan fungsi close di sini
                  >
                    <X />
                  </Button>
                </CardAction>
              </CardHeader>

              <Separator />

              <CardContent className="space-y-2 max-h-100 overflow-y-scroll">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col space-y-1 max-w-[75%] w-fit p-3 rounded-xl border ${
                      msg.sender === "user"
                        ? "bg-primary text-white ml-auto items-end rounded-br-none"
                        : "bg-muted text-foreground mr-auto items-start rounded-bl-none"
                    }`}
                  >
                    <span className="whitespace-pre-line text-sm">
                      {msg.text}
                    </span>
                    <span className="text-[10px] opacity-70">{msg.time}</span>
                  </div>
                ))}

                {/* 2. Indikator Chat Bergelombang saat Loading */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-muted text-foreground mr-auto flex flex-col space-y-1 max-w-[75%] w-fit p-4 rounded-xl rounded-bl-none border"
                  >
                    <div className="flex items-center space-x-1.5 h-4 px-1">
                      {[0, 1, 2].map((index) => (
                        <motion.span
                          key={index}
                          className="w-2 h-2 bg-foreground/60 rounded-full"
                          variants={dotVariants}
                          initial="initial"
                          animate="animate"
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>

              <Separator />

              <CardFooter>
                {/* 3. Lempar state setter ke input agar bisa di-trigger pas submit */}
                <ChatbotMessage
                  onSuccess={handleSendMessageSuccess}
                  onSendStart={() => setIsLoading(true)}
                />
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

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
