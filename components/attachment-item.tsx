"use client";

import { getFileSizeMB } from "@/lib/get-file-size";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "./ui/attachment";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  item: File;
  onDelete: () => void;
}

export default function AttachmentItem({ item, onDelete }: Props) {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(item);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [item]);

  if (!imageUrl) return null;

  return (
    <Attachment
      orientation="vertical"
      className="w-full group relative"
      state="done"
    >
      <AttachmentMedia variant="image">
        <img src={imageUrl} alt={item.name} />
      </AttachmentMedia>

      <AttachmentContent>
        <AttachmentTitle>{item.name}</AttachmentTitle>
        <AttachmentDescription>
          {item.type} · {getFileSizeMB(item.size)} MB
        </AttachmentDescription>
      </AttachmentContent>

      <AttachmentActions className="absolute top-2 right-2 z-30">
        <AttachmentAction
          variant="outline"
          size="icon-xs"
          className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-background/80 shadow-sm hover:bg-destructive hover:text-destructive-foreground"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          <X className="h-3 w-3" />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}
