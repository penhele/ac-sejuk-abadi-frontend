import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

export default function EducationCard({
  jenisAc,
}: {
  jenisAc: { jenis: string; image: string };
}) {
  return (
    <div className="rounded-sm shadow-sm">
      <AspectRatio ratio={1 / 1} className="bg-muted rounded-t-sm">
        {/* <Image src={jenisAc.image} alt="" fill className="rounded-t-sm" /> */}
      </AspectRatio>

      <div className="py-2 px-4 bg-primary text-white rounded-b-sm">
        <h1>{jenisAc.jenis}</h1>
      </div>
    </div>
  );
}
