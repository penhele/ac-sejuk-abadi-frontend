"use client";

import { getFileSizeMB } from "@/lib/get-file-size";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
} from "./ui/attachment";
import { useEffect, useState } from "react";

interface Props {
  item: File;
}

export default function AttachmentItem({ item }: Props) {
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
    <Attachment orientation="vertical" className="w-full" state="done">
      <AttachmentMedia variant="image">
        <img src={imageUrl} alt={item.name} />
      </AttachmentMedia>

      <AttachmentContent>
        <AttachmentTitle>{item.name}</AttachmentTitle>
        <AttachmentDescription>
          {item.type} · {getFileSizeMB(item.size)} MB
        </AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  );
}
