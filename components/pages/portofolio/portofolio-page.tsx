import PortofolioList from "@/components/lists/portofolio-list";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

        <Tabs defaultValue="all">
          <TabsList variant="line">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="apartemen">Apartemen</TabsTrigger>
            <TabsTrigger value="ruko">Ruko</TabsTrigger>
            <TabsTrigger value="kantor">Kantor</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="">
          <span className="text-sm">Total Project: 3</span>
        </div>

        <PortofolioList />
      </div>
    </div>
  );
}
