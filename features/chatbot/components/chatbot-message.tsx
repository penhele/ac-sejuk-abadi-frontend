import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useAppForm } from "@/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpIcon } from "lucide-react";
import { sendMessage } from "../message/api/send-message";

interface ChatbotMessageProps {
  onSuccess: (userMessage: string, botResponse: string) => void;
  onSendStart: () => void;
}

export default function ChatbotMessage({
  onSuccess,
  onSendStart,
}: ChatbotMessageProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
  });

  const form = useAppForm({
    defaultValues: {
      message: "",
    },
    onSubmit: (values) => {
      // 1. Validasi input kosong (biar tidak trigger loading kalau kosong)
      if (!values.value.message.trim()) return;

      // 2. Trigger status loading di komponen induk (ChatbotWidget)
      onSendStart();

      // 3. Jalankan mutasi kirim data ke backend
      mutate(
        { message: values.value.message },
        {
          onSuccess: (data) => {
            // Asumsi 'data' dari backend langsung mengembalikan string respons AI
            onSuccess(values.value.message, data);
            form.reset(); // Kosongkan input setelah berhasil kirim
          },
          onError: (error) => {
            console.error("Gagal mengirim pesan:", error);
            // Opsional: Kamu bisa mematikan status loading di parent jika terjadi error,
            // dengan mengirimkan teks error khusus lewat onSuccess atau membuat prop onError khusus.
            onSuccess(
              values.value.message,
              "Maaf, terjadi kesalahan. Silakan coba lagi.",
            );
          },
        },
      );
    },
  });

  return (
    <div className="flex items-center space-x-4 w-full">
      <form.AppForm>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex items-center w-full space-x-2"
        >
          <form.AppField name="message">
            {(field) => (
              <InputGroup>
                <InputGroupTextarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  placeholder="Produk apa yang tersedia di website ini?"
                />

                <InputGroupAddon align={"block-end"}>
                  <InputGroupButton asChild>
                    <form.SubmitButton
                      Icon={ArrowUpIcon}
                      className="rounded-full ml-auto"
                    />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            )}
          </form.AppField>

          {/* Menggunakan isPending bawaan React Query untuk disable tombol kirim */}
          {/* <form.SubmitButton Icon={SendHorizontal} isDisabled={isPending} /> */}
        </form>
      </form.AppForm>
    </div>
  );
}
