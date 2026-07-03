import EditArticlePage from "@/features/article/components/edit-article-page";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <EditArticlePage id={id} />;
}
b