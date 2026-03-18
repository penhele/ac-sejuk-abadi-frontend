import { Button } from "../../ui/button";
import PortofolioList from "@/components/lists/portofolio-list";

export default function PortofolioPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-header-h1 font-bold">Proyek Kami</h1>
          <p className="text-body">
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

        <PortofolioList />
      </div>
    </div>
  );
}
