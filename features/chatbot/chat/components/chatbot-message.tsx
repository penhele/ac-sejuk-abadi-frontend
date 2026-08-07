import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useAppForm } from "@/hooks/use-app-form";
import { ArrowUpIcon } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatbotMessage({ isLoading, onSend }: Props) {
  const handleSubmit = ({ value }: { value: { message: string } }) => {
    if (!value.message || !value.message.trim()) return;
    onSend(value.message.trim());
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit();
                    }
                  }}
                  disabled={isLoading}
                  placeholder="Apa saja tips merawat AC agar awet?"
                  className="min-h-12 max-h-24"
                />

                <InputGroupAddon align={"block-end"}>
                  <InputGroupButton asChild>
                    <form.SubmitButton
                      Icon={ArrowUpIcon}
                      className="rounded-full ml-auto"
                      isDisabled={isLoading}
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
