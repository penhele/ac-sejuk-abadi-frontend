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
import { Message } from "../types/message";

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
    onSuccess: (response, variables) => {
      onSuccess(variables.message, response);
    },
  });

  const handleSubmit = ({ value }: { value: Message }) => {
    onSendStart();
    mutate(value);
  };

  const form = useAppForm({
    defaultValues: {
      message: "",
    },
    onSubmit: handleSubmit,
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
                  className="min-h-12 max-h-24"
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
        </form>
      </form.AppForm>
    </div>
  );
}
