import { DescriptionSection, HeaderSection } from "@/components/util/header";
import { getProjectById } from "@/services/project.service";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ProjectDetailWrapper({ id }: { id: number }) {
  const { data: project } = useSuspenseQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectById(id),
  });

  return (
    <div className="">
      <div className="">
        <HeaderSection title="Deskripsi Proyek" />
        <DescriptionSection description={project.description} />
      </div>

      
    </div>
  );
}
