import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ text }: { text: string }) {
  return (
    <div className="leading-7 whitespace-pre-wrap text-sm">
      <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
    </div>
  );
}
