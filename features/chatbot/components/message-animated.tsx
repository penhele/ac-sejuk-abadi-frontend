import { Bubble, BubbleContent } from "@/components/ui/bubble";

interface Props {
  message: { id: string; sender: string; text: string; time: string };
}

export default function MessageAnimated({ message }: Props) {
  return (
    <Bubble
      align={message.sender !== "user" ? "start" : "end"}
      variant={message.sender !== "user" ? "muted" : "default"}
    >
      <BubbleContent>{message.text}</BubbleContent>
    </Bubble>
  );
}
