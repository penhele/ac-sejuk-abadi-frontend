"use client";

import { useParams } from "next/navigation";
import ArticleDetailContent from "./article-detail-content";

export default function ArticleDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="">
      <ArticleDetailContent id={id} />
    </div>
  );
}
