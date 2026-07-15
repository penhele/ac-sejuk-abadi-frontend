import BackButton from "@/components/buttons/back-button";
import ProjectImageGallery from "./project-image-gallery";
import UploadProjectImageForm from "./upload-project-images-form";

interface Props {
  id: string;
}

export default async function UploadProjectImagesPage({ id }: Props) {
  return (
    <div className="space-y-between-items">
      <BackButton />

      <h1 className="text-lg font-bold">Kelola Gambar</h1>

      <div className="grid grid-cols-2 gap-between-card">
        <UploadProjectImageForm id={id} />

        <ProjectImageGallery id={id} />
      </div>
    </div>
  );
}
