import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "../../ui/button";
import Link from "next/link";

export default function Portofolio() {
  const projects = [
    {
      id: 1,
      title: "Hardi's House",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci accusantium assumenda soluta, quia ducimus modi!",
    },
    {
      id: 2,
      title: "Bank MEGA",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
    {
      id: 3,
      title: "Stephen's Kost",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci accusantium assumenda soluta, quia ducimus modi!",
    },
    {
      id: 4,
      title: "Hardi's House",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci accusantium assumenda soluta, quia ducimus modi!",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-xl font-bold">Proyek Kami</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            quod beatae eos repellat doloribus itaque laborum ipsum veniam non
            ducimus.
          </p>
        </div>

        <div className="">
          <Button variant={"default"}>All</Button>
          <Button variant={"ghost"}>Apartemen</Button>
          <Button variant={"ghost"}>Rumah</Button>
          <Button variant={"ghost"}>Ruko</Button>
          <Button variant={"ghost"}>Kantor</Button>
        </div>

        <div className="">
          <span className="text-sm">Total Project: 3</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {projects.map((item) => (
            <div
              key={item.id}
              className="border shadow-lg rounded-lg transition hover:scale-102"
            >
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg" />

              <div className="p-4 space-y-2">
                <h1 className="text-lg font-bold uppercase">{item.title}</h1>

                <p className="text-sm line-clamp-3 h-16 text-gray-600">
                  {item.description}
                </p>

                <Link
                  href={"/portofolio/qwerty"}
                  className="text-sm text-primary"
                >
                  Lihat Detail &gt;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
