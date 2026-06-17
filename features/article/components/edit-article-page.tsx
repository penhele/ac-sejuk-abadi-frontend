"use client";
import { useParams } from "next/navigation";
import UpdateArticleForm from "./update-article-form";

export default function EditArticlePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="">
      <UpdateArticleForm id={id} />
    </div>
  );
}
