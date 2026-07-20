import { useAppForm } from "@/hooks/use-app-form";
import { CreateChatShortcutPayload } from "../types/create-chat-shortcut-payload";

interface Props {
  defaultValues: CreateChatShortcutPayload;
  onSubmit: (values: CreateChatShortcutPayload) => void;
  loading?: boolean;
}

export default function ChatShortcutform({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const form = useAppForm({
    defaultValues,
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form.AppForm>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit();
    }}
    className="px-4 py-4 space-y-between-field h-full flex flex-col "
  >
    <form.AppField name="title">
      {(field) => (
        <field.InputField label="Judul" placeholder="AC untuk ruang 3x3?" />
      )}
    </form.AppField>

    <form.AppField name="content">
      {(field) => (
        <field.InputField
          label="Prompt"
          placeholder="AC yang cocok untuk ruangan 3x3"
        />
      )}
    </form.AppField>

    <form.SubmitButton
      label="Update"
      className="mt-auto"
      loading={loading}
    />
  </form>
    </form.AppForm>
  );
}
