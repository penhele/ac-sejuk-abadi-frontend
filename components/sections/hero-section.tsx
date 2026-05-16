import Image from "next/image";

export default function HeroSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="h-80 flex items-center justify-center bg-muted relative">
      <Image src={"/hero.jpg"} alt="" fill className="object-cover" />

      <div className="max-w-7xl absolute">
        <div className="flex flex-col space-y-2 items-center text-center">
          <span className="text-4xl font-bold text-white bg-black/20 px-2 py-1 backdrop-blur-md rounded-sm">
            {title}
          </span>
          <span className="text-sm text-white  bg-black/20 px-2 py-1 backdrop-blur-md rounded-sm">
            {description}
          </span>
        </div>
      </div>
    </section>
  );
}
