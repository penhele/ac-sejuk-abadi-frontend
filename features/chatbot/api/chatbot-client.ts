import axios from "axios";
import { ChatRequest, ChatResponse } from "../types";

export const chatbotApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_CHATBOT_API_URL || process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendChatbotMessage = async (
  message: string,
  sessionId?: string,
): Promise<ChatResponse> => {
  try {
    const response = await chatbotApi.post<ChatResponse>("/chatbot", {
      message,
      sessionId,
    } as ChatRequest);
    return response.data;
  } catch (error) {
    console.warn("Chatbot API error, using mock fallback:", error);

    // Simulate network delay for typing effect
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Smart localized mock response tailored for AC Sejuk Abadi
    const msgLower = message.toLowerCase();
    let reply =
      "Maaf, saya belum memahami pertanyaan tersebut. Ada yang bisa saya bantu mengenai layanan servis, cuci AC, atau pasang baru di AC Sejuk Abadi?";

    if (
      msgLower.includes("halo") ||
      msgLower.includes("hi") ||
      msgLower.includes("siang") ||
      msgLower.includes("pagi") ||
      msgLower.includes("malam") ||
      msgLower.includes("hello")
    ) {
      reply =
        "Halo! Selamat datang di AC Sejuk Abadi. Ada yang bisa kami bantu hari ini? Kami menyediakan layanan cuci AC, perbaikan, bongkar pasang, dan perawatan berkala.";
    } else if (
      msgLower.includes("harga") ||
      msgLower.includes("biaya") ||
      msgLower.includes("tarif") ||
      msgLower.includes("berapa")
    ) {
      reply =
        "Tarif layanan kami sangat transparan dan kompetitif! Cuci AC mulai dari Rp 75.000, tambah freon mulai dari Rp 150.000, dan biaya perbaikan akan disesuaikan dengan jenis kerusakan setelah pengecekan. Untuk info lengkap, hubungi WhatsApp kami.";
    } else if (
      msgLower.includes("cuci") ||
      msgLower.includes("servis") ||
      msgLower.includes("service") ||
      msgLower.includes("rawat")
    ) {
      reply =
        "Kami melayani cuci dan servis rutin AC (Split, Cassette, Standing) untuk rumah, kantor, maupun ruko. Disarankan untuk cuci AC setiap 3-4 bulan sekali agar udara tetap bersih dan AC awet. Ingin menjadwalkan servis?";
    } else if (
      msgLower.includes("rusak") ||
      msgLower.includes("bocor") ||
      msgLower.includes("tidak dingin") ||
      msgLower.includes("panas") ||
      msgLower.includes("mati") ||
      msgLower.includes("bau")
    ) {
      reply =
        "Masalah seperti AC bocor air, kurang dingin, atau berisik biasanya disebabkan oleh filter kotor, kekurangan freon, atau kendala kelistrikan. Teknisi ahli kami siap datang untuk melakukan diagnosa dan perbaikan.";
    } else if (
      msgLower.includes("lokasi") ||
      msgLower.includes("alamat") ||
      msgLower.includes("dimana") ||
      msgLower.includes("cabang")
    ) {
      reply =
        "Kantor pusat kami berlokasi di area operasional utama, dan kami melayani kunjungan teknisi langsung ke rumah atau kantor Anda. Silakan infokan lokasi Anda untuk mencocokkan jadwal teknisi terdekat.";
    } else if (
      msgLower.includes("kontak") ||
      msgLower.includes("wa") ||
      msgLower.includes("telepon") ||
      msgLower.includes("whatsapp") ||
      msgLower.includes("nomor")
    ) {
      reply =
        "Anda dapat menghubungi Customer Service kami melalui WhatsApp di nomor +62 812-3456-7890 untuk pemesanan cepat dan konsultasi gratis.";
    }

    return {
      message: reply,
      sessionId: sessionId || "mock-session-id",
    };
  }
};
