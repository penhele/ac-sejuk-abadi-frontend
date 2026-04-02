import { DUMMY_PROJECTS } from "@/constants/projects";
import PortofolioCard from "../cards/portofolio-card";

export default function PortofolioList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {DUMMY_PROJECTS.map((item) => (
        <PortofolioCard key={item.id} portofolio={item} />
      ))}
    </div>
  );
}
