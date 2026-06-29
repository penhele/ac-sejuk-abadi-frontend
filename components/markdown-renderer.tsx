import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkdownRendererProps {
  children: string;
  className?: string; // Menambahkan parameter className opsional
}

export default function MarkdownRenderer({
  children,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={className}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({
            node,
            className: codeClassName,
            children: codeChildren,
            ...props
          }) {
            // Mengubah nama variabel destruksurisasi menjadi codeClassName agar tidak bentrok dengan prop luar
            const match = /language-(\w+)/.exec(codeClassName || "");

            return match ? (
              <SyntaxHighlighter
                style={dracula}
                PreTag="div"
                language={match[1]}
                {...(props as any)}
              >
                {String(codeChildren).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={codeClassName} {...props}>
                {codeChildren}
              </code>
            );
          },

          p({ node, children, ...props }) {
            return <p {...props}>{children}</p>;
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
