import EditProjectPage from "@/features/project/components/edit-project-page";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <EditProjectPage id={id} />;
}
