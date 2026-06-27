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
  MessageCircle,
  RotateCcw,
  X,
  Bot,
  Sparkles,
  Wrench,
  Droplets,
  Phone,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ChatbotMessage from "./chatbot-message";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../api/send-message";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk floating tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);

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

  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke bawah saat ada pesan baru atau loading
  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Efek delay untuk memunculkan tooltip "Mulai Percakapan"
  useEffect(() => {
    if (!isOpen && !isTooltipDismissed) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [isOpen, isTooltipDismissed]);

  const { mutate: mutateSend } = useMutation({
    mutationFn: sendMessage,
  });

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

  const handleSendSuggestion = (text: string) => {
    if (isLoading) return;
    setIsLoading(true);

    // Tambahkan pesan user secara instan ke dalam obrolan
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: text,
        time: getCurrentTime(),
      },
    ]);

    // Kirim ke API chatbot
    mutateSend(
      { message: text },
      {
        onSuccess: (data) => {
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: "bot",
              text: data,
              time: getCurrentTime(),
            },
          ]);
        },
        onError: (error) => {
          console.error("Gagal mengirim pesan saran:", error);
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: "bot",
              text: "Maaf, terjadi kesalahan saat menghubungi asisten. Silakan coba lagi.",
              time: getCurrentTime(),
            },
          ]);
        },
      },
    );
  };

  const handleResetChat = () => {
    setMessages([]);
    setIsLoading(false);
  };

  const suggestions = [
    {
      label: "Berapa Tarif Cuci / Servis AC?",
      text: "Berapa biaya servis atau cuci AC?",
      icon: <DollarSign size={14} />,
    },
    {
      label: "Jadwalkan Layanan Cuci AC",
      text: "Saya ingin memesan layanan cuci AC.",
      icon: <Droplets size={14} />,
    },
    {
      label: "AC Saya Bocor / Kurang Dingin",
      text: "AC saya bermasalah (bocor/kurang dingin). Mohon bantuannya.",
      icon: <Wrench size={14} />,
    },
    {
      label: "Hubungi WhatsApp Resmi",
      text: "Bagaimana cara menghubungi WhatsApp AC Sejuk Abadi?",
      icon: <Phone size={14} />,
    },
  ];

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
                    title="Mulai Ulang Percakapan"
                  >
                    <RotateCcw />
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"icon-sm"}
                    onClick={() => setIsOpen(false)}
                    title="Tutup Chat"
                  >
                    <X />
                  </Button>
                </CardAction>
              </CardHeader>

              <Separator />

              <CardContent
                ref={contentRef}
                className="space-y-4 max-h-100 min-h-80 overflow-y-auto scrollbar-thin pb-4"
              >
                {/* Render daftar pesan */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col space-y-1 max-w-[75%] w-fit p-3 rounded-xl border ${
                      msg.sender === "user"
                        ? "bg-primary text-white ml-auto items-end rounded-br-none shadow-sm"
                        : "bg-muted text-foreground mr-auto items-start rounded-bl-none shadow-sm"
                    }`}
                  >
                    <span className="whitespace-pre-line text-sm">
                      {msg.text}
                    </span>
                    <span className="text-[10px] opacity-70">{msg.time}</span>
                  </div>
                ))}

                {/* Indikator Chat Bergelombang saat Loading */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-muted text-foreground mr-auto flex flex-col space-y-1 max-w-[75%] w-fit p-4 rounded-xl rounded-bl-none border shadow-sm"
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

                {/* Dashboard Awal & Starter Chips jika chat kosong atau hanya ada welcome message */}
                {messages.length <= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col space-y-4 pt-2"
                  >
                    <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-2xl border border-dashed border-muted-foreground/20 shadow-inner">
                      <div className="relative">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                          <Bot size={32} className="animate-pulse" />
                        </div>
                        {/* Indikator Online Hijau Berkedip */}
                        <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-background"></span>
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm mt-3 text-foreground">
                        Sejuk Abadi AI Asisten
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[240px]">
                        Tanyakan seputar cuci AC, perbaikan bocor, bongkar
                        pasang, atau estimasi tarif kami.
                      </p>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1">
                        Pilih Topik untuk Mulai:
                      </p>

                      <div className="grid grid-cols-1 gap-2">
                        {suggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() =>
                              handleSendSuggestion(suggestion.text)
                            }
                            disabled={isLoading}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx + 0.3 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-between text-left p-3 rounded-xl border bg-card hover:bg-muted/50 hover:border-primary/40 transition-all text-xs font-medium cursor-pointer group shadow-sm disabled:opacity-50"
                          >
                            <div className="flex items-center space-x-3 text-foreground">
                              <span className="p-1.5 bg-muted rounded-lg text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                {suggestion.icon}
                              </span>
                              <span>{suggestion.label}</span>
                            </div>
                            <ArrowRight
                              size={14}
                              className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all transform translate-x-[-4px] group-hover:translate-x-0"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>

              <Separator />

              <CardFooter>
                <ChatbotMessage
                  onSuccess={handleSendMessageSuccess}
                  onSendStart={() => setIsLoading(true)}
                />
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Tooltip "Mulai Percakapan" */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{
              opacity: 1,
              y: [0, -6, 0], // Melayang halus
              scale: 1,
            }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              },
              default: { duration: 0.3 },
            }}
            className="fixed z-50 bottom-24 right-8 bg-card text-card-foreground border shadow-xl rounded-2xl p-4 pr-9 max-w-[260px] cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            {/* Segitiga penunjuk kecil */}
            <div className="absolute bottom-[-8px] right-[22px] w-4 h-4 bg-card border-r border-b rotate-45" />

            {/* Tombol close kecil */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Agar tidak men-trigger membuka obrolan
                setIsTooltipDismissed(true);
                setShowTooltip(false);
              }}
              className="absolute top-2 right-2 p-0.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"
            >
              <X size={12} />
            </button>

            <div className="flex gap-2 items-start">
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary mt-0.5">
                <Sparkles size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Butuh bantuan AC?
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  Mulai percakapan dengan AI Sejuk Abadi di sini! 👋
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol Float Chatbot dengan Ring Denyut Cahaya */}
      <div className="fixed bottom-8 right-8 z-50">
        {/* Ring Denyut Cahaya saat tooltip aktif */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              exit={{ opacity: 0 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-primary/40 -z-10 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setShowTooltip(false);
            }
          }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.93 }}
          className={cn(
            "rounded-full h-14 w-14 flex items-center justify-center cursor-pointer text-primary-foreground shadow-lg transition-all",
            isOpen
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-primary hover:bg-primary/90",
          )}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.button>
      </div>
    </div>
  );
}
