"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  SendHorizontal,
  Bot,
  Sparkles,
  RotateCcw,
  MessageSquare,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Message } from "../types";
import { sendChatbotMessage } from "../api/chatbot-client";

// Suggested questions for quick interaction
const QUICK_SUGGESTIONS = [
  { text: "🧹 Cuci AC", value: "Berapa biaya cuci AC?" },
  {
    text: "🔧 Perbaikan AC",
    value: "AC saya tidak dingin dan bocor, bisa diperbaiki?",
  },
  { text: "💰 Info Tarif", value: "Berapa harga/biaya layanan servis AC?" },
  { text: "📍 Area Layanan", value: "Apakah melayani area luar Jabodetabek?" },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize session and load messages from localStorage on mount
  useEffect(() => {
    // Generate a simple session ID if not exists
    let activeSession = localStorage.getItem("acsa_chat_session_id");
    if (!activeSession) {
      activeSession = `session_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem("acsa_chat_session_id", activeSession);
    }
    setSessionId(activeSession);

    // Load messages
    const savedMessages = localStorage.getItem("acsa_chat_history");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse saved chat history", e);
        initializeWelcomeMessage();
      }
    } else {
      initializeWelcomeMessage();
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("acsa_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to the bottom of the chat list
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Refocus input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages, isTyping]);

  const initializeWelcomeMessage = () => {
    const welcome: Message = {
      id: "welcome",
      sender: "bot",
      text: "Halo! Selamat datang di **AC Sejuk Abadi**. Saya asisten virtual AI Anda. ❄️\n\nAda yang bisa saya bantu mengenai layanan cuci AC, perbaikan, bongkar pasang, atau informasi tarif hari ini?",
      timestamp: getCurrentTime(),
    };
    setMessages([welcome]);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Create user message
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await sendChatbotMessage(textToSend, sessionId);

      const botMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: response.message,
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: `error_${Date.now()}`,
        sender: "bot",
        text: "Maaf, terjadi gangguan koneksi. Silakan coba kirim ulang pesan Anda atau hubungi kami langsung via WhatsApp.",
        timestamp: getCurrentTime(),
        status: "error",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleClearHistory = () => {
    if (
      confirm("Apakah Anda yakin ingin menghapus seluruh riwayat percakapan?")
    ) {
      localStorage.removeItem("acsa_chat_history");
      initializeWelcomeMessage();
    }
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  // Helper to open WhatsApp directly
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "6281234567890"; // Replaced with their CS phone number
    const message =
      "Halo AC Sejuk Abadi, saya ingin bertanya tentang layanan servis AC...";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative">
      {/* Chat Bubble Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={cn(
              "fixed z-[9999] flex flex-col bg-card border border-border shadow-2xl rounded-2xl overflow-hidden",
              // Mobile layout vs Desktop layout
              "bottom-24 right-4 left-4 h-[500px] sm:h-[580px] sm:w-[380px] sm:left-auto sm:right-6",
            )}
          >
            {/* Header */}
            <div className="bg-linear-to-r from-primary to-blue-600 px-4 py-3 text-primary-foreground flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center border border-white/20 backdrop-blur-xs">
                    <Bot className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight flex items-center">
                    Sejuk Abadi AI
                    <Sparkles className="h-3.5 w-3.5 ml-1.5 text-yellow-300 fill-yellow-300" />
                  </h3>
                  <span className="text-[10px] text-blue-100 font-medium">
                    Asisten Virtual (Aktif)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-primary-foreground hover:bg-white/10 rounded-full"
                      onClick={handleClearHistory}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    Hapus Percakapan
                  </TooltipContent>
                </Tooltip>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-white/10 rounded-full"
                  onClick={handleToggleChat}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 bg-slate-50/50 dark:bg-zinc-950/20">
              <div className="space-y-4 pr-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex w-full items-end",
                      msg.sender === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-2xs",
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-card text-foreground border border-border/80 rounded-bl-none",
                        msg.status === "error" &&
                          "bg-destructive/10 text-destructive border-destructive/20",
                      )}
                    >
                      {/* Markdown rendering for bot, plain text for user */}
                      {msg.sender === "bot" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none break-words leading-relaxed text-slate-800 dark:text-slate-200">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap break-words leading-relaxed">
                          {msg.text}
                        </p>
                      )}
                      <span
                        className={cn(
                          "block text-[9px] mt-1 text-right font-medium opacity-60",
                          msg.sender === "user"
                            ? "text-blue-100"
                            : "text-muted-foreground",
                        )}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Bot Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start items-end">
                    <div className="bg-card text-foreground border border-border/85 rounded-2xl rounded-bl-none px-4 py-3 shadow-2xs max-w-[80%]">
                      <div className="flex items-center space-x-1.5 py-1">
                        <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2 bg-slate-50/75 dark:bg-zinc-950/40 border-t border-border/40">
                <p className="text-[10px] text-muted-foreground font-medium mb-1.5 flex items-center">
                  <HelpCircle className="h-3 w-3 mr-1" /> Pertanyaan Populer:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SUGGESTIONS.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion.value)}
                      className="text-xs bg-card hover:bg-slate-100 dark:hover:bg-zinc-850 border border-border text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full transition-all duration-200 hover:border-primary/40 active:scale-95 text-left"
                    >
                      {suggestion.text}
                    </button>
                  ))}
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="text-xs bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 dark:bg-emerald-950/25 dark:hover:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-400 px-2.5 py-1 rounded-full transition-all duration-200 flex items-center"
                  >
                    📞 WhatsApp CS <ExternalLink className="h-2.5 w-2.5 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-card border-t border-border flex items-center gap-2"
            >
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ketik pesan Anda di sini..."
                className="flex-1 bg-slate-50 dark:bg-zinc-950/40 focus-visible:ring-primary border-border h-10 text-sm rounded-full px-4"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
                className="h-10 w-10 rounded-full shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 active:scale-95"
              >
                <SendHorizontal className="h-4.5 w-4.5" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        onClick={handleToggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-350 select-none",
          isOpen
            ? "bg-destructive text-destructive-foreground rotate-90"
            : "bg-primary text-primary-foreground hover:shadow-primary/25 hover:shadow-xl",
        )}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.93 }}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex   rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </div>
        )}
      </motion.button>
    </div>
  );
}
