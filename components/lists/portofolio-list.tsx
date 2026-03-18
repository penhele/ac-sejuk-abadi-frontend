import PortofolioCard from "../cards/portofolio-card";

const projects = [
  {
    id: "1",
    title: "Hardi's House",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci accusantium assumenda soluta, quia ducimus modi!",
  },
  {
    id: "2",
    title: "Bank MEGA",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: "3",
    title: "Stephen's Kost",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci accusantium assumenda soluta, quia ducimus modi!",
  },
  {
    id: "4",
    title: "Hardi's House",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci accusantium assumenda soluta, quia ducimus modi!",
  },
];

export default function PortofolioList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map((item) => (
        <PortofolioCard key={item.id} portofolio={item} />
      ))}
    </div>
  );
}
