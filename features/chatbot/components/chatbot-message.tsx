import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useAppForm } from "@/hooks/use-app-form";
import { ArrowUpIcon } from "lucide-react";
import { Message } from "../types/message";

interface ChatbotMessageProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatbotMessage({
  isLoading,
  onSend,
}: ChatbotMessageProps) {
  const handleSubmit = ({ value }: { value: Message }) => {
    onSend(value.message);
    form.reset();
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
                  disabled={isLoading}
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
