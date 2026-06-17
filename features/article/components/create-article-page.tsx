import CreateArticleForm from "./create-article-form";

export default function CreateArticlePage() {
  return (
    <div className="space-y-between-items">
      <h1 className="text-lg font-bold">Masukkan Artikel</h1>

      <CreateArticleForm />
    </div>
  );
}
