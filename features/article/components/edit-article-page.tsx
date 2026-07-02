"use client";
import { useParams } from "next/navigation";
import UpdateArticleForm from "./update-article-form";
import BackButton from "@/components/buttons/back-button";

interface Props {
  id: string;
}

export default function EditArticlePage({ id }: Props) {
  return (
    <div className="space-y-between-items">
      <BackButton />

      <div>
        <h1 className="text-lg font-semibold">Perbarui Artikel</h1>
      </div>

      <UpdateArticleForm id={id} />
    </div>
  );
}
